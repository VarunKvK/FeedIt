const express = require("express");

const createprofileRoute = express.Router();
const jwt = require("jsonwebtoken");

//Model
const Profile = require("../model/Profile");

//SECRET
const jwtSecret = process.env.JWTSECRET;
//Secrets

createprofileRoute
  .route("/createprofile")
  .get(async (req, res) => {
    const { Token } = req.cookies;
    jwt.verify(Token, jwtSecret, {}, async (err, data) => {
      if (data) {
        if (err) {
          console.log("JWT Verification Error:", err);
          return res.status(401).json({ message: "Unauthorized" });
        }

        try {
          const id = data.id;
          const Data = await Profile.find({ owner: id });
          res.json(Data);
        } catch (err) {
          console.log(err);
        }
      }
    });
  })
  .put(async (req, res) => {
    const { id, input } = req.body;
    const profileInfo = await Profile.findById(id);
    profileInfo.set({
      firstname: input.FirstName,
      lastname: input.LastName,
      username: input.UserName,
      desc: input.Desc,
      thumbphotos: input.thumbphotos,
      profilephotos: input.profilephotos,
    });
    await profileInfo.save();
  })

  .post(async (req, res) => {
    const { Token } = req.cookies;
    const { FirstName, LastName, UserName, Desc, ThumbPhotos, ProfilePhotos } =
      req.body;
    jwt.verify(Token, jwtSecret, {}, async (err, data) => {
      if (err) throw err;
      await Profile.create({
        owner: data.id,
        firstname: FirstName,
        lastname: LastName,
        username: UserName,
        desc: Desc,
        thumbphotos: ThumbPhotos,
        profilephotos: ProfilePhotos,
      });
    });
  });

module.exports = createprofileRoute;
