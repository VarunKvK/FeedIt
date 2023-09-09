const express=require("express")
const jwt=require("jsonwebtoken")

const profileRoute=express.Router();

//SECRET
const jwtSecret=process.env.JWTSECRET
//Secrets

profileRoute.get("/profile",async(req,res)=>{
    const {Token}=req.cookies;
    if(Token){
        try{
        jwt.verify(Token,jwtSecret,{},async(err,data)=>{
            if(err)throw(err);
            res.json(data)
        })}catch(err){console.log(err)}
    }else{
        console.log("null")
    }
})

module.exports=profileRoute;
