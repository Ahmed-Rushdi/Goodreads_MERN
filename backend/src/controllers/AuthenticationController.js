const User = require("../models/User.model");
// npm install bcryptjs
const bcrypt = require("bcryptjs");
// npm install jsonwebtoken
const jwt = require("jsonwebtoken");
const Cookie = require("cookie-parser");

// logic for signing up
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    userExists = await User.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }
  if (userExists) {
    return res.status(400).json({ message: "user exists " });
  }
  // hash password before saving
  const hashedPass = bcrypt.hashSync(password);
  const user = new User({
    name: name,
    email: email,
    password: hashedPass,
  });
  try {
    await user.save();
  } catch (error) {
    console.log(error);
  }

  return res.status(201).json({ message: user });
};

// logic for login

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return new Error(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "user was not found" });
  }

  const comparePassword = bcrypt.compareSync(password, existingUser.password);
  if (!comparePassword) {
    return res.status(400).json({ message: " invalid email or password" });
  }
  const token = jwt.sign({ id: existingUser.id }, "midomashakel2", {
    expiresIn: "2hr",
  });

  // save jwt in cookies

  res.cookie("token", token, {
    path: "/",
    expires: new Date(Date.now() + 2 * 3600 * 1000),
    httpOnly: true,
    sameSite: "lax",
  });
  return res
    .status(200)
    .json({ message: "logged in successfully ", user: existingUser, token });
};

module.exports = { signup, login };
