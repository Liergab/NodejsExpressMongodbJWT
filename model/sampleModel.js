const mongoose = require("mongoose");

const Schema = mongoose.Schema 

const sampleSchema = new Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Contact"
    },
    name:{
        type:String,
        required:true,
        unique:true,
        match: /^[a-zA-Z]+$/
 
 
    },

    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    }

},{versionKey:false, timestamps:true})

module.exports = mongoose.model('sampleModel', sampleSchema ,'Contact');