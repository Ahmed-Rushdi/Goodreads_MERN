const express = require("express");
const { login } = require("../utils/login");
const passport = require("passport");
const router = express.Router();
require("dotenv").config();

// Local login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { accessToken, refreshToken, user } = await login(email, password);

    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: false,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});
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

// Google OAuth route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email"],
  })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Redirect to a secure route or homepage
    res.redirect("/api/auth/current_user");
  }
);

// Logout route

router.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }

      res.clearCookie("jwt");
      res.clearCookie("refreshToken");

      // Redirect to homepage or wherever
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

// Route to get the current logged-in user
router.get("/current_user", (req, res) => {
  res.send(req.user);
});

module.exports = router;