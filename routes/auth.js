const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User, createNewUser, loginUser } = require("../models/User");

/**
 * @desc Create New User
 * @router /api/auth
 * @method Post
 * @access public
 */

router.post("/register", async (req, res) => {
  const { error } = createNewUser(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "this user is already register" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: req.body.isAdmin,
    });

    const result = await user.save();
    const token = jwt.sign({ id: user._id, email: user.email }, "secretkey", {
      expiresIn: "7d",
    });
    const { password, ...other } = result._doc;
    res.status(201).json({ ...other, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});
/**
 * @desc Login User
 * @router /api/auth/login
 * @method Post
 * @access public
 */

router.post("/login", async (req, res) => {
  const { error } = loginUser(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "invalid email" });
    }

    const pass = await bcrypt.compare(req.body.password, user.password);

    if (!pass) {
      return res.status(400).json({ message: "invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "somthing went wrong" });
  }
});

module.exports = router;
