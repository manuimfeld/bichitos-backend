const express = require("express");
const salesController = require("../controllers/sales");
const { authenticateJWT, authorizeRole } = require("../utils/jwt");
const router = express.Router();

router.get(
  "/sales",
  authenticateJWT,
  authorizeRole("admin"),
  salesController.getAllSales
);
router.post("/sales", salesController.createSale);

module.exports = router;
