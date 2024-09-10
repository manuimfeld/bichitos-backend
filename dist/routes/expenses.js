"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../utils/jwt");
const expensesGetController_1 = require("../controllers/expenses/expensesGetController");
const expensesPostController_1 = require("../controllers/expenses/expensesPostController");
const expensesSummaryController_1 = require("../controllers/expenses/expensesSummaryController");
const router = (0, express_1.Router)();
// Autenticación JWT para todas las rutas
router.use(jwt_1.authenticateJWT);
router.get("/expenses", expensesGetController_1.getAllExpenses);
router.get("/expenses/summary/month", expensesGetController_1.getTotalExpensesThisMonth);
router.get("/expenses/month", expensesSummaryController_1.getExpensesMonthly);
router.post("/expenses", expensesPostController_1.createExpense);
exports.default = router;
