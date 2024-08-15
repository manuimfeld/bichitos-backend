const express = require("express");
const { authenticateJWT } = require("../utils/jwt");
const expensesController = require("../controllers/expenses");
const router = express.Router();

router.get("/expenses", authenticateJWT, expensesController.getAllProducts);
router.post("/expenses", authenticateJWT, expensesController.createProduct);

module.exports = router;
