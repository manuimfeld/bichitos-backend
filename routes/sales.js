const express = require("express");
const salesController = require("../controllers/sales");
const router = express.Router();

router.get("/sales", salesController.getAllSales);
router.post("/sales", salesController.createSale);

module.exports = router;
