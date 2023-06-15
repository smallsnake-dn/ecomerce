"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationFail = exports.BadRequest = exports.InvalidArgumentException = exports.InternalServerError = exports.NotFound = exports.ErrorRespone = void 0;
const ErrorStatus = {
    NotFound: {
        code: 404,
        message: "Path not found!!!"
    },
    InternalServerError: {
        code: 500,
        message: "Internal server error!!!"
    },
    InvalidArgumentException: {
        code: 422,
        message: "Unprocessable Entity!!!!!!!"
    },
    BadRequest: {
        code: 400,
        message: "Bad Request!!!!!"
    },
    AuthenticationFail: {
        code: 403,
        message: "Authentication Fail!!!!!!!!!"
    }
};
// const ErrorReasonMessage = {
//     NotFound
// }
class ErrorRespone extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.ErrorRespone = ErrorRespone;
class NotFound extends ErrorRespone {
    constructor(message = ErrorStatus["NotFound"].message, status = ErrorStatus["NotFound"].code) {
        super(message, status);
    }
}
exports.NotFound = NotFound;
class InternalServerError extends ErrorRespone {
    constructor(message = ErrorStatus["InternalServerError"].message, status = ErrorStatus["NotFound"].code) {
        super(message, status);
    }
}
exports.InternalServerError = InternalServerError;
class InvalidArgumentException extends ErrorRespone {
    constructor(message = ErrorStatus["InvalidArgumentException"].message, status = ErrorStatus["InvalidArgumentException"].code) {
        super(message, status);
    }
}
exports.InvalidArgumentException = InvalidArgumentException;
class BadRequest extends ErrorRespone {
    constructor(message = ErrorStatus["BadRequest"].message, status = ErrorStatus["BadRequest"].code) {
        super(message, status);
    }
}
exports.BadRequest = BadRequest;
class AuthenticationFail extends ErrorRespone {
    constructor(message = ErrorStatus["AuthenticationFail"].message, status = ErrorStatus["AuthenticationFail"].code) {
        super(message, status);
    }
}
exports.AuthenticationFail = AuthenticationFail;
