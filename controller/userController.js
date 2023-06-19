const {ObjectId} = require("mongodb");
const asyncHandler = require("express-async-handler");
const user = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register  User
//@route Get /api/v4/register
//@access public
const register = asyncHandler(async(req,res) => {
    const {username, email, password} = req.body

    if(!username || !email || !password){
        res.status(400);
        throw new Error(" All fields is required to fill")
    };

    const checkOfUniqueness = await user.findOne({email})
    if(checkOfUniqueness){
        res.status(400)
        throw new Error("Email is already Used")
    };

    // Encrypting the password
    const hashPassword = await bcrypt.hash(password,10);
    console.log(`Hash password: ${hashPassword}`);

    // Creating UserData
    const userData = await user.create({
        username:username,
        email:email,
        password:hashPassword
    });

    if(userData){
        res.status(201).json({message:"successfully Created", _id:userData.id, email:userData.email})
        console.log(`User Created: ${userData.id}`)
    }else{
        res.status(400);
        throw new Error("Failed to Create User Data")
    };

});

//@desc login user
//@route Get /api/v4/login
//@access public
const login = asyncHandler(async(req,res) => {
    const{email, password} = req.body

    if(!email || !password){
        res.status(400);
        throw new Error("All fields are Mandatory")
    };
    
    const userData = await user.findOne({email});
    if(email &&(await bcrypt.compare(password,userData.password))){
        const accessToken = jwt.sign({
            userData:{
                username:userData.username,
                email:userData.email,
                id:userData.id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"10m"});
        res.status(200).json({accessToken})
        // console.log(accessToken)
    }else{
        res.status(401);
        throw new Error("email ro password is not valid")
    };

});


//@desc current
//@route Get /api/v4/current
//@access private
const current = asyncHandler(async(req,res) => {
    const userData = await user.find();
    if(!userData){
        res.status(400);
        throw new Error("Data not Found")
    }

    res.status(200).json({message:"successfully retrieve", data:userData})
});

module.exports = {
    register,
    login,
    current,
}