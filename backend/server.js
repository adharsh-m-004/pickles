const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
db.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
        return;
    }
    console.log("Connected to Database Pool");
    connection.release();
});

app.post("/register", (req, res) => {
    const { username, password, email } = req.body;

    // 1. Check if all fields are provided
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required", ok: false });
    }

    // 2. Hash the password asynchronously
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Hashing failed", ok: false });
        }

        // 3. Insert into database
        const sql = "INSERT INTO USERS (USERNAME, PASSWORD, EMAIL) VALUES (?,?,?)";
        db.query(sql, [username, hash, email], (err, result) => {
            if (err) {
                // Handle duplicate entry errors (like same email)
                return res.status(500).json({ message: "Database error", error: err.message, ok: false });
            }
            res.status(200).json({ message: "Success", ok: true });
        });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required", ok: false });
    }

    const sql = "SELECT * FROM USERS WHERE EMAIL = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", ok: false });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials", ok: false });
        }

        const user = results[0];
        bcrypt.compare(password, user.PASSWORD, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: "Authentication error", ok: false });
            }

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials", ok: false });
            }

            res.status(200).json({
                message: "Login successful",
                ok: true,
                user: { id: user.ID, username: user.USERNAME, email: user.EMAIL }
            });
        });
    });
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
app.get("/my-cart", (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ message: "userId is required", ok: false });
    }
    const sql = "select p.pid,p.name,p.price,c.qty from pickles p join cart c on  p.pid=c.pid where id =?;";
    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message, ok: false });
        }
        res.status(200).json({ message: "Success", ok: true, data: result });
        console.log(result);
    })
});
app.post("/cart", (req, res) => {
    const sql = "INSERT INTO CART (ID,PID,QTY) VALUES(?,?,?);"
    const { id, pid, qty } = req.body;
    db.query(sql, [id, pid, qty], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message, ok: false });
        }
        res.status(200).json({ message: "Success", ok: true });
    });

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});