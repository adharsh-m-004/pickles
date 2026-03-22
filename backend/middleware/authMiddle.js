const jwt = require("jsonwebtoken");
require('dotenv').config();

const authencate = (req, res, next) => {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {  // ✅ capital S, space after Bearer
        return res.status(401).json({ message: "Unauthorized access", ok: false });
    }

    const token = auth.split(" ")[1];

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token", ok: false });
    }
}

module.exports = authencate;
