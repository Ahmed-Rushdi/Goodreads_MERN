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

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "3000s" }
    );

    res.cookie("token", token, {
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.userRole,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during login" });
  }
};

// verification of jwt token
const verification = (req, res, next) => {
  const token = req.cookies.token; // Access token from cookies

  console.log("Retrieved Token:", token); // Log the token

  if (!token) {
    return res.status(401).send("No token found, please login!");
  }

  jwt.verify(token, "midomashakel2", (error, user) => {
    if (error) {
      return res.status(400).json({ message: "Invalid token" });
    }

    req.id = user.id;
    req.token = token;
    next();
  });
};

const fetchUserById = async (req, res) => {
  let user;
  try {
    user = await User.findById(req.id, "-password");
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// end point to return user data ... if u want to return the token .. pass it from verification function above this ^^

const getUser = async (req, res, next) => {
  const userId = req.id;

  let user;
  //return zcvAuser id except password
  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(error);
  }
  if (!user) {
    return res.status(404).json({ message: " user was not found !" });
  }

  return res.status(200).json({ user, token: req.token });
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
module.exports = { signup, login, verification, getUser, fetchUserById };
