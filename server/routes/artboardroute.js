const express = require("express");
const artboardroute = express.Router();
const jwt = require("jsonwebtoken");

//Model
const ArtBoard = require("../model/ArtBoard");

//SECRET
const jwtSecret = process.env.JWTSECRET;
//Secrets

artboardroute
  .route("/newArtboard")

  .get(async (req, res) => {
    const { Token } = req.cookies;
    jwt.verify(Token, jwtSecret, {}, async (err, data) => {
      try {
        const id = data.id;

          const profiledata = await ArtBoard.find({user:id});
          res.json(profiledata);
      } catch (err) {
        console.log(err);
      }
    });
  })

  .put(async (req, res) => {
    const { id, input } = req.body;

    const artBoardId = await ArtBoard.findById(id);
    artBoardId.set({
      artboard: input.artboard,
      title: input.title,
      desc: input.desc,
      tagdata: input.tagdata,
    });
    await artBoardId.save();
  })

  .post(async (req, res) => {
    const { user, id, input } = req.body;
    const { Token } = req.cookies;
    jwt.verify(Token, jwtSecret, {}, async (err, data) => {
      await ArtBoard.create({
        user: data.id,
        owner: id,
        artboard: input.artboard,
        title: input.title,
        desc: input.desc,
        tags: input.tagdata,
        art: input.art,
      });
    });
  });

module.exports = artboardroute;
