const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const userAuth = (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const adminAuth = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(403).send("Unauthorized");
    const user = await User.findById(userId).select("role");
    if (!user || user.userRole !== "admin")
      return res.status(403).send("Unauthorized");
    return next();
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { userAuth, adminAuth };
