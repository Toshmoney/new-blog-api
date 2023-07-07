const mongoose = require("mongoose");
const {Schema, model} = mongoose
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        min: 4,
        required: true,
    },

    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        enum: ["Admin", "Moderator", "User"],
        default:false
    },
},
{timestamps: true}
);

const UserModel = model("User", UserSchema);
module.exports = UserModel;