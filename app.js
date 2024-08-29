const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const salesRoutes = require("./routes/sales");
const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const expensesRoutes = require("./routes/expenses");
const providersRoutes = require("./routes/providers");

app.use("/api", salesRoutes);
app.use("/api", authRoutes);
app.use("/api", productsRoutes);
app.use("/api", expensesRoutes);
app.use("/api", providersRoutes);

app.listen(process.env.API_PORT);
