const express = require("express");
const router = express.Router();
const authencate = require("../middleware/authMiddle");
const validate = require("../middleware/validate");
const { addCartValidator } = require("../middleware/validators");
const db = require("../databse");

router.get("/my-cart", authencate, (req, res) => {
    const userId = req.user.id;

    const sql = `
        SELECT p.pid, p.name, p.price, c.qty
        FROM pickles p
        JOIN cart c ON p.pid = c.pid
        WHERE c.id = ?`;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message, ok: false });
        }
        res.status(200).json({ message: "Success", ok: true, data: result });
    });
});

router.post("/cart", authencate, addCartValidator, validate, (req, res) => {
    const { pid, qty } = req.body;
    const id = req.user.id;

    const sql = "INSERT INTO CART (ID, PID, QTY) VALUES (?, ?, ?)";
    db.query(sql, [id, pid, qty], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message, ok: false });
        }
        res.status(200).json({ message: "Success", ok: true });
    });
});

module.exports = router;