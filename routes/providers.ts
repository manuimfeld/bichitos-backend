import { Router } from "express";
import { authenticateJWT } from "../utils/jwt";
import { getAllProviders } from "../controllers/providers";

const router = Router();

router.get("/providers", authenticateJWT, getAllProviders);

export default router;
