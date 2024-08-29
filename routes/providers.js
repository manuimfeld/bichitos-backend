const express = require("express");
const { authenticateJWT } = require("../utils/jwt");
const providersController = require("../controllers/providers");
const router = express.Router();

router.get("/providers", authenticateJWT, providersController.getAllProviders);

module.exports = router;
