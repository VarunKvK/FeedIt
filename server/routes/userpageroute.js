const express=require("express")
const userPageroute=express.Router()
const ArtBoard=require("../model/ArtBoard")

userPageroute.route("/userPage/:id")
.get(async(req,res)=>{
    const {id}=req.params;
    const profile=await ArtBoard.find({owner:id}).populate("owner")
    res.json(profile)
})


module.exports=userPageroute