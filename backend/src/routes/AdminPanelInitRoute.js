const { userAuth, adminAuth } = require("../middlewares/JwtAuth");

const router = require("express").Router();

router.get("/", userAuth, adminAuth, (req, res) => {
  res.send("Admin Authorized");
});

module.exports = router;
