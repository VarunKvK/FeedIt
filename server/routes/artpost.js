const express=require("express")
const artpostroute=express.Router()

const ArtBoard=require("../model/ArtBoard")

artpostroute.route("/artpost/:id")

.get(async(req,res)=>{
    const {id}=req.params;
    const artPost=await ArtBoard.findById(id).populate("owner")
    res.json(artPost)
})

module.exports=artpostroute