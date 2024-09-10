import { Router } from "express";
import { authenticateJWT, authorizeRole } from "../utils/jwt";
import {
  getAllSales,
  getSalesToday,
  getSalesByDay,
} from "@/controllers/sales/salesGetController";
import {
  getTotalSalesThisMonth,
  getTotalSalesYear,
} from "@/controllers/sales/salesSummaryController";
import { createSale } from "@/controllers/sales/salesPostController";
import { deleteSale } from "@/controllers/sales/salesDeleteController";
import { editSale } from "@/controllers/sales/salesPutController";
const router = Router();

// Autenticación JWT para todas las rutas
router.use(authenticateJWT);

// Rutas para obtener y crear ventas
router
  .route("/sales")
  .get(getAllSales)
  .post(authorizeRole("admin"), createSale);
router.route("/sales/today").get(getSalesToday);
router.route("/sales/:date").get(getSalesByDay);

// Rutas para resúmenes de ventas
router.get("/sales/summary/month", getTotalSalesThisMonth);
router.get("/sales/summary/year", getTotalSalesYear);

// Rutas para modificar y eliminar ventas
router
  .route("/sales/:sale_id")
  .delete(authorizeRole("admin"), deleteSale)
  .put(authorizeRole("admin"), editSale);

export default router;
