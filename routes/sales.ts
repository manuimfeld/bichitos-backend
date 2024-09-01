import { Router } from "express";
import salesController from "../controllers/sales";
import { authenticateJWT, authorizeRole } from "../utils/jwt";
const router = Router();

router.get("/sales", authenticateJWT, salesController.getAllSales);

router.get("/sales/today", authenticateJWT, salesController.getSalesToday);

router.get("/sales/:date", authenticateJWT, salesController.getSalesByDay);

router.get(
  "/sales-month",
  authenticateJWT,
  salesController.getTotalSalesThisMonth
);

router.post(
  "/sales",
  authenticateJWT,
  authorizeRole("admin"),
  salesController.createSale
);

router.delete(
  "/sales/:sale_id",
  authenticateJWT,
  authorizeRole("admin"),
  salesController.deleteSale
);

router.put(
  "/sales/:sale_id",
  authenticateJWT,
  authorizeRole("admin"),
  salesController.editSale
);

export default router;
