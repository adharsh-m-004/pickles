const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoutes");
const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});