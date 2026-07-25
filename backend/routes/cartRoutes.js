const express = require("express");
const router = express.Router();

const authencate = require("../middleware/authMiddle");
const validate = require("../middleware/validate");
const { addCartValidator } = require("../middleware/validators");

const db = require("../databse");

/*
=========================================
GET MY CART
=========================================
*/

router.get("/my-cart", authencate, (req, res) => {
    const id = req.user.id;

    const sql = `
        SELECT
            p.pid,
            p.name,
            p.price,
            c.qty
        FROM cart c
        JOIN pickles p
            ON c.pid = p.pid
        WHERE c.id = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: "Database error",
                error: err.message,
            });
        }

        res.json({
            ok: true,
            data: result,
        });
    });
});

/*
=========================================
ADD TO CART
If item already exists,
increase quantity.
=========================================
*/

router.post(
    "/cart",
    authencate,
    addCartValidator,
    validate,
    (req, res) => {
        const id = req.user.id;
        const { pid, qty } = req.body;

        const checkSql =
            "SELECT qty FROM cart WHERE id=? AND pid=?";

        db.query(checkSql, [id, pid], (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: "Database error",
                    error: err.message,
                });
            }

            if (result.length > 0) {

                const newQty = result[0].qty + qty;

                db.query(
                    "UPDATE cart SET qty=? WHERE id=? AND pid=?",
                    [newQty, id, pid],
                    (err) => {

                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                message: "Database error",
                                error: err.message,
                            });
                        }

                        res.json({
                            ok: true,
                            message: "Quantity updated",
                        });
                    }
                );

            } else {

                db.query(
                    "INSERT INTO cart(id,pid,qty) VALUES(?,?,?)",
                    [id, pid, qty],
                    (err) => {

                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                message: "Database error",
                                error: err.message,
                            });
                        }

                        res.json({
                            ok: true,
                            message: "Added to cart",
                        });
                    }
                );

            }
        });
    }
);

/*
=========================================
INCREASE / DECREASE QUANTITY
=========================================
*/

router.patch("/cart/:pid", authencate, (req, res) => {

    const id = req.user.id;
    const pid = req.params.pid;
    const { action } = req.body;

    db.query(
        "SELECT qty FROM cart WHERE id=? AND pid=?",
        [id, pid],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: "Database error",
                    error: err.message,
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    ok: false,
                    message: "Cart item not found",
                });
            }

            let qty = result[0].qty;

            if (action === "increase") {
                qty++;
            }

            if (action === "decrease") {
                qty--;
            }

            if (qty <= 0) {

                db.query(
                    "DELETE FROM cart WHERE id=? AND pid=?",
                    [id, pid],
                    (err) => {

                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                message: "Database error",
                                error: err.message,
                            });
                        }

                        res.json({
                            ok: true,
                            message: "Item removed",
                        });

                    }
                );

                return;
            }

            db.query(
                "UPDATE cart SET qty=? WHERE id=? AND pid=?",
                [qty, id, pid],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            message: "Database error",
                            error: err.message,
                        });
                    }

                    res.json({
                        ok: true,
                        qty,
                    });

                }
            );

        }
    );

});

/*
=========================================
REMOVE ITEM
=========================================
*/

router.delete("/cart/:pid", authencate, (req, res) => {

    const id = req.user.id;
    const pid = req.params.pid;

    db.query(
        "DELETE FROM cart WHERE id=? AND pid=?",
        [id, pid],
        (err) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: "Database error",
                    error: err.message,
                });
            }

            res.json({
                ok: true,
                message: "Item removed",
            });

        }
    );

});

module.exports = router;