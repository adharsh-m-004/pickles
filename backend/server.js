const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoutes");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./config/logger");

const app = express();
const port = process.env.BACKEND_PORT || 3001;

// ─── Security headers ─────────────────────────────────────────────────────────
app.use(helmet());

// ─── Rate limiting ────────────────────────────────────────────────────────────

// Global limiter — all routes
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 200,
    standardHeaders: true,      // Return limit info in RateLimit-* headers
    legacyHeaders: false,
    message: { ok: false, message: "Too many requests, please try again later." },
});

// Stricter limiter for auth endpoints (brute-force protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,                    // max 20 login/register attempts per 15 min per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, message: "Too many auth attempts, please try again in 15 minutes." },
    skipSuccessfulRequests: true, // Only counts failed responses
});

app.use(globalLimiter);

// ─── CORS ─────────────────────────────────────────────────────────────────────
const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
};
app.use(cookieparser());
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

// ─── Request logging ──────────────────────────────────────────────────────────
app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        logger.info({
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            ms: Date.now() - start,
            ip: req.ip,
        });
    });
    next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authLimiter, authRoute);   // stricter limit on auth
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoutes);

// ─── Centralised error handler (must be last) ─────────────────────────────────
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});