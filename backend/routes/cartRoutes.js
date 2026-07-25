const express = require("express");
const router = express.Router();

const authenticate = require("../middleware/authMiddle");
const validate = require("../middleware/validate");
const { addCartValidator } = require("../middleware/validators");

const db = require("../databse");

/*
=========================================
GET MY CART
=========================================
*/
router.get("/my-cart", authenticate, (req, res) => {
    const id = req.user.id;

    const sql = `
        SELECT
            p.pid,
            p.name,
            p.price,
            c.qty
        FROM cart c
        JOIN pickles p ON c.pid = p.pid
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
=========================================
*/
router.post(
    "/cart",
    authenticate,
    addCartValidator,
    validate,
    (req, res) => {
        const id = req.user.id;
        const { pid, qty } = req.body;

        db.query(
            "SELECT pid FROM pickles WHERE pid=?",
            [pid],
            (err, product) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: "Database error",
                        error: err.message,
                    });
                }

                if (product.length === 0) {
                    return res.status(404).json({
                        ok: false,
                        message: "Product not found",
                    });
                }

                db.query(
                    "SELECT qty FROM cart WHERE id=? AND pid=?",
                    [id, pid],
                    (err, cart) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                message: "Database error",
                                error: err.message,
                            });
                        }

                        if (cart.length > 0) {
                            const newQty = cart[0].qty + qty;

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

                                    return res.json({
                                        ok: true,
                                        message: "Cart updated",
                                        qty: newQty,
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

                                    return res.status(201).json({
                                        ok: true,
                                        message: "Added to cart",
                                    });
                                }
                            );
                        }
                    }
                );
            }
        );
    }
);

/*
=========================================
CHANGE QUANTITY
=========================================
*/
router.patch("/cart/:pid", authenticate, (req, res) => {
    const id = req.user.id;
    const pid = Number(req.params.pid);
    const { action } = req.body;

    if (!["increase", "decrease"].includes(action)) {
        return res.status(400).json({
            ok: false,
            message: "Action must be 'increase' or 'decrease'",
        });
    }

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

            qty = action === "increase" ? qty + 1 : qty - 1;

            if (qty <= 0) {
                return db.query(
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

                        return res.json({
                            ok: true,
                            message: "Item removed",
                        });
                    }
                );
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
                        message: "Quantity updated",
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
router.delete("/cart/:pid", authenticate, (req, res) => {
    const id = req.user.id;
    const pid = Number(req.params.pid);

    db.query(
        "DELETE FROM cart WHERE id=? AND pid=?",
        [id, pid],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: "Database error",
                    error: err.message,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    ok: false,
                    message: "Cart item not found",
                });
            }

            res.json({
                ok: true,
                message: "Item removed successfully",
            });
        }
    );
});

module.exports = router;