// const jwt = require("jsonwebtoken");

// const generateToken = (user) => {
//   return jwt.sign(
//     { id: user._id, name: user.name, email: user.email },
//     "midomashakel2",
//     {
//       expiresIn: "1d",
//     }
//   );
// };

// const generateRefreshToken = (user) => {
//   return jwt.sign({ id: user._id, email: user.email }, "midomashakel1", {
//     expiresIn: "7d",
//   });
// };

// module.exports = { generateToken, generateRefreshToken };

require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
