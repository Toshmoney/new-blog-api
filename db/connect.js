require("dotenv").config()
const mongoose = require("mongoose");
const pass = process.env.password
MONGO_URI = `mongodb+srv://Toshbaba:${pass}tosh.e022gw2.mongodb.net/blogapp?retryWrites=true&w=majority`

const connectDB = async()=>{
    return await mongoose.connect(MONGO_URI)
}

module.exports = connectDB;