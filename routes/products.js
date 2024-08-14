const express = require("express");
const { authenticateJWT } = require("../utils/jwt");
const productsController = require("../controllers/products");
const router = express.Router();

router.get("/products", authenticateJWT, productsController.getAllProducts);
router.post("/products", authenticateJWT, productsController.createProduct);

module.exports = router;
