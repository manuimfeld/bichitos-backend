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
exports.createExpense = void 0;
const connection_1 = __importDefault(require("../../config/pg/connection"));
const expensesQueries_1 = __importDefault(require("../../queries/expensesQueries"));
const responseHelper_1 = require("../../utils/responseHelper");
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { expenses_date, provider_id, expenses_type, amount, is_paid } = req.body;
    if (!expenses_date || !provider_id || !expenses_type || !amount || !is_paid) {
        return (0, responseHelper_1.handleError)(res, null, "Faltan datos requeridos");
    }
    try {
        const result = yield connection_1.default.query(expensesQueries_1.default.createExpense, [
            expenses_date,
            provider_id,
            expenses_type,
            amount,
            is_paid,
        ]);
        (0, responseHelper_1.handleSuccess)(res, result.rows);
    }
    catch (error) {
        console.log(error);
        (0, responseHelper_1.handleError)(res, error, "Error al crear el gasto");
    }
});
exports.createExpense = createExpense;
