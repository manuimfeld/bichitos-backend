import { Router } from "express";
import { authenticateJWT } from "../utils/jwt";
import expensesController from "../controllers/expenses";

const router = Router();

router.get("/expenses", authenticateJWT, expensesController.getExpensesByMonth);
router.get(
  "/expenses-month",
  authenticateJWT,
  expensesController.getTotalExpensesThisMonth
);
router.post("/expenses", authenticateJWT, expensesController.createExpense);

export default router;
