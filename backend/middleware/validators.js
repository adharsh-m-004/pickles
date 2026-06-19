const { body, query, param } = require("express-validator");

const registerValidator = [
    body("username")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3, max: 30 }).withMessage("Username must be 3–30 characters")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username can only contain letters, numbers, and underscores"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number"),
];

const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Must be a valid email address")
        .normalizeEmail(),

    body("password")
        .notEmpty().withMessage("Password is required"),
];

const addCartValidator = [
    body("pid")
        .notEmpty().withMessage("Product ID is required")
        .isInt({ min: 1 }).withMessage("Product ID must be a positive integer"),

    body("qty")
        .notEmpty().withMessage("Quantity is required")
        .isInt({ min: 1, max: 100 }).withMessage("Quantity must be between 1 and 100"),
];

module.exports = { registerValidator, loginValidator, addCartValidator };