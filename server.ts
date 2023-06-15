import app from "./src/app";


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`App is listening on port::${PORT}`)
})

process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server express is exit");
    })
})