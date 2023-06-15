
interface ErrorParams {
    [key : string] : {
        code : number,
        message : string
    }
}

const ErrorStatus : ErrorParams = {
    NotFound : {
        code : 404,
        message : "Path not found!!!"
    },
    InternalServerError : {
        code : 500,
        message : "Internal server error!!!"
    },
    InvalidArgumentException : {
        code : 422,
        message : "Unprocessable Entity!!!!!!!"
    },
    BadRequest : {
        code : 400,
        message : "Bad Request!!!!!"
    },
    AuthenticationFail : {
        code : 403,
        message : "Authentication Fail!!!!!!!!!"
    }
}

// const ErrorReasonMessage = {
//     NotFound
// }

export class ErrorRespone extends Error {
    status : number;
    
    constructor(message : string, status : number) {
        super(message);
        this.status = status
    }
}



export class NotFound extends ErrorRespone {
    constructor(message : string = ErrorStatus["NotFound"].message, status : number = ErrorStatus["NotFound"].code) {
        super(message, status)
    }
}


export class InternalServerError extends ErrorRespone {
    constructor(message : string = ErrorStatus["InternalServerError"].message, status : number = ErrorStatus["NotFound"].code) {
        super(message, status)
    }
}


export class InvalidArgumentException extends ErrorRespone {
    constructor(message : string = ErrorStatus["InvalidArgumentException"].message, status : number = ErrorStatus["InvalidArgumentException"].code) {
        super(message, status)
    }
}


export class BadRequest extends ErrorRespone {
    constructor(message : string = ErrorStatus["BadRequest"].message, status : number = ErrorStatus["BadRequest"].code) {
        super(message, status)
    }
}


export class AuthenticationFail extends ErrorRespone {
    constructor(message : string = ErrorStatus["AuthenticationFail"].message, status : number = ErrorStatus["AuthenticationFail"].code) {
        super(message, status)
    }
}


