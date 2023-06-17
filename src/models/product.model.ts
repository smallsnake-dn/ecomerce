import { model, Schema, Types } from "mongoose";

const COLLECTION_NAME = "Products"
const DOCUMENT_NAME = "Product"


const productSchema = new Schema({
    name : {
        required : true,
        type : String
    },
    description : {
        type : String,
    },
    image : {
        type : String
    },
    price : {
        type : String
    }

}, {
    timestamps : true,
    collection : COLLECTION_NAME
})


export default model(DOCUMENT_NAME, productSchema)

