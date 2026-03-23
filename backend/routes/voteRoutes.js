const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.post("/vote", auth, async (req, res) => {
  const { party } = req.body;

  try {
    const user = await User.findById(req.user.id);

    // 🔥 BLOCK ADMIN
    if (user.role === "admin") {
      return res.status(403).json({ msg: "Admin cannot vote" });
    }

    // 🔥 CHECK IF ALREADY VOTED
    if (user.hasVoted) {
      return res.status(400).json({ msg: "Already voted" });
    }

    const vote = new Vote({
      voterID: user.voterID,
      party
    });

    await vote.save();

    user.hasVoted = true;
    await user.save();

    res.json({ msg: "Vote casted successfully" });

  } catch {
    res.status(500).send("Server error");
  }
});

module.exports = router;