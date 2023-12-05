const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required :[true,"must provide description"],
        trim:true,
        maxlength:[120,"length cannot be more than 120 characters"]
    },
    tag:{
        type:String,
        default : "General"
    },
    time:{
        type:Date,
        default:Date.now().toString()
    }
})

const Notes_Model = new mongoose.model("notes",NotesSchema);
module.exports = Notes_Model;      