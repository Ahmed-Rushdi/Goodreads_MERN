const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/JwtAuth");
const {
  editShelf,
  getBookShelf,
  getAllBooks,
} = require("../controllers/ShelfController");

router.put("/:isbn13", userAuth, editShelf);
router.get("/book-shelf", userAuth, getBookShelf);
router.get("/books", userAuth, getAllBooks);

module.exports = router;
