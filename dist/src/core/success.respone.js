"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CREATED = exports.OK = void 0;
const StatusCode = {
    OK: 200,
    CREATED: 201,
};
const ReasonStatusCode = {
    OK: "Success!!!",
    CREATED: "CREATED",
};
class SuccessRespone {
    constructor({ message, statusCode, reasonStatusCode, metadata, }) {
        this.message = message || "";
        this.statusCode = statusCode || 500;
        this.reasonStatusCode = reasonStatusCode || "";
        this.metadata = metadata || {};
    }
    send(res, header = {}) {
        // console.log({THISSSSSS : this})
        return res.status(this.statusCode).json(this);
    }
}
class OK extends SuccessRespone {
    constructor({ message = ReasonStatusCode.OK, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {}, }) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
}
exports.OK = OK;
class CREATED extends SuccessRespone {
    constructor({ message = ReasonStatusCode.CREATED, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata = {}, }) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
}
exports.CREATED = CREATED;
// export class SUCCESS extends SuccessRespone {
//   constructor({
//     message = ReasonStatusCode.CREATED,
//     statusCode = StatusCode.CREATED,
//     reasonStatusCode = ReasonStatusCode.CREATED,
//     metadata = {},
//   }: SuccessParams) {
//     super({message, statusCode, reasonStatusCode, metadata});
//   }
// }
