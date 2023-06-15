import keytokenModel from "../models/keytoken.model";
import mongoose, { Types, model } from "mongoose";
import crypto from "crypto";
import { Params } from "../core/type.custom";

class KeyTokenService {
    /**
     * Store publickey to database or update it if exist
     * @param param0
     * @returns
     */
    static createKeyToken = async ({
        userId,
        publicKey,
        privateKey,
        refreshToken,
    }: Params) => {
        // let {userId, publicKey, privateKey, refreshToken} = params
        try {
            // const publicKeyString = publicKey.toString();
            // const tokens = await keytokenModel.create({
            //     user : userId,
            //     publicKey : publicKey
            // })

            // console.log(`Public key string ::: ${publicKey.toString()}`)

            // return tokens ? publicKey : null;

            const filter: mongoose.FilterQuery<{}> = { user: userId };
            const update: mongoose.UpdateQuery<{}> = {
                publicKey,
                privateKey,
                refreshTokensUsed: [],
                refreshToken,
            };
            const options: mongoose.QueryOptions = { upsert: true, new: true };
            const tokens = await keytokenModel.findOneAndUpdate(
                filter,
                update,
                options
            );

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    };

    static findByUserId = async (userId : string) => {
        return await keytokenModel.findOne( { user : new Types.ObjectId(userId)}).lean();
    }

    static removeKeyById = async (userId : string) => {
        return await keytokenModel.findOneAndRemove({user : userId});
    }

    // static removeKeyById = async (userId : string) => {
    //     return await keytokenModel.remove(userId);
    // }
}

export default KeyTokenService;
