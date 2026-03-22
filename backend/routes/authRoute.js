const authencate = require("../middleware/authMiddle");
const express = require("express");
const router = express.Router();
const db = require("../databse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ message: "All fields are required", ok: false });
    }
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Hashing failed", ok: false });
        }
        const sql = "INSERT INTO USERS (USERNAME, PASSWORD, EMAIL) VALUES (?,?,?)";
        db.query(sql, [username, hash, email], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err.message, ok: false });
            }
            res.status(200).json({ message: "Success", ok: true });
        });
    });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required", ok: false });
    }
    const sql = "SELECT * FROM USERS WHERE EMAIL = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Error 500:Database error", ok: false });
        }
        if (results.length === 0) {
            return res.status(401).json({ message: "Error 401:Invalid credentials", ok: false });
        }
        const user = results[0];
        bcrypt.compare(password, user.PASSWORD, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: "Error 500:Authentication error", ok: false });
            }
            if (!isMatch) {
                return res.status(401).json({ message: "Error 401:Invalid credentials", ok: false });
            }
            const token = jwt.sign(
                { id: user.ID, username: user.USERNAME, email: user.EMAIL },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                message: "Login successful",
                ok: true,
                user: { id: user.ID, username: user.USERNAME, email: user.EMAIL },
                token: token
            });
        });
    });
});
module.exports = router;