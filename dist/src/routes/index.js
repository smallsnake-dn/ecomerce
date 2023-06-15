"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const access_1 = require("./access");
const checkAuth_1 = require("../auth/checkAuth");
exports.router = (0, express_1.Router)();
// check api key
exports.router.use(checkAuth_1.apiKey);
// check permission
exports.router.use((0, checkAuth_1.checkPermission)("0000"));
exports.router.use("/v1/api", access_1.routerAccess);
