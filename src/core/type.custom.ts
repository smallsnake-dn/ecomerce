import { Types } from "mongoose";
import { Request } from "express";





/**
 * custom request : addd keyStore attribute req.keyStore
 */
export interface RequestKeyStore extends Request {
    keyStore : {
        user : Types.ObjectId
    }
}


/**
 * specify attribute of body in req.body
 */
export interface CONTROLLERBODY {
    name: string;
    email: string;
    password: string;
    refreshToken?: string | null;
}


/**
 * type input for function store publickey to database
 */
export interface Params {
    userId: Types.ObjectId;
    publicKey: string;
    privateKey: string;
    refreshToken: string;
}

export interface ProductAttribute {
    name : String | undefined;
    description : String | undefined;
    image : String | undefined;
    price : String | undefined;
}

