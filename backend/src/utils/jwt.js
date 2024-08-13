const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, "midomashakel2", {
    expiresIn: "30m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, "midomashakel1", {
    expiresIn: "7d",
  });
};

module.exports = { generateToken, generateRefreshToken };