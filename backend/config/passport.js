const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const db = require("../databse");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    const googleId = profile.id;
    const username = profile.displayName;

    db.query("SELECT * FROM users WHERE google_id = ? OR email = ?", [googleId, email], (err, rows) => {
        if (err) return done(err);

        if (rows.length > 0) {
            return done(null, rows[0]); // existing user
        }

        db.query(
            "INSERT INTO users (username, email, google_id) VALUES (?, ?, ?)",
            [username, email, googleId],
            (err, result) => {
                if (err) return done(err);
                done(null, { id: result.insertId, username, email });
            }
        );
    });
}));

module.exports = passport;