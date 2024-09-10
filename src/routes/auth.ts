import { Router } from "express";
import { postAuth, postRegister } from "../controllers/auth/authPostController";

const router = Router();

// Ruta para autenticación (login)
router.post("/auth/login", postAuth);

// Ruta para registro
router.post("/auth/register", postRegister);

export default router;
