const express = require("express");
const searchroute = express.Router();

const ArtBoard=require("../model/ArtBoard")

searchroute.route("/search")
  .get(async(req, res) => {
    const { query } = req.query;
    const regexQuery = new RegExp(query, "i"); // "i" for case-insensitive search

    const searchResults = await ArtBoard.find({
      $or: [
        { "owner.username": regexQuery },
        { title: regexQuery },
        { desc: regexQuery },
        { tags: regexQuery },
        { artboard: regexQuery },
      ],
    }).populate("owner");

    res.json(searchResults)
  });

module.exports = searchroute;
