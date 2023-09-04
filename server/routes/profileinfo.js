const express = require("express");
const profileInfoRoute = express.Router();
const jwt = require("jsonwebtoken");

//SECRET
const jwtSecret = process.env.JWTSECRET;
//Secrets

//Model
const Profile = require("../model/Profile");


profileInfoRoute.route("/creatoprofile/:id")
.get(async(req,res)=>{
    const {id}=req.params;
    const data=await Profile.findById(id);
    res.json(data)
})

module.exports = profileInfoRoute;
