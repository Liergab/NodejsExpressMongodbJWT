const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please add user Username"],
        unique:[true, "Username Address is already taken"],
        match: /^[a-zA-Z]+$/
    },

    email: {
        type:String,
        required:[true, "Please add user Email"],
        unique:[true, "Email Address is already taken"]
    },

    password:{
        type:String,
        required:true,
        
    }
},{versionKey:false, timestamp:true});

module.exports = mongoose.model('userModel',userSchema,'User')