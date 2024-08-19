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
  // you can use process.env.JWT_SECRET instead of  "midomashakel2"
  const token = jwt.sign({ id: existingUser._id }, "midomashakel2", {
    expiresIn: "30s",
  });
  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 30 * 1000),
    httpOnly: true,
    sameSite: "lax",
  });
  return res
    .status(200)
    .json({ message: "login successfully", user: existingUser, token });

  //   // Save jwt in cookies
  //   res.cookie("token", token, {
  //     path: "/",
  //     expires: new Date(Date.now() + 1000 * 60 * 120), // 2 hours
  //     httpOnly: true,
  //     sameSite: "lax",
  //   });

  //   return res.status(200).json({
  //     message: "logged in successfully",
  //     user: {
  //       id: existingUser.id,
  //       name: existingUser.name,
  //       email: existingUser.email,
  //     },
  //     token,
  //   });
};

// verification of jwt token
const verification = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  // this logs the token
  console.log(token);

  if (!token) {
    res.status(404).json({ message: " token not found" });
  }
  jwt.verify(String(token), "midomashakel2", (error, user) => {
    if (error) {
      return res.status(400).json({ message: "invalid token" });
    }
    console.log(user.id);
    req.id = user.id;
  });
  next();
};

// end point to return user data ... if u want to return the token .. pass it from verification function above this ^^

const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;
  //return user id except password
  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }
  if (!user) {
    return res.status(404).json({ message: " user was not found !" });
  }
  return res.status(200).json({ user });
};

// refresh token endpoint
// const refreshToken = (req, res, next) => {
//   const cookies = req.headers.cookie;
//   const prevToken = cookies.split("=")[1];
//   if (!prevToken) {
//     return res.status(400).json({ message: "Couldn't find token" });
//   }
//   jwt.verify(String(prevToken), "midomashakel2", (err, user) => {
//     if (err) {
//       console.log(err);
//       return res.status(403).json({ message: "Authentication failed" });
//     }
//     res.clearCookie(`${user.id}`);
//     req.cookies[`${user.id}`] = "";

//     const token = jwt.sign({ id: user.id }, "midomashakel2", {
//       expiresIn: "35s",
//     });
//     console.log("Regenerated Token\n", token);

//     res.cookie(String(user.id), token, {
//       path: "/",
//       expires: new Date(Date.now() + 1000 * 30),
//       httpOnly: true,
//       sameSite: "lax",
//     });

//     req.id = user.id;
//     next();
//   });
// };
module.exports = { signup, login, verification, getUser };