import { Response } from "express";

const StatusCode = {
    OK: 200,
    CREATED: 201,
};

const ReasonStatusCode = {
    OK: "Success!!!",
    CREATED: "CREATED",
};

interface SuccessParams {
    message?: string;
    statusCode?: number;
    reasonStatusCode?: string;
    metadata?: {};
}

class SuccessRespone {
    message: string;
    statusCode: number;
    reasonStatusCode: string;
    metadata: {};
    constructor({
        message,
        statusCode,
        reasonStatusCode,
        metadata,
    }: SuccessParams) {
        this.message = message || "";
        this.statusCode = statusCode || 500;
        this.reasonStatusCode = reasonStatusCode || "";
        this.metadata = metadata || {};
    }

    send(res: Response, header: {} = {}) {
        // console.log({THISSSSSS : this})
        return res.status(this.statusCode).json(this);
    }
}

export class OK extends SuccessRespone {
    constructor({
        message = ReasonStatusCode.OK,
        statusCode = StatusCode.OK,
        reasonStatusCode = ReasonStatusCode.OK,
        metadata = {},
    }: SuccessParams) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
}

export class CREATED extends SuccessRespone {
    constructor({
        message = ReasonStatusCode.CREATED,
        statusCode = StatusCode.CREATED,
        reasonStatusCode = ReasonStatusCode.CREATED,
        metadata = {},
    }: SuccessParams) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
}

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
