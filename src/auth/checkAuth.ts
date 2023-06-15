import { Request, Response, NextFunction } from "express"
import {findById} from "../services/apikey.service"

import { HEADER } from "../core/constant";


export const apiKey = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const {x_api_key} = req.headers;
        if(!x_api_key) {
            return res.json({
                message : "Forbidden error"
            })
        }

        console.log({x_api_key})

        const objKey = await findById(x_api_key as string)
        if(!objKey) {
            return res.json({
                message : "Forbidden error"
            })
        }
        req.body.objKey = objKey;
        next();
    } catch (error) {
        next(error);
    }
}


export const checkPermission = (permission : string) => {
    return (req : Request, res : Response, next : NextFunction) => {
        if(!req.body.objKey) {
            return res.status(403).json({
                message : "permission denied"
            })
        }
        const checkP = req.body.objKey.permission.includes(permission);
        if(!checkP) {
            return res.status(403).json({
                message : "permission denied"
            })
        }
        next()
    }
}


export const asyncHandler = (fn : Function) => {
    return (req : Request, res : Response, next : NextFunction) => {
        fn(req, res, next).catch(next)
    }
}