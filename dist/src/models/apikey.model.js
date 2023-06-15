"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DOCUMENT_NAME = "ApiKey";
const COLLECTION_NAME = "ApiKeys";
const apiKeySchema = new mongoose_1.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        default: true
    },
    permission: {
        type: [String],
        required: true,
        enum: ["0000", "1111", "2222"]
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
});
exports.default = (0, mongoose_1.model)(DOCUMENT_NAME, apiKeySchema);
