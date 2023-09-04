const express=require("express")
const multer=require("multer")
const fs=require("fs")
const sharp = require('sharp');

const multerMiddle=multer({dest:"uploads/profile"})

const profileuploadRoute=express.Router()

profileuploadRoute.route("/imageprofileUpload")

.post(multerMiddle.array("photos",100),async(req,res)=>{
    const uploads=[]
    for(let i=0;i<req.files.length;i++){
        const {path,originalname}=req.files[i]
        const part=originalname.split(".");
        const ext=part[part.length-1]
        const newPath=path+"."+ext;

        await sharp(path).resize({ width: 800 }).toFile(newPath);
        fs.unlinkSync(path);
        uploads.push(newPath.replace("uploads\\profile\\",""));
    }
    res.json(uploads)
})

module.exports=profileuploadRoute