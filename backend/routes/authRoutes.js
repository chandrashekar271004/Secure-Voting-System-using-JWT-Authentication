const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { username, voterID, password } = req.body;

  try {
    let user = await User.findOne({ voterID });
    if (user) return res.status(400).json({ msg: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      username,
      voterID,
      password: hashedPassword,

      //  ADMIN LOGIN 
      role: (voterID === "admin123" && password === "admin123") 
        ? "admin" 
        : "user"
    });

    await user.save();
    res.json({ msg: "Registered successfully" });

  } catch (err) {
    res.status(500).send("Server error");
  }
});


//   Login
router.post("/login", async (req, res) => {
  const { voterID, password } = req.body;

  try {
    const user = await User.findOne({ voterID });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, voterID: user.voterID },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // 🔥 SEND hasVoted ALSO
    res.json({
      token,
      hasVoted: user.hasVoted,
      role: user.role
    });

  } catch {
    res.status(500).send("Server error");
  }
});

module.exports = router;