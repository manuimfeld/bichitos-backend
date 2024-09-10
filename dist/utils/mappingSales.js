"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMapping = exports.turnMapping = void 0;
exports.turnMapping = {
    Mañana: 1,
    Tarde: 2,
};
exports.paymentMapping = {
    Efectivo: 1,
    Transferencia: 2,
    Débito: 3,
    Crédito: 4,
};
exports.default = { turnMapping: exports.turnMapping, paymentMapping: exports.paymentMapping };
