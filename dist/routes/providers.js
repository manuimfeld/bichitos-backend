"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../utils/jwt");
const providers_1 = require("../controllers/providers");
const router = (0, express_1.Router)();
router.get("/providers", jwt_1.authenticateJWT, providers_1.getAllProviders);
exports.default = router;
