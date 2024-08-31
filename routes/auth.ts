import { Router } from "express";
import { postAuth, postRegister } from "../controllers/auth";

const router = Router();

router.post("/auth/login", postAuth);
router.post("/auth/register", postRegister);

export default router;
