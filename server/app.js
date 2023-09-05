//Basic Requirements
require('dotenv').config()
const express=require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")

const allowedOrigins = ['https://feedit.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

//APP||Port
const app=express()
const Port=process.env.PORT

//Password Encryptor
const salt=bcrypt.genSaltSync(10)


//App Uses
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
// app.use(cors({origin:true,credentials:true}))
app.use("/uploads/thumb",express.static(__dirname+"/uploads/thumb"))
app.use("/uploads/profile",express.static(__dirname+"/uploads/profile"))
app.use("/uploads/art",express.static(__dirname+"/uploads/art"))

//ROUTER
const index=require("./routes/index")
const register=require("./routes/register")
const login=require("./routes/login")
const profile=require("./routes/profile")
const homeroute=require("./routes/homeroute")
const createprofile=require("./routes/createprofile")
const thumbimageUpload=require("./routes/thumbimageUpload")
const profileimageupload=require("./routes/profileimageupload")
const artimage=require("./routes/artimage")
const profileinfo=require("./routes/profileinfo")
const userpageroute=require("./routes/userpageroute")
const artboardroute=require("./routes/artboardroute")
const artpost=require("./routes/artpost")
const artboardinfo=require("./routes/artboardinfo")
const logout=require("./routes/logout")
const deleteimage=require("./routes/deleteimage")
const deleteArt=require("./routes/deleteArt")

const searchRoute=require("./routes/searchRoute")


//Database Connection
mongoose.connect(process.env.MONGOOSE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


//Routes

app.use(searchRoute)

app.use(index)
app.use(register)
app.use(login)
app.use(profile)
app.use(homeroute)
app.use(userpageroute)
app.use(profileinfo)
app.use(createprofile)
app.use(thumbimageUpload)
app.use(profileimageupload)
app.use(artboardroute)
app.use(artboardinfo)
app.use(artimage)
app.use(artpost)
app.use(logout)
app.use(deleteimage)
app.use(deleteArt)






app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`)
})