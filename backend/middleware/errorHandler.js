const logger = require("../config/logger");

/**
 * Centralised error-handling middleware.
 *
 * Usage in routes — instead of inline res.status(500).json(…), do:
 *
 *   router.get("/something", authencate, async (req, res, next) => {
 *       try {
 *           // ... your logic
 *       } catch (err) {
 *           next(err);   // ← hands off to this handler
 *       }
 *   });
 *
 * Express recognises a 4-argument middleware as an error handler.
 */
const errorHandler = (err, req, res, next) => {
    // Log the full error server-side (never expose stack traces to clients)
    logger.error({
        message: err.message,
        stack: err.stack,
        method: req.method,
        url: req.originalUrl,
        user: req.user?.id ?? "unauthenticated",
    });

    // Map known error types to HTTP statuses
    if (err.name === "ValidationError") {
        return res.status(400).json({ ok: false, message: err.message });
    }

    if (err.name === "UnauthorizedError" || err.status === 401) {
        return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ ok: false, message: "Duplicate entry" });
    }

    // Generic fallback — never leak internals in production
    const statusCode = err.status || err.statusCode || 500;
    const message =
        process.env.NODE_ENV === "production"
            ? "An unexpected error occurred"
            : err.message;

    return res.status(statusCode).json({ ok: false, message });
};

module.exports = errorHandler;