const express = require("express");
const {
  getBooks,
  getBook,
  postBook,
  putBook,
  deleteBook,
} = require("../controllers/BookController");

const router = express.Router();

// * Get All Books or paginated books if page and limit are provided
router.get("/", getBooks);

// * Get Books by ISBN
router.get("/:isbn13", getBook);

// * Get Books by category
router.get("/category/:categoryId", getCategoryBooks);

// * Get Books by author
router.get("/author/:authorId", getCategoryBooks);

// * Add Book
router.post("/", postBook);

// * Update Book info by ISBN
// ! ISBN should be immutable
router.put("/:isbn13", putBook);

// * Delete Book by ISBN
router.delete("/:isbn13", deleteBook);

module.exports = router;
