const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/JwtAuth");
const { editShelf, getBookShelf } = require("../controllers/ShelfController");

router.put("/:isbn13", userAuth, editShelf);
router.get("/book-shelf", userAuth, getBookShelf);

module.exports = router;
