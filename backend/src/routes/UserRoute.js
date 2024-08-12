const express = require("express");
const router = express.Router();
const register_user = require("../utils/register");

// register a new user
router.post("/register", async (req, res) => {
  try {
    const response = await register_user.register(req.body);
    res
      .status(response.status)
      .json({ message: response.message, data: response.data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

module.exports = router;
