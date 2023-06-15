import apikeyModel from "../models/apikey.model"



export const findById = async ( key : string ) => {
    // const newApiKey = await apikeyModel.create({key : "abc", permission : ['0000']})
    // console.log({newApiKey})
    const objKey = await apikeyModel.findOne({key, status : true}).lean();
    return objKey;
}