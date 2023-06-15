"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_mongo_1 = __importDefault(require("../configs/config.mongo"));
const { host, name, port } = config_mongo_1.default.db;
// console.log(configMongo)
const connectStringMongo = `mongodb://${host}:${port}/${name}`;
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        if (1 === 1) {
            mongoose_1.default.set("debug", true);
            mongoose_1.default.set("debug", { color: true });
        }
        mongoose_1.default.connect(connectStringMongo, {
            maxPoolSize: 50
        }).then(_ => {
            console.log("Connect mongodb success");
        }).catch(err => {
            console.log({ "Connect mongo fail": connectStringMongo });
        });
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}
const mongoInstance = Database.getInstance();
exports.default = mongoInstance;
