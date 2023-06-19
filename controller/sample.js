const {ObjectId} = require("mongodb");
const asyncHandler = require("express-async-handler");
const sample = require('../model/sampleModel')

const createSample =  asyncHandler( async(req,res) => {
    const {name, email, phone} = req.body
    
    if(!name || !email || !phone){
          res.status(400);
         throw new Error("ALL FIELDS REQUIRED")
     } 
     
     const data = await sample.create({
        name:name,
        email:email, 
        phone:phone,
        user_id: req.userData.id
    });
     res.status(201).json({message:"successful", Data:data})
    

});

const getSampleById =  asyncHandler( async(req,res) => {
    const _id = new ObjectId(req.params.id);

    if(!_id){
        res.status(500);
        throw new Error(`No Data Found`)
    }

    const data = await sample.findById(_id)
    res.status(200).json({message:"Successfully fetch", Data:data})

});

const getSample =  asyncHandler(async(req,res) => {
     const data = await sample.find({user_id:req.userData.id});
     if(!data){
        res.status(500);
        throw new Error("No Data found")
     }
     res.status(200).json({message:"Successful", Data:data})
})

const updateSample = asyncHandler(async(req,res) => {
    const {name,email, phone} = req.body

    const _id = new ObjectId(req.params.id)

    if(!_id){
        res.status(500);
        throw new Error(`${_id} not Found`)
    }

    const contact = await sample.findById(req.params.id);

    if(contact.user_id.toString !== req.userData.id){
        res.status(403);
        throw new Error("User dont have permission to update other  user Contact!")
    }

    const data = await sample.findByIdAndUpdate({_id},{$set:{name:name, email:email, phone:phone }});
    res.status(200).json({message:"Successfully Updated", Data:data})
})

const deleteSample =  asyncHandler(async(req,res) => {
   const _id = new ObjectId(req.params.id)
   if(!_id){
    res.status(500);
    throw new Error(`No Data with found`);
   }
   const contact = await sample.findById(req.params.id);

   if(contact.user_id.toString !== req.userData.id){
       res.status(403);
       throw new Error("User dont have permission to delete other  user Contact!")
   }

   const data = await sample.findByIdAndDelete(_id)
   res.status(200).json({message:"Delete", Data:data})
})

module.exports = {
    createSample,
    getSample,
    updateSample,
    deleteSample,
    getSampleById
}