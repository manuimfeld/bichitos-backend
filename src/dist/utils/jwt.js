"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateJWT = exports.signJwt = void 0;
const dotenv = __importStar(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv.config();
const secret = process.env.JWT_SECRET;
const signJwt = (data) => {
    return jsonwebtoken_1.default.sign(data, secret, { expiresIn: "14d" });
};
exports.signJwt = signJwt;
const authenticateJWT = (req, res, next) => {
    try {
        const token = req.headers["authorization"];
        if (token == null)
            return res.sendStatus(401);
        jsonwebtoken_1.default.verify(token, secret, (err, user) => {
            if (err)
                return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
    catch (error) {
        console.error("Error in JWT authentication:", error);
        res.sendStatus(500);
    }
};
exports.authenticateJWT = authenticateJWT;
const authorizeRole = (authorizedRole) => {
    return (req, res, next) => {
        const user = req.user;
        if ((user === null || user === void 0 ? void 0 : user.role) !== authorizedRole) {
            return res.sendStatus(403); // Forbidden
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
module.exports = {
    signJwt: exports.signJwt,
    authenticateJWT: exports.authenticateJWT,
    authorizeRole: exports.authorizeRole,
};
