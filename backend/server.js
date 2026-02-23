const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Database connection
let db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to Database");
});

app.post("/register", (req, res) => {
    const { username, password, email } = req.body;

    // 1. Check if all fields are provided
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required", ok: false });
    }

    try {
        // 2. Hash the password synchronously
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);

        // 3. Insert into database
        const sql = "INSERT INTO USERS (USERNAME, PASSWORD, EMAIL) VALUES (?,?,?)";
        db.query(sql, [username, hash, email], (err, result) => {
            if (err) {
                // Handle duplicate entry errors (like same email)
                return res.status(500).json({ message: "Database error", error: err.message, ok: false });
            }
            res.status(200).json({ message: "Success", ok: true });
        });
    } catch (error) {
        res.status(500).json({ message: "Hashing failed", ok: false });
    }
});

app.get("/dashboard", (req, res) => {
    const sql = "SELECT * FROM pickles;";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message, ok: false });
        }
        res.status(200).json({ message: "Success", ok: true, data: result });
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});