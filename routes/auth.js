const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post("/auth/login", authController.postAuth);
router.post("/auth/register", authController.postRegister);

module.exports = router;
