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
exports.editSale = void 0;
const connection_1 = __importDefault(require("../../config/pg/connection"));
const salesQueries_1 = __importDefault(require("../../queries/salesQueries"));
const mappingSales_1 = require("../../utils/mappingSales");
const responseHelper_1 = require("../../utils/responseHelper");
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
