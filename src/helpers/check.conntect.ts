import mongoose from "mongoose";

export const countConnect = () => {
    const numberOfConnect = mongoose.connections.length;
    console.log(`Number of connection in mongodb ${numberOfConnect}`);
}
