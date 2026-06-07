const jwt = require("jsonwebtoken");
require('dotenv').config();

const authencate = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access", ok: false });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token", ok: false });
    }
}

module.exports = authencate;
