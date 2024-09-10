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
exports.getExpensesMonthly = void 0;
const connection_1 = __importDefault(require("../../config/pg/connection"));
const expensesQueries_1 = __importDefault(require("../../queries/expensesQueries"));
const responseHelper_1 = require("../../utils/responseHelper");
const getExpensesMonthly = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.default.query(expensesQueries_1.default.getExpensesByMonth);
        (0, responseHelper_1.handleSuccess)(res, result.rows);
    }
    catch (error) {
        console.log(error);
        (0, responseHelper_1.handleError)(res, error, "Error al obtener todos los gastos");
    }
});
exports.getExpensesMonthly = getExpensesMonthly;
