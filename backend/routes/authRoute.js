const express = require("express");
const router = express.Router();
const db = require("../databse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authencate = require("../middleware/authMiddle");
const validate = require("../middleware/validate");
const { registerValidator, loginValidator } = require("../middleware/validators");

// ─── Token helpers ────────────────────────────────────────────────────────────

function signAccess(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "15m" });
}

function signRefresh(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

function setTokenCookies(res, accessToken, refreshToken) {
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,            // 15 min
    });
    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
        path: "/api/auth/refresh",          // scoped: only sent to this endpoint
    });
}

// ─── Routes ───────────────────────────────────────────────────────────────────

router.post("/register", registerValidator, validate, (req, res) => {
    const { username, password, email } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ message: "Hashing failed", ok: false });

        const sql = "INSERT INTO USERS (USERNAME, PASSWORD, EMAIL) VALUES (?,?,?)";
        db.query(sql, [username, hash, email], (err) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY")
                    return res.status(409).json({ message: "Email already registered", ok: false });
                return res.status(500).json({ message: "Database error", ok: false });
            }
            res.status(201).json({ message: "User registered successfully", ok: true });
        });
    });
});

router.post("/login", loginValidator, validate, (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM USERS WHERE EMAIL = ?", [email], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", ok: false });
        if (results.length === 0)
            return res.status(401).json({ message: "Invalid credentials", ok: false });

        const user = results[0];
        bcrypt.compare(password, user.PASSWORD, (err, isMatch) => {
            if (err) return res.status(500).json({ message: "Authentication error", ok: false });
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials", ok: false });

            const payload = { id: user.ID, username: user.USERNAME, email: user.EMAIL };
            const accessToken = signAccess(payload);
            const refreshToken = signRefresh(payload);

            // Persist refresh token in DB so we can revoke it
            db.query(
                "INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)",
                [user.ID, refreshToken],
                (err) => {
                    if (err) return res.status(500).json({ message: "Token storage failed", ok: false });
                    setTokenCookies(res, accessToken, refreshToken);
                    return res.status(200).json({ message: "Login successful", ok: true });
                }
            );
        });
    });
});

// POST /api/auth/refresh  — rotate both tokens
router.post("/refresh", (req, res) => {
    const token = req.cookies.refresh_token;
    if (!token) return res.status(401).json({ message: "No refresh token", ok: false });

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch {
        return res.status(403).json({ message: "Invalid or expired refresh token", ok: false });
    }

    // Check the token is still in our DB (not revoked)
    db.query(
        "SELECT * FROM refresh_tokens WHERE token = ? AND user_id = ?",
        [token, decoded.id],
        (err, rows) => {
            if (err) return res.status(500).json({ message: "Database error", ok: false });
            if (rows.length === 0)
                return res.status(403).json({ message: "Refresh token revoked", ok: false });

            // Delete old token and issue new pair  (rotation)
            db.query("DELETE FROM refresh_tokens WHERE token = ?", [token], (err) => {
                if (err) return res.status(500).json({ message: "Token rotation failed", ok: false });

                const payload = { id: decoded.id, username: decoded.username, email: decoded.email };
                const accessToken = signAccess(payload);
                const refreshToken = signRefresh(payload);

                db.query(
                    "INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)",
                    [decoded.id, refreshToken],
                    (err) => {
                        if (err) return res.status(500).json({ message: "Token storage failed", ok: false });
                        setTokenCookies(res, accessToken, refreshToken);
                        return res.status(200).json({ message: "Tokens refreshed", ok: true });
                    }
                );
            });
        }
    );
});

router.post("/me", authencate, (req, res) => {
    res.status(200).json({
        ok: true,
        user: { id: req.user.id, username: req.user.username, email: req.user.email },
    });
});

router.post("/logout", (req, res) => {
    const token = req.cookies.refresh_token;
    if (token) {
        // Revoke the refresh token from the DB
        db.query("DELETE FROM refresh_tokens WHERE token = ?", [token], () => { });
    }
    res.clearCookie("access_token", { httpOnly: true, sameSite: "lax" });
    res.clearCookie("refresh_token", { httpOnly: true, sameSite: "lax", path: "/api/auth/refresh" });
    res.status(200).json({ message: "Logged out successfully", ok: true });
});

module.exports = router;