"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.handleSuccess = void 0;
const handleSuccess = (res, data) => {
    if (!res.headersSent) {
        res.status(200).json(data);
    }
};
exports.handleSuccess = handleSuccess;
const handleError = (res, error, message) => {
    if (!res.headersSent) {
        // Verifica si error es null o undefined y maneja la excepción
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res.status(500).json({ error: message, details: errorMessage });
    }
};
exports.handleError = handleError;
exports.default = { handleSuccess: exports.handleSuccess, handleError: exports.handleError };
