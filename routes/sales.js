const express = require("express");
const salesController = require("../controllers/sales");
const { authenticateJWT, authorizeRole } = require("../utils/jwt");
const router = express.Router();

router.get("/sales", authenticateJWT, salesController.getAllSales);

router.get("/sales/today", authenticateJWT, salesController.getSalesToday);

router.get("/sales/:date", authenticateJWT, salesController.getSalesByDay);

router.post(
  "/sales",
  authenticateJWT,
  authorizeRole("admin"),
  salesController.createSale
);

module.exports = router;
