import shopModel from "../models/shop.model";

/**
 *
 * @param email
 * @param select
 * @returns
 */
export const findByEmail = async (
    email: string,
    select: {
        email: number;
        password: number;
        name: number;
        status: number;
        roles: number;
    } = {
        email: 1,
        password: 1,
        name: 1,
        status: 1,
        roles: 1,
    }
) => {
    return await shopModel.findOne({ email }).select(select).lean();
};

export const updateOne = async (
    email: string,
    update: {
        name?: string;
        email?: string;
        password?: string;
        status?: string;
        auth?: string;
        auth_id?: string;
        verify?: boolean;
        roles?: Array<string>;
    }
) => {
    return await shopModel.updateOne({ email }, update).lean();
};
