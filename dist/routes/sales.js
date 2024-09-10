"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_1 = require("../utils/jwt");
const salesGetController_1 = require("../controllers/sales/salesGetController");
const salesSummaryController_1 = require("../controllers/sales/salesSummaryController");
const salesPostController_1 = require("../controllers/sales/salesPostController");
const salesDeleteController_1 = require("../controllers/sales/salesDeleteController");
const salesPutController_1 = require("../controllers/sales/salesPutController");
const router = (0, express_1.Router)();
// Autenticación JWT para todas las rutas
router.use(jwt_1.authenticateJWT);
// Rutas para obtener y crear ventas
router
    .route("/sales")
    .get(salesGetController_1.getAllSales)
    .post((0, jwt_1.authorizeRole)("admin"), salesPostController_1.createSale);
router.get("/sales/today", salesGetController_1.getSalesToday);
router.get("/sales/:date", salesGetController_1.getSalesByDay);
// Rutas para resúmenes de ventas
router.get("/sales/summary/month", salesSummaryController_1.getTotalSalesThisMonth);
router.get("/sales/summary/year", salesSummaryController_1.getTotalSalesYear);
// Rutas para modificar y eliminar ventas
router
    .route("/sales/:sale_id")
    .delete((0, jwt_1.authorizeRole)("admin"), salesDeleteController_1.deleteSale)
    .put((0, jwt_1.authorizeRole)("admin"), salesPutController_1.editSale);
exports.default = router;
