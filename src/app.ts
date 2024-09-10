import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import data from "./swagger/swagger.json";

//Import routes
import salesRoutes from "./routes/sales";
import authRoutes from "./routes/auth";
import providersRoutes from "./routes/providers";
import expensesRoutes from "./routes/expenses";

//Config app
const app = express();
app.use(cors());
app.use(express.json());
const API_PORT = process.env.API_PORT || 3001;

//Declare use routes
app.use("/api", salesRoutes);
app.use("/api", authRoutes);
app.use("/api", expensesRoutes);
app.use("/api", providersRoutes);

// Configura Swagger UI en tu aplicación Express
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(data));

app.listen(API_PORT);
