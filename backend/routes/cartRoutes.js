const express = require("express");
const router = express.Router();
const authencate = require("../middleware/authMiddle");
const db = require("../databse");


router.get("/my-cart", authencate, (req, res) => {
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
    });
});

router.post("/cart", authencate, (req, res) => {
    const sql = "INSERT INTO CART (ID,PID,QTY) VALUES(?,?,?);"
    const { id, pid, qty } = req.body;
    db.query(sql, [id, pid, qty], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err.message, ok: false });
        }
        res.status(200).json({ message: "Success", ok: true });
    });
});

module.exports = router;
