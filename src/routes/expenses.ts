import { Router } from "express";
import { authenticateJWT } from "../utils/jwt";
import {
  getAllExpenses,
  getExpensesCurrentMonth,
} from "../controllers/expenses/expensesGetController";
import { createExpense } from "../controllers/expenses/expensesPostController";
import { getCurrentMonthExpensesSummary } from "../controllers/expenses/expensesSummaryController";
const router = Router();

// Autenticación JWT para todas las rutas
router.use(authenticateJWT);

// Rutas para obtener y crear ventas
router.route("/expenses").get(getAllExpenses).post(createExpense);

// Ruta para obtener gastos del mes
router.get("/expenses/month", getExpensesCurrentMonth);

// Rutas para resúmenes de ventas
router.get("/expenses/summary/month", getCurrentMonthExpensesSummary);

export default router;
