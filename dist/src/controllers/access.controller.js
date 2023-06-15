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
Object.defineProperty(exports, "__esModule", { value: true });
const access_service_1 = __importDefault(require("../services/access.service"));
const success_respone_1 = require("../core/success.respone");
class AccessController {
    constructor() {
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new success_respone_1.OK({
                message: "Logout success!!!!!!",
                metadata: yield access_service_1.default.logout(req.keyStore),
            }).send(res);
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            new success_respone_1.OK({
                message: "LOGIN success!!!!!",
                metadata: yield access_service_1.default.login(body),
            }).send(res);
        });
        this.signUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            new success_respone_1.CREATED({
                message: "Registed OK Class",
                metadata: yield access_service_1.default.signUp(body),
            }).send(res);
            // return res.status(200).json(await AccessService.signUp(body));
        });
    }
}
exports.default = new AccessController();
