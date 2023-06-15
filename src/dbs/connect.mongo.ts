import mongoose from "mongoose";
import configMongo from "../configs/config.mongo";


const {host, name, port} = configMongo.db;

// console.log(configMongo)

const connectStringMongo = `mongodb://${host}:${port}/${name}`;

class Database {
    static instance? : Database;
    constructor() {
        this.connect();
    }

    connect() {
        if(1 === 1) {
            mongoose.set("debug", true);
            mongoose.set("debug", {color : true});
        }
        mongoose.connect(connectStringMongo, {
            maxPoolSize : 50
        }).then( _ => {
            console.log("Connect mongodb success");
        }).catch(err => {
            console.log({"Connect mongo fail" : connectStringMongo});
        })
    }

    static getInstance() {
        if(!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const mongoInstance = Database.getInstance();

export default mongoInstance;