"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editSale = exports.deleteSale = exports.createSale = exports.getTotalSalesThisMonth = exports.getSalesToday = exports.getSalesByDay = exports.getAllSales = void 0;
const connection_1 = __importDefault(require("../config/pg/connection"));
const salesQueries_1 = __importDefault(require("../queries/salesQueries"));
const mappingSales_1 = require("../utils/mappingSales");
const responseHelper_1 = require("../utils/responseHelper");
const getAllSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.default.query(salesQueries_1.default.getAllSales);
        (0, responseHelper_1.handleSuccess)(res, result.rows);
    }
    catch (error) {
        (0, responseHelper_1.handleError)(res, error, "Error al obtener todas las ventas");
    }
});
exports.getAllSales = getAllSales;
const getSalesByDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sale_date = req.params.date;
    const startDate = new Date(sale_date + "T00:00:00Z");
    const endDate = new Date(sale_date + "T23:59:59Z");
    if (!sale_date) {
        return (0, responseHelper_1.handleError)(res, null, "Faltan datos requeridos");
    }
    try {
        const result = yield connection_1.default.query(salesQueries_1.default.getSalesByDay, [
            startDate,
            endDate,
        ]);
        (0, responseHelper_1.handleSuccess)(res, result.rows);
    }
    catch (error) {
        (0, responseHelper_1.handleError)(res, error, "Error a obtener las ventas");
    }
});
exports.getSalesByDay = getSalesByDay;
const getSalesToday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.default.query(salesQueries_1.default.getSalesToday);
        (0, responseHelper_1.handleSuccess)(res, result.rows);
    }
    catch (error) {
        (0, responseHelper_1.handleError)(res, error, "Error al obtener todas las ventas");
    }
});
exports.getSalesToday = getSalesToday;
const getTotalSalesThisMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.default.query(salesQueries_1.default.getTotalSalesMonth);
        (0, responseHelper_1.handleSuccess)(res, result.rows[0]);
    }
    catch (error) {
        console.error("Error al obtener ventas del mes:", error);
        (0, responseHelper_1.handleError)(res, error, "Error al crear la venta");
    }
});
exports.getTotalSalesThisMonth = getTotalSalesThisMonth;
const createSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payment_method_id, amount, customer_dni, sale_date, created_by, turn, } = req.body;
    if (!amount || !turn || !created_by || !payment_method_id) {
        return (0, responseHelper_1.handleError)(res, null, "Faltan datos requeridos");
    }
    try {
        const result = yield connection_1.default.query(salesQueries_1.default.createSale, [
            payment_method_id,
            amount,
            customer_dni,
            sale_date,
            created_by,
            turn,
        ]);
        (0, responseHelper_1.handleSuccess)(res, result.rows[0]);
    }
    catch (error) {
        (0, responseHelper_1.handleError)(res, error, "Error al crear la venta");
    }
});
exports.createSale = createSale;
const deleteSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sale_id } = req.params;
    if (!sale_id) {
        return (0, responseHelper_1.handleError)(res, null, "No seleccionaste la venta a eliminar");
    }
    try {
        const result = yield connection_1.default.query(salesQueries_1.default.deleteSale, [sale_id]);
        (0, responseHelper_1.handleSuccess)(res, result.rows[0]);
    }
    catch (error) {
        (0, responseHelper_1.handleError)(res, error, "Error al eliminar la venta");
    }
});
exports.deleteSale = deleteSale;
const editSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sale_id } = req.params;
    const saleData = Object.assign({}, req.body);
    saleData.turn = mappingSales_1.turnMapping[saleData.turn];
    if (!sale_id) {
        return (0, responseHelper_1.handleError)(res, null, "No seleccionaste la venta a editar");
    }
    if (!saleData.payment_method_id ||
        saleData.amount === undefined ||
        saleData.turn === undefined ||
        !saleData.sale_date) {
        return (0, responseHelper_1.handleError)(res, null, "Faltan datos necesarios para actualizar la venta");
    }
    try {
        const result = yield connection_1.default.query(salesQueries_1.default.updateSale, [
            mappingSales_1.paymentMapping[saleData.payment_method_id],
            saleData.amount,
            saleData.turn,
            saleData.sale_date,
            sale_id,
        ]);
        (0, responseHelper_1.handleSuccess)(res, result.rows[0]);
    }
    catch (error) {
        console.log(error);
        (0, responseHelper_1.handleError)(res, error, "Error al editar la venta");
    }
});
exports.editSale = editSale;
exports.default = {
    getAllSales: exports.getAllSales,
    getSalesByDay: exports.getSalesByDay,
    getSalesToday: exports.getSalesToday,
    getTotalSalesThisMonth: exports.getTotalSalesThisMonth,
    createSale: exports.createSale,
    deleteSale: exports.deleteSale,
    editSale: exports.editSale,
};
