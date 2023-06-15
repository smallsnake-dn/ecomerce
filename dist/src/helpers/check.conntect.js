"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const countConnect = () => {
    const numberOfConnect = mongoose_1.default.connections.length;
    console.log(`Number of connection in mongodb ${numberOfConnect}`);
};
exports.countConnect = countConnect;
