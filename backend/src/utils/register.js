const User = require("../models/User.model");

const register = async (user) => {
  const newUser = new User(user);
  await newUser.save();
  return {
    status: 201,
    message: "created user successfully",
    data: newUser,
  };
};

module.exports = { register };
