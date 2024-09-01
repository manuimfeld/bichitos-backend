"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../utils/jwt");
const expenses_1 = __importDefault(require("../controllers/expenses"));
const router = (0, express_1.Router)();
router.get("/expenses", jwt_1.authenticateJWT, expenses_1.default.getExpensesByMonth);
router.get("/expenses-month", jwt_1.authenticateJWT, expenses_1.default.getTotalExpensesThisMonth);
router.post("/expenses", jwt_1.authenticateJWT, expenses_1.default.createExpense);
exports.default = router;
