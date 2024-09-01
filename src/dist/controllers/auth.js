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
exports.postRegister = exports.postAuth = void 0;
const connection_1 = __importDefault(require("../config/pg/connection"));
const authQueries_1 = __importDefault(require("../queries/authQueries"));
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const responseHelper_1 = require("../utils/responseHelper");
const postAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return (0, responseHelper_1.handleError)(res, null, "Faltan datos requeridos");
    }
    try {
        const result = yield connection_1.default.query(authQueries_1.default.checkAuth, [username]);
        const data = result.rows[0];
        if (!data) {
            return (0, responseHelper_1.handleError)(res, null, "Nombre de usuario incorrecto");
        }
        const checkPassword = yield (0, bcrypt_1.comparePassword)(password, data.password);
        if (checkPassword) {
            const jwt = (0, jwt_1.signJwt)({
                user_id: data.user_id,
                username: data.username,
                role: data.role,
            });
            (0, responseHelper_1.handleSuccess)(res, { jwt: jwt });
        }
        else {
            (0, responseHelper_1.handleError)(res, null, "Contraseña incorrecta");
        }
    }
    catch (error) {
        console.log(error);
        (0, responseHelper_1.handleError)(res, error, "Error al iniciar sesión");
    }
});
exports.postAuth = postAuth;
const postRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
    if (!username || !password) {
        return (0, responseHelper_1.handleError)(res, null, "Faltan datos requeridos");
    }
    try {
        const result = yield connection_1.default.query(authQueries_1.default.createUser, [
            username,
            hashedPassword,
        ]);
        (0, responseHelper_1.handleSuccess)(res, result.rows[0]);
    }
    catch (error) {
        (0, responseHelper_1.handleError)(res, error, "Error al crear usuario");
    }
});
exports.postRegister = postRegister;
exports.default = { postAuth: exports.postAuth, postRegister: exports.postRegister };
