const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Authentication middleware.
 *
 * 1. Reads the access_token cookie.
 * 2. If valid → attaches req.user and calls next().
 * 3. If expired AND a refresh_token cookie exists → tells the client
 *    to refresh (401 + { refresh: true }).  The frontend then hits
 *    POST /api/auth/refresh and retries the original request.
 *    (You can also do the refresh server-side here if you prefer.)
 */
const authencate = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized access", ok: false });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError" && req.cookies.refresh_token) {
            // Signal to the client that it should call /api/auth/refresh then retry
            return res.status(401).json({
                message: "Access token expired",
                refresh: true,
                ok: false,
            });
        }
        return res.status(403).json({ message: "Invalid token", ok: false });
    }
};

module.exports = authencate;