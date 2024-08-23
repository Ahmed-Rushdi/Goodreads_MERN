const express = require("express");
const {
  uploadAuthorImage,
  uploadBookCover,
} = require("../controllers/ImagesController");
const router = express.Router();

router.post("/author", uploadAuthorImage);

router.post("/book", uploadBookCover);

module.exports = router;
