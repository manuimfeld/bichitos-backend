"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post("/auth/login", auth_1.postAuth);
router.post("/auth/register", auth_1.postRegister);
exports.default = router;
