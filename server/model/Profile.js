const mongoose =require("mongoose")

const profileSC=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    firstname:String,
    lastname:String,
    username:String,
    desc:String,
    thumbphotos:[String],
    profilephotos:[String],
})
const Profile=new mongoose.model("Profile",profileSC)

module.exports=Profile