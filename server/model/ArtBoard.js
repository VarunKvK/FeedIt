const mongoose=require("mongoose")

const artboardSC=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    owner:{type:mongoose.Schema.Types.ObjectID,ref:"Profile"},
    artboard:String,
    title:String,
    desc:String,
    tags:[String],
    art:[String],
})

const ArtBoard=new mongoose.model("ArtBoard",artboardSC)

module.exports=ArtBoard;