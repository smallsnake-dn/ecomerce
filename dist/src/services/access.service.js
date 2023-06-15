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
const shop_model_1 = __importDefault(require("../models/shop.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const keyToken_service_1 = __importDefault(require("./keyToken.service"));
const shop_service_1 = require("./shop.service");
const authUtils_1 = require("../auth/authUtils");
const error_respone_1 = require("../core/error.respone");
const constant_1 = require("../core/constant");
class AccessService {
}
_a = AccessService;
AccessService.logout = (keyStore) => __awaiter(void 0, void 0, void 0, function* () {
    const delKey = yield keyToken_service_1.default.removeKeyById(keyStore.user.toString());
    return { delKey };
});
AccessService.login = ({ email, password, refreshToken = null, }) => __awaiter(void 0, void 0, void 0, function* () {
    // find email, if email is not registed throw a errỏ
    const shop = yield (0, shop_service_1.findByEmail)(email);
    if (!shop)
        throw new error_respone_1.BadRequest("Email is not registed!!!");
    // compare password with hash password store in dbs
    const comparePass = bcrypt_1.default.compare(password, shop.password);
    if (!comparePass)
        throw new error_respone_1.BadRequest("Authentication fail!!!");
    // generate publickey and private key
    const { privateKey, publicKey } = crypto_1.default.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
    });
    const tokens = yield (0, authUtils_1.createTokenPair)({ userId: shop._id, email }, publicKey, privateKey);
    yield keyToken_service_1.default.createKeyToken({
        userId: shop._id,
        privateKey,
        publicKey,
        refreshToken: tokens.refreshToken,
    });
    return {
        shop,
        tokens,
    };
});
AccessService.signUp = (body) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password } = body;
    // step 1: check email exist?
    const holderShop = yield shop_model_1.default.findOne({ email }).lean();
    if (holderShop) {
        // return {
        //   code: "xxx",
        //   message: "email has been registed",
        //   status: "error",
        // };
        throw new error_respone_1.InvalidArgumentException();
    }
    // const newPassword = bcrypt.hash(password,10, (err, encrypt) => {
    // })
    const newPassword = yield bcrypt_1.default.hash(password, 10);
    const newShop = yield shop_model_1.default.create({
        name,
        email,
        password: newPassword,
        role: [constant_1.Roles.SHOP],
    });
    if (newShop) {
        const { privateKey, publicKey } = crypto_1.default.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
        });
        // create accessToken and refreshToken
        const tokens = yield (0, authUtils_1.createTokenPair)({ userId: newShop._id, email }, publicKey, privateKey);
        // if create key success, then store it to keyStore
        const publicKeyString = yield keyToken_service_1.default.createKeyToken({
            userId: newShop._id,
            publicKey: publicKey,
            privateKey,
            refreshToken: tokens.refreshToken,
        });
        if (!publicKeyString) {
            return {
                code: "xxx",
                message: "public key string error",
            };
        }
        return {
            code: 201,
            metadata: {
                shop: newShop,
                tokens,
            },
        };
    }
    return {
        code: "xxx",
        metadata: null,
    };
});
exports.default = AccessService;
