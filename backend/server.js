const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
const port = 3001;

const corsOptions = { origin: "http://localhost:3000", credentials: true };

app.use(cookieparser());
app.use(cors(corsOptions));

// ✅ Fix 1: Use a regex (works with Express 4 & 5)
app.options(/.*/, cors(corsOptions));

// ✅ Fix 2 (Express 5 only): Use named wildcard syntax
// app.options("/{*splat}", cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});