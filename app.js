const express = require("express");
const cors = require("cors");
const pool = require("./config/pg/connection");

const app = express();
app.use(cors());
app.use(express.json());

const salesRoutes = require("./routes/sales");

app.use("/api", salesRoutes);
app.listen(process.env.API_PORT);
