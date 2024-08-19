const authenticateUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  const userCookie = req.cookies.user;

  if (!token || !userCookie) {
    return res
      .status(401)
      .json({ message: "No token or user data provided, please log in." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = JSON.parse(decodeURIComponent(userCookie));
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
module.exports = authenticateUser;
