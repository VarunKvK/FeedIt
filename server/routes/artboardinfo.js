const express = require("express");
const artboardInfoRoute = express.Router();


//Model
const Artboard = require("../model/ArtBoard");


artboardInfoRoute.route("/editartboard/:id")
.get(async(req,res)=>{
    const {id}=req.params;
    const data=await Artboard.findById(id);
    res.json(data)
})

module.exports = artboardInfoRoute;
