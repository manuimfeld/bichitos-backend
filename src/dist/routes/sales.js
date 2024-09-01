"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sales_1 = __importDefault(require("../controllers/sales"));
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
router.get("/sales", jwt_1.authenticateJWT, sales_1.default.getAllSales);
router.get("/sales/today", jwt_1.authenticateJWT, sales_1.default.getSalesToday);
router.get("/sales/:date", jwt_1.authenticateJWT, sales_1.default.getSalesByDay);
router.get("/sales-month", jwt_1.authenticateJWT, sales_1.default.getTotalSalesThisMonth);
router.post("/sales", jwt_1.authenticateJWT, (0, jwt_1.authorizeRole)("admin"), sales_1.default.createSale);
router.delete("/sales/:sale_id", jwt_1.authenticateJWT, (0, jwt_1.authorizeRole)("admin"), sales_1.default.deleteSale);
router.put("/sales/:sale_id", jwt_1.authenticateJWT, (0, jwt_1.authorizeRole)("admin"), sales_1.default.editSale);
exports.default = router;
