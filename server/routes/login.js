const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

//Password Encryptor
const loginRoute=express.Router();

//SECRET
const jwtSecret=process.env.JWTSECRET
//Secrets

//Model
const User=require("../model/User")

loginRoute.post("/login",async(req,res)=>{
   const {EMAIL,PASSWORD}=req.body;
   const userExists=await User.findOne({email:EMAIL})

   if(userExists){
      //Compare Passwords
      const passwordMatch=bcrypt.compareSync(PASSWORD,userExists.password)
      if(passwordMatch){
         jwt.sign({id:userExists._id,username:userExists.username,email:userExists.email},jwtSecret,{},async(err,token)=>{
            if(err) throw (err);
            res.cookie("Token",token).json(userExists)
         })
      }
      else{
         console.log("Pasword Incorrect")
      }
   }else{
      console.log("User Doesn't Exists")
   }
})

module.exports=loginRoute;