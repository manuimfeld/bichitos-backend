"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authPostController_1 = require("../controllers/auth/authPostController");
const router = (0, express_1.Router)();
// Ruta para autenticación (login)
router.post("/auth/login", authPostController_1.postAuth);
// Ruta para registro
router.post("/auth/register", authPostController_1.postRegister);
exports.default = router;
