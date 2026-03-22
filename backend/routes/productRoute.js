const express = require("express");
const router = express.Router();
const authencate = require("../middleware/authMiddle");
const db = require("../databse");

router.get("/dashboard", authencate, (req, res) => {
    const sql = "SELECT * FROM pickles;";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error 500:Database error", error: err.message, ok: false });
        }
        res.status(201).json({ message: "Success", ok: true, data: result });
    });
});

module.exports = router;