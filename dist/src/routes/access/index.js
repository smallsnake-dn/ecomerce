"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAccess = void 0;
const express_1 = require("express");
const access_controller_1 = __importDefault(require("../../controllers/access.controller"));
const checkAuth_1 = require("../../auth/checkAuth");
const authUtils_1 = require("../../auth/authUtils");
exports.routerAccess = (0, express_1.Router)();
// router for signUp new 
exports.routerAccess.post("/shop/signup", (0, checkAuth_1.asyncHandler)(access_controller_1.default.signUp));
exports.routerAccess.post("/shop/login", (0, checkAuth_1.asyncHandler)(access_controller_1.default.login));
exports.routerAccess.use(authUtils_1.authentication);
// authentication
exports.routerAccess.post("/shop/logout", (0, checkAuth_1.asyncHandler)(access_controller_1.default.logout));
