const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const { serialize } = require("cookie");

const { generateToken, generateRefreshToken } = require("./jwt");

const login = async (email, password, res) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  // Set cookies with JWT and user info
  res.setHeader("Set-Cookie", [
    serialize("jwt", accessToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 3600000),
    }),
    serialize("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      expires: new Date(Date.now() + 3600000),
    }),
    serialize(
      "user",
      JSON.stringify({ id: user._id, name: user.name, email: user.email }),
      {
        httpOnly: true,
        path: "/",
        expires: new Date(Date.now() + 3600000),
      }
    ),
  ]);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

module.exports = { login };
