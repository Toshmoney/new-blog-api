const express = require("express");
const cors = require("cors");
const router = require("./routes/handler");
const userd = require("./routes/userdashboard");
const connectDB = require("./db/connect");
const app = express();
const port = process.env.port || 1000;
const cookieParser = require("cookie-parser")


// ======== Middlewares ========
app.use(cors({credentials:true, origin: "http://localhost:3000"}));
app.use(cookieParser())
app.use("/uploads", express.static(__dirname + '/uploads'))
app.use(express.json())
app.use("/", router)


const start = async()=>{
    try {
        await connectDB();
        console.log("Success!!!");
        app.listen(port, ()=>{
            console.log(`Server started successfully on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()