const express=require("express")
const homeroute=express.Router()

const ArtBoard=require("../model/ArtBoard")

homeroute.route("/home")

.get(async(req,res)=>{
    res.json(await ArtBoard.find().populate("owner"))
})

module.exports=homeroute