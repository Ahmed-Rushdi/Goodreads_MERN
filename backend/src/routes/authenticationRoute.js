const express = require("express");
const passport = require("passport");
const router = express.Router();
require("dotenv").config();
const authenticateUser = require("../middlewares/authenticateUser");
const jwt = require("jsonwebtoken");
const {
  signup,
  login,
  verification,
  getUser,
  refreshToken,
  fetchUserById,
  verifySecretAnswer,
  resetPassword,
  logout,
} = require("../controllers/AuthenticationController");

// sign up route
router.post("/signup", signup);

// Local login route
router.post("/login", login);

// route to get the user
router.get("/user", verification, getUser);

// refresh token route

router.get("/refresh", refreshToken);

// logout route
router.post("/logout", logout);

//verify secret question route

router.post("/verify-secret-answer", verifySecretAnswer);

//reset password route
router.post("/reset-password", resetPassword);

// Google OAuth route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route for Google to redirect to
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Redirect back to login on failure
  }),
  async (req, res) => {
    // Generate JWT and refresh token
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: req.user._id },
      process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
      { expiresIn: "2h" }
    );

    // Save the refresh token in the database
    req.user.refreshToken = refreshToken;
    await req.user.save();

    // Set cookies for token and refresh token
    res.cookie("token", token, {
      path: "/",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "lax",
    });

    res.redirect("/"); // Redirect to the desired route after successful login
  }
);

// router.get("/auth/getUser", authenticateUser, (req, res) => {
//   // User details are now available in req.user
//   res.json({ user: req.user });
// });
// route to refresh the token
// router.get("/refresh", refreshToken, verification, getUser);

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const { accessToken, refreshToken } = await login(email, password);

//     res.cookie("jwt", accessToken, {
//       httpOnly: true,
//       secure: false,
//     });
//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: false,
//     });
//     res.status(200).json({ message: "Login successful" });
//   } catch (error) {
//     res.status(401).json({ message: error.message });
//   }
// });
module.exports = router;
