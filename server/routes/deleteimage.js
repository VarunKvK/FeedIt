const express = require("express");
const fs = require("fs");
const path = require("path");

const deletePost = express.Router();

deletePost.delete("/deleteImage/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join("D:/VarunCodes/WebApp/Feedit/server/uploads/art/", filename);
console.log(__dirname)
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting image:", err);
      res.status(500).send("Error deleting image");
    } else {
      res.status(200).send("Image deleted successfully");
    }
  });
});
module.exports=deletePost