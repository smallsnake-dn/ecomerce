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
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.checkPermission = exports.apiKey = void 0;
const apikey_service_1 = require("../services/apikey.service");
const apiKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { x_api_key } = req.headers;
        if (!x_api_key) {
            return res.json({
                message: "Forbidden error"
            });
        }
        console.log({ x_api_key });
        const objKey = yield (0, apikey_service_1.findById)(x_api_key);
        if (!objKey) {
            return res.json({
                message: "Forbidden error"
            });
        }
        req.body.objKey = objKey;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.apiKey = apiKey;
const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.body.objKey) {
            return res.status(403).json({
                message: "permission denied"
            });
        }
        const checkP = req.body.objKey.permission.includes(permission);
        if (!checkP) {
            return res.status(403).json({
                message: "permission denied"
            });
        }
        next();
    };
};
exports.checkPermission = checkPermission;
const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
