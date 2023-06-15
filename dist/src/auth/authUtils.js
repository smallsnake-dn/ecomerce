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
exports.authentication = exports.createTokenPair = void 0;
const JWT = __importStar(require("jsonwebtoken"));
const asyncHandler_1 = require("../helpers/asyncHandler");
const error_respone_1 = require("../core/error.respone");
const keyToken_service_1 = __importDefault(require("../services/keyToken.service"));
const constant_1 = require("../core/constant");
const createTokenPair = 
/**
 * function return a object {accessToken, refreshToken}
 * @param payload
 * @param publicKey
 * @param privateKey
 * @returns
 */
(payload, publicKey, privateKey) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = JWT.sign(payload, privateKey, {
        expiresIn: "2 days",
        algorithm: "RS256",
    });
    const refreshToken = JWT.sign(payload, privateKey, {
        expiresIn: "7 days",
        algorithm: "RS256",
    });
    // JWT.verify(accessToken, publicKey, (err, decode) => {
    //     if(err) {
    //         console.log("decode is errr")
    //     }
    //     console.log(`decode access token:::${decode}`)
    //     console.log(decode)
    // })
    return { accessToken, refreshToken };
});
exports.createTokenPair = createTokenPair;
exports.authentication = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.headers[constant_1.HEADER.CLIENT_ID];
    if (!userId)
        throw new error_respone_1.AuthenticationFail("Missing userId!!!!");
    const keyStore = yield keyToken_service_1.default.findByUserId(userId);
    if (!keyStore)
        throw new error_respone_1.AuthenticationFail("Key not found!!!!!");
    const accessToken = req.headers[constant_1.HEADER.AUTHORIZATION];
    if (!accessToken)
        throw new error_respone_1.AuthenticationFail("Access token is missing!!!");
    // JWT.verify(accessToken, keyStore.publicKey, (err, decode) => {
    //     if(err) throw err;
    //     if(userId !== keyStore.user.toString()) throw new AuthenticationFail("Invalid usser");
    // })
    // return next();
    // type RequestKeyStore =  RequestKeyStore & Request
    try {
        // const decode = JSON.parse(JWT.verify(accessToken, keyStore.publicKey) as string);
        console.log({ testtttttttt: {
                accessToken,
                publicKey: keyStore.publicKey
            } });
        JWT.verify(accessToken, keyStore.publicKey, (err, decode) => {
            if (err)
                throw err;
            const _decode = decode;
            // const parse = Object.assign({}, decode)
            // console.log({decodeeeeeeeeeeeee : _decode.userId})
            // const parse = JSON.parse(decode as string)
            if (userId !== _decode.userId)
                throw new error_respone_1.AuthenticationFail("Invalid user!!!");
        });
        req.keyStore = keyStore;
        next();
    }
    catch (error) {
        throw error;
    }
}));
