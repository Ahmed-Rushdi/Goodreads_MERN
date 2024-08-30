const User = require("../models/User.model");
// npm install bcryptjs
const bcrypt = require("bcryptjs");
// npm install jsonwebtoken
const jwt = require("jsonwebtoken");
const Cookie = require("cookie-parser");
const { OAuth2Client } = require('google-auth-library');

// logic for signing up
const signup = async (req, res, next) => {
  const { name, email, password, secretQuestion, secretAnswer } = req.body;
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
  const hashedSecretAnswer = bcrypt.hashSync(secretAnswer);

  const user = new User({
    name: name,
    email: email,
    password: hashedPass,
    secretQuestion,
    secretAnswer: hashedSecretAnswer,
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
      { expiresIn: "25s" }
    );
    // // create a refresh token
    const refreshToken = jwt.sign(
      { id: existingUser._id },
      process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
      { expiresIn: "2h" }
    );

    // //saving the token in database
    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.cookie("token", token, {
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true,
      sameSite: "lax",
    });

    res.cookie("tokenExists", true, {
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: false,
      sameSite: "lax",
    });

    // set the refresh token as httpOnly as well
    res.cookie("refreshToken", refreshToken, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day lifetiime
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

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ message: " refresh token not found" });
  }

  jwt.verify(refreshToken, "midomashakel1", async (error, user) => {
    if (error) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return res.status(400).json({ message: " user not found" });
    }

    if (existingUser.refreshToken != refreshToken) {
      return res.status(400).json({ message: "invalid refreshToken" });
    }

    const newAccessToken = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "30s" }
    );

    res.cookie("token", newAccessToken, {
      path: "/",
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
    });

    res.cookie("tokenExists", true, {
      path: "/",
      maxAge: 60 * 60 * 1000,
      httpOnly: false,
      sameSite: "lax",
    });

    return res.status(200).json({ message: "refreshed token" });
  });
};

// logout endpoint

const logout = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      user.refreshToken = "";
      await user.save();
    }

    res.clearCookie("token");
    // res.clearCookie("refreshToken");
    console.log("logged out successfuly from the backend !");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred during logout" });
  }
};

// verify the secret answer to get directed to the password reset !!!!!
// 1- verify the secret answer

const verifySecretAnswer = async (req, res) => {
  const { email, secretAnswer } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isAnswerCorrect = bcrypt.compareSync(secretAnswer, user.secretAnswer);
    if (!isAnswerCorrect) {
      return res.status(400).json({ message: "Incorrect answer" });
    }

    // If  answer is correct, proceed to reset password
    res
      .status(200)
      .json({ message: "Answer correct, proceed to reset password" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during verification" });
  }
};

// 2- reset the password

const resetPassword = async (req, res, next) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedPass = bcrypt.hashSync(newPassword);
    user.password = hashedPass;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred during password reset" });
  }
};

// google login logic !


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub: googleId } = ticket.getPayload();

    // Check if the user already exists
    let user = await User.findOne({ googleId });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({
        name,
        email,
        googleId,
        isVerified: true, // Assume Google-verified email is verified
      });
      await user.save();
    }

    // Generate JWT tokens
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "25s" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
      { expiresIn: "2h" }
    );

    // Save the refresh token in the database
    user.refreshToken = refreshToken;
    await user.save();

    // Set cookies for the tokens
    res.cookie("token", token, {
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true,
      sameSite: "lax",
    });

    res.cookie("tokenExists", true, {
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: false,
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day lifetime
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.userRole,
      },
      token,
    });
  } catch (error) {
    console.error("Error during Google login", error);
    return res.status(500).json({ message: "An error occurred during Google login" });
  }
};











module.exports = {
  signup,
  login,
  verification,
  getUser,
  fetchUserById,
  refreshToken,
  logout,
  resetPassword,
  verifySecretAnswer,
  googleLogin
};
