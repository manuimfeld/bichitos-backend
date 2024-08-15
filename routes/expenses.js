const express = require("express");
const { authenticateJWT } = require("../utils/jwt");
const expensesController = require("../controllers/expenses");
const router = express.Router();

router.get("/expenses", authenticateJWT, expensesController.getAllExpenses);
router.post("/expenses", authenticateJWT, expensesController.createExpense);

module.exports = router;
