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
exports.getTotalSalesYear = exports.getTotalSalesThisMonth = void 0;
const connection_1 = __importDefault(require("../../config/pg/connection"));
const salesQueries_1 = __importDefault(require("../../queries/salesQueries"));
const responseHelper_1 = require("../../utils/responseHelper");
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
const getTotalSalesYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.default.query(salesQueries_1.default.getTotalSalesYear);
        (0, responseHelper_1.handleSuccess)(res, result.rows);
    }
    catch (error) {
        console.error("Error al obtener ventas del mes:", error);
        (0, responseHelper_1.handleError)(res, error, "Error al crear la venta");
    }
});
exports.getTotalSalesYear = getTotalSalesYear;
