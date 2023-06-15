"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.HEADER = void 0;
/**
 * HEADER params on request from client
 */
exports.HEADER = {
    API_KEY: "x_api_key",
    AUTHORIZATION: "authorization",
    CLIENT_ID: "x-client-id"
};
/**
 * Roles for shop (shop is a unit)
 */
exports.Roles = {
    SHOP: "SHOP",
    ADMIN: "ADMIN",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
};
