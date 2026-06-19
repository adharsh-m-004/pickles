const express = require("express");
const router = express.Router();
const db = require("../databse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authencate = require("../middleware/authMiddle");
const validate = require("../middleware/validate");
const { registerValidator, loginValidator } = require("../middleware/validators");

// validators run first, then validate checks for errors, then your handler
router.post("/register", registerValidator, validate, (req, res) => {
    const { username, password, email } = req.body;

    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Hashing failed", ok: false });
        }
        const sql = "INSERT INTO USERS (USERNAME, PASSWORD, EMAIL) VALUES (?,?,?)";
        db.query(sql, [username, hash, email], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).json({ message: "Email already registered", ok: false });
                }
                return res.status(500).json({ message: "Database error", ok: false });
            }
            res.status(201).json({ message: "User registered successfully", ok: true });
        });
    });
});

router.post("/login", loginValidator, validate, (req, res) => {
    const { email, password } = req.body;

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
            const token = jwt.sign(
                { id: user.ID, username: user.USERNAME, email: user.EMAIL },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h" }
            );
            res.cookie("access_token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 60 * 60 * 1000
            });
            return res.status(200).json({ message: "Login successful", ok: true });
        });
    });
});

router.post("/me", authencate, (req, res) => {
    res.status(200).json({
        ok: true,
        user: { id: req.user.id, username: req.user.username, email: req.user.email }
    });
});

router.post("/logout", (req, res) => {
    res.clearCookie("access_token", { httpOnly: true, secure: false, sameSite: "lax" });
    res.status(200).json({ message: "Logged out successfully", ok: true });
});

module.exports = router;