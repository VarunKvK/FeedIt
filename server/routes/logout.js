const express = require("express");

const logoutRoute=express.Router();

logoutRoute.route("/logout")
.post((req,res)=>{
    res.cookie("Token","").json(true)
})


module.exports=logoutRoute