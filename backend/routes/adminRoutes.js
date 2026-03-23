const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.get("/results", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const results = await Vote.aggregate([
      {
        $group: {
          _id: "$party",
          votes: { $sum: 1 }
        }
      }
    ]);

    const totalVotes = results.reduce((sum, r) => sum + r.votes, 0);

    //  ADD PERCENTAGE
    const resultsWithPercent = results.map(r => ({
      ...r,
      percent: totalVotes ? ((r.votes / totalVotes) * 100).toFixed(2) : 0
    }));

    //  FIND WINNER
    let winner = null;
let isTie = false;
let tiedParties = [];

if (results.length > 0) {
  const maxVotes = Math.max(...results.map(r => r.votes));

  const topParties = results.filter(r => r.votes === maxVotes);

  if (topParties.length > 1) {
    isTie = true;
    tiedParties = topParties.map(p => p._id);
    winner = null;
  } else {
    winner = topParties[0];
    isTie = false;
  }
}

res.json({
  results: resultsWithPercent,
  winner,
  isTie,
  tiedParties 
});

  } catch {
    res.status(500).send("Server error");
  }
});

module.exports = router;