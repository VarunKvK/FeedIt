const express=require("express")
const bcrypt=require("bcrypt")


//Password Encryptor
const salt=bcrypt.genSaltSync(10)
const registerRoute=express.Router();


//MODELS
const USER=require("../model/User")

registerRoute.post("/register",async(req,res)=>{
   const {EMAIL,USERNAME,PASSWORD}=req.body;
   await USER.create({
    username:USERNAME,
    email:EMAIL,
    password:bcrypt.hashSync(PASSWORD,salt)
   })
})

module.exports=registerRoute;