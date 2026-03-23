const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  voterID: String,
  party: String
});

module.exports = mongoose.model("Vote", voteSchema);