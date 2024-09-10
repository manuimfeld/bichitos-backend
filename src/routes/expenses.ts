import { Router } from "express";
import { authenticateJWT } from "../utils/jwt";
import {
  getAllExpenses,
  getTotalExpensesThisMonth,
} from "../controllers/expenses/expensesGetController";
import { createExpense } from "../controllers/expenses/expensesPostController";
import { getExpensesMonthly } from "../controllers/expenses/expensesSummaryController";
const router = Router();

// Autenticación JWT para todas las rutas
router.use(authenticateJWT);

router.get("/expenses", getAllExpenses);
router.get("/expenses/summary/month", getTotalExpensesThisMonth);
router.get("/expenses/month", getExpensesMonthly);
router.post("/expenses", createExpense);

export default router;
