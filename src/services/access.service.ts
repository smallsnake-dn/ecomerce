import shopModel from "../models/shop.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import KeyTokenService from "./keyToken.service";
import { findByEmail } from "./shop.service";
import { createTokenPair } from "../auth/authUtils";
import { InvalidArgumentException, BadRequest } from "../core/error.respone";
import { Types } from "mongoose";
import { Roles } from "../core/constant";
import { CONTROLLERBODY } from "../core/type.custom";


class AccessService {

    static logout = async (keyStore : {user : Types.ObjectId}) => {
        const delKey = await KeyTokenService.removeKeyById(keyStore.user.toString());

        return {delKey};
    }

    static login = async ({
        email,
        password,
        refreshToken = null,
    }: CONTROLLERBODY) => {

        // find email, if email is not registed throw a errỏ
        const shop = await findByEmail(email);
        console.log({shop})
        if (!shop) throw new BadRequest("Email is not registed!!!");


        // compare password with hash password store in dbs
        const comparePass = bcrypt.compare(password, shop.password);
        if (!comparePass) throw new BadRequest("Authentication fail!!!");


        // generate publickey and private key
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
            privateKeyEncoding: {
                type: "pkcs1",
                format: "pem",
            },
        });



        const tokens = await createTokenPair(
            { userId: shop._id, email },
            publicKey,
            privateKey
        );

        await KeyTokenService.createKeyToken({
            userId : shop._id,
            privateKey,
            publicKey,
            refreshToken : tokens.refreshToken,
        });

        return {
            shop,
            tokens,
        };
    };

    static signUp = async (body: CONTROLLERBODY) => {
        let { name, email, password } = body;
        // step 1: check email exist?
        const holderShop = await shopModel.findOne({ email }).lean();
        if (holderShop) {
            // return {
            //   code: "xxx",
            //   message: "email has been registed",
            //   status: "error",
            // };
            throw new InvalidArgumentException();
        }
        // const newPassword = bcrypt.hash(password,10, (err, encrypt) => {

        // })

        const newPassword = await bcrypt.hash(password, 10);

        const newShop = await shopModel.create({
            name,
            email,
            password: newPassword,
            role: [Roles.SHOP],
        });

        if (newShop) {
            const { privateKey, publicKey } = crypto.generateKeyPairSync(
                "rsa",
                {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                    privateKeyEncoding: {
                        type: "pkcs1",
                        format: "pem",
                    },
                }
            );

            // create accessToken and refreshToken
            const tokens = await createTokenPair(
                { userId: newShop._id, email },
                publicKey,
                privateKey
            );
            // if create key success, then store it to keyStore

            const publicKeyString = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey: publicKey,
                privateKey,
                refreshToken: tokens.refreshToken,
            });

            if (!publicKeyString) {
                return {
                    code: "xxx",
                    message: "public key string error",
                };
            }

            return {
                code: 201,
                metadata: {
                    shop: newShop,
                    tokens,
                },
            };
        }
        return {
            code: "xxx",
            metadata: null,
        };
    };
}

export default AccessService;
