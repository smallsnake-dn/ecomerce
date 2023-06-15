import * as JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "../helpers/asyncHandler";
import { AuthenticationFail } from "../core/error.respone"

import keyToken from "../services/keyToken.service"
import mongoose, { Types } from "mongoose";
import { RequestKeyStore } from "../core/type.custom";
import { HEADER } from "../core/constant";



export const createTokenPair =
    /**
     * function return a object {accessToken, refreshToken}
     * @param payload
     * @param publicKey
     * @param privateKey
     * @returns
     */
    async (
        payload: object,
        publicKey: string,
        privateKey: string
    ): Promise<{ accessToken: string; refreshToken: string }> => {
        const accessToken = JWT.sign(payload, privateKey, {
            expiresIn: "2 days",
            algorithm: "RS256",
        });
        const refreshToken = JWT.sign(payload, privateKey, {
            expiresIn: "7 days",
            algorithm: "RS256",
        });

        // JWT.verify(accessToken, publicKey, (err, decode) => {
        //     if(err) {
        //         console.log("decode is errr")
        //     }

        //     console.log(`decode access token:::${decode}`)
        //     console.log(decode)
        // })
        return { accessToken, refreshToken };
    };
    
    export const authentication = asyncHandler(
        async (req: RequestKeyStore, res: Response, next: NextFunction) => {
            
            const userId = req.headers[HEADER.CLIENT_ID] as string;
            if(!userId) throw new AuthenticationFail("Missing userId!!!!");
            
            const keyStore = await keyToken.findByUserId(userId);
            if(!keyStore) throw new AuthenticationFail("Key not found!!!!!")
            
            const accessToken = req.headers[HEADER.AUTHORIZATION] as string;
            if(!accessToken) throw new AuthenticationFail("Access token is missing!!!");
            
            // JWT.verify(accessToken, keyStore.publicKey, (err, decode) => {
                //     if(err) throw err;
                
                //     if(userId !== keyStore.user.toString()) throw new AuthenticationFail("Invalid usser");
                // })
                
                // return next();
                
                // type RequestKeyStore =  RequestKeyStore & Request
                try {
                    // const decode = JSON.parse(JWT.verify(accessToken, keyStore.publicKey) as string);
                    console.log({testtttttttt: {
                        accessToken,
                        publicKey : keyStore.publicKey
                    }})
                    JWT.verify(accessToken, keyStore.publicKey, (err, decode) => {
                        if(err) throw err
                        const _decode = decode as JWT.JwtPayload
                        // const parse = Object.assign({}, decode)
                        // console.log({decodeeeeeeeeeeeee : _decode.userId})
                        // const parse = JSON.parse(decode as string)
                        if(userId !== _decode.userId) throw new AuthenticationFail("Invalid user!!!");
            })

            req.keyStore = keyStore;
            next();
        } catch (error) {
            throw error
        }
    }
);
