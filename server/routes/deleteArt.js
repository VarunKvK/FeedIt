const express = require("express");
const artboarddeleteroute = express.Router();

// Model
const ArtBoard = require("../model/ArtBoard");

artboarddeleteroute.route("/newArtboard/:id").delete(async (req, res) => {
  try {
    const id = req.params.id;
    await ArtBoard.findByIdAndDelete(id);
    res.status(204).send(); // No content - success
  } catch (error) {
    console.error('Error deleting artboard:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = artboarddeleteroute;
