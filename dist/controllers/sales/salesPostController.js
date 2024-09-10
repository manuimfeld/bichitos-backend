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
exports.createSale = void 0;
const connection_1 = __importDefault(require("../../config/pg/connection"));
const salesQueries_1 = __importDefault(require("../../queries/salesQueries"));
const responseHelper_1 = require("../../utils/responseHelper");
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
