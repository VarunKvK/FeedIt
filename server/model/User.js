const mongoose=require("mongoose")

const userSC=new mongoose.Schema({
    username:{type:String,unique:true,required:true},
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true,unique:true},
})

const User=new mongoose.model("User",userSC)

module.exports=User