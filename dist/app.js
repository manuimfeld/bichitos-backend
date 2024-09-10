"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
//Import routes
const sales_1 = __importDefault(require("./routes/sales"));
const auth_1 = __importDefault(require("./routes/auth"));
const providers_1 = __importDefault(require("./routes/providers"));
const expenses_1 = __importDefault(require("./routes/expenses"));
//Config app
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const API_PORT = process.env.API_PORT || 3001;
//Declare use routes
app.use("/api", sales_1.default);
app.use("/api", auth_1.default);
app.use("/api", expenses_1.default);
app.use("/api", providers_1.default);
app.listen(API_PORT);
