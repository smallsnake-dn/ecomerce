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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const morgan = require("morgan");
const compression = require("compression");
const check_conntect_1 = require("./helpers/check.conntect");
const routes_1 = require("./routes");
const error_respone_1 = require("./core/error.respone");
require("dotenv").config();
const app = (0, express_1.default)();
// middleware
app.use(morgan("dev"));
app.use(compression());
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({
    extended: true
}));
// init db
require('./dbs/connect.mongo');
// const {countConnect} = require("./helpers/check.conntect")
(0, check_conntect_1.countConnect)();
// init route
app.use(routes_1.router);
// handling error
class HandleError extends Error {
    constructor(message) {
        super(message);
    }
}
app.use((req, res, next) => {
    next(new error_respone_1.NotFound());
});
app.use((err, req, res, next) => {
    console.log({
        handleeee: "Helllllllllllllllllllllllll"
    });
    const statusCode = err.status || 500;
    return res.status(statusCode).json({
        status: "Error!!!!",
        code: statusCode,
        message: err.message || "Internal server error!!!"
    });
});
app.get('/', (req, res, next) => {
    res.send("OOKKK");
});
// handle error
exports.default = app;
