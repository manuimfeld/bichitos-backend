import cors from "cors";
import express from "express";
//Routes
import authRoutes from "./routes/auth";
import providersRoutes from "./routes/providers";
import expensesRoutes from "./routes/expenses";
//

const app = express();
app.use(cors());
app.use(express.json());

/* const salesRoutes = require("./routes/sales");

/* app.use("/api", salesRoutes); */
app.use("/api", authRoutes);
app.use("/api", expensesRoutes);
app.use("/api", providersRoutes);

app.listen(process.env.API_PORT);
