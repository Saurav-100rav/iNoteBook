const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
            type : String,
            required : true
    },
    timeStamp:{
        type:Date,
        default:Date.now().toString()
    }
})

const model = new mongoose.model("User",UserSchema);
module.exports = model;    

