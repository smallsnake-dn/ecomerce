import express, {Request, Response, NextFunction, urlencoded} from "express";
const morgan = require("morgan");
const compression = require("compression");
import {countConnect} from "./helpers/check.conntect"
import { router } from "./routes";
import {NotFound, ErrorRespone} from "./core/error.respone"
require("dotenv").config();


const app = express()

// middleware
app.use(morgan("dev"));
app.use(compression());
app.use(express.json())
app.use(urlencoded({
    extended : true
}))

// init db
require('./dbs/connect.mongo');

// const {countConnect} = require("./helpers/check.conntect")
countConnect();
 

// init route
app.use(router)

// handling error

class HandleError extends Error {
    status? : number;
    constructor(message : string) {
        super(message);
    }
}

app.use((req : Request, res : Response, next : NextFunction) => {
    next(new NotFound());
})

app.use((err : ErrorRespone, req : Request, res : Response, next : NextFunction) => {
    console.log({
        handleeee : "Helllllllllllllllllllllllll"
    })
    const statusCode = err.status || 500;
    return res.status(statusCode).json({
        status : "Error!!!!",
        code : statusCode,
        message : err.message || "Internal server error!!!"
    })
})


app.get('/', (req : Request, res : Response, next : NextFunction) => {
    res.send("OOKKK")
})



// handle error

export default app;