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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const keytoken_model_1 = __importDefault(require("../models/keytoken.model"));
const mongoose_1 = require("mongoose");
class KeyTokenService {
}
_a = KeyTokenService;
/**
 * Store publickey to database or update it if exist
 * @param param0
 * @returns
 */
KeyTokenService.createKeyToken = ({ userId, publicKey, privateKey, refreshToken, }) => __awaiter(void 0, void 0, void 0, function* () {
    // let {userId, publicKey, privateKey, refreshToken} = params
    try {
        // const publicKeyString = publicKey.toString();
        // const tokens = await keytokenModel.create({
        //     user : userId,
        //     publicKey : publicKey
        // })
        // console.log(`Public key string ::: ${publicKey.toString()}`)
        // return tokens ? publicKey : null;
        const filter = { user: userId };
        const update = {
            publicKey,
            privateKey,
            refreshTokensUsed: [],
            refreshToken,
        };
        const options = { upsert: true, new: true };
        const tokens = yield keytoken_model_1.default.findOneAndUpdate(filter, update, options);
        return tokens ? tokens.publicKey : null;
    }
    catch (error) {
        return error;
    }
});
KeyTokenService.findByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield keytoken_model_1.default.findOne({ user: new mongoose_1.Types.ObjectId(userId) }).lean();
});
KeyTokenService.removeKeyById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield keytoken_model_1.default.findOneAndRemove({ user: userId });
});
exports.default = KeyTokenService;
