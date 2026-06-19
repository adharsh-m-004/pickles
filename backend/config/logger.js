const { createLogger, format, transports } = require("winston");
const path = require("path");

const { combine, timestamp, json, colorize, simple, errors } = format;

const isProduction = process.env.NODE_ENV === "production";

const logger = createLogger({
    // Default log level — override with LOG_LEVEL env var
    level: process.env.LOG_LEVEL || (isProduction ? "info" : "debug"),

    format: combine(
        errors({ stack: true }),   // include stack traces on Error objects
        timestamp(),
        json()                     // machine-readable in prod / files
    ),

    transports: [
        // ── Console ──────────────────────────────────────────────────────────
        new transports.Console({
            format: isProduction
                ? combine(timestamp(), json())
                : combine(colorize(), simple()),  // human-readable in dev
        }),

        // ── Persistent log files ─────────────────────────────────────────────
        new transports.File({
            filename: path.join(__dirname, "../logs/error.log"),
            level: "error",
            maxsize: 5 * 1024 * 1024,  // 5 MB
            maxFiles: 5,
        }),
        new transports.File({
            filename: path.join(__dirname, "../logs/combined.log"),
            maxsize: 10 * 1024 * 1024, // 10 MB
            maxFiles: 5,
        }),
    ],
});

module.exports = logger;