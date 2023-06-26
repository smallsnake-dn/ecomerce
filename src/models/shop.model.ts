import { model, Schema, Types } from "mongoose";

const COLLECTION_NAME = "Shops"
const DOCUMENT_NAME = "Shop"


const shopSchema = new Schema({
    name : {
        required : true,
        type : String,
        trim : true,
        maxLength : 150
    },
    email : {
        type : String,
        unique : true,
        trim : true
    },
    password : {
        type : String
    },
    status : {
        type : String,
        enum : ["active", "inactive"],
        default : "inactive"
    },
    auth : {
        type : String,
        enum : ["local", "google", "facebook"],
        default : "local"
    },
    auth_id : {
        type : String
    },
    verify : {
        type : Schema.Types.Boolean,
        default : false
    },
    roles : {
        type : Array,
        default : []
    }

}, {
    timestamps : true,
    collection : COLLECTION_NAME
})


export default model(DOCUMENT_NAME, shopSchema)

