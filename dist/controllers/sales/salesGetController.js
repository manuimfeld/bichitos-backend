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
exports.getSalesByDay = exports.getSalesToday = exports.getAllSales = void 0;
const connection_1 = __importDefault(require("../../config/pg/connection"));
const salesQueries_1 = __importDefault(require("../../queries/salesQueries"));
const responseHelper_1 = require("../../utils/responseHelper");
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
