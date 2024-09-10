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
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const hashPassword = (planePassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt_1.default.hash(planePassword, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        throw new Error("Error al hashear la contraseña");
    }
});
exports.hashPassword = hashPassword;
const comparePassword = (planePassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkPassword = yield bcrypt_1.default.compare(planePassword, hashedPassword);
        return checkPassword;
    }
    catch (err) {
        throw new Error("Error al comparar la contraseña" + err);
    }
});
exports.comparePassword = comparePassword;
exports.default = { hashPassword: exports.hashPassword, comparePassword: exports.comparePassword };
