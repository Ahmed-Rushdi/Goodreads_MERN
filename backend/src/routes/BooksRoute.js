const { Router } = require("express");
const { userAuth, adminAuth } = require("../middlewares/JwtAuth");
const {
  getBooks,
  getBook,
  getCategoryBooks,
  getAuthorBooks,
  postBook,
  putBook,
  deleteBook,
} = require("../controllers/BookController");

const router = Router();

// * Get All Books or paginated books if page and limit are provided
router.get("/", getBooks);

// * Get Book by ISBN
router.get("/:isbn13", getBook);

// * Get Books by category
router.get("/category/:categoryId", getCategoryBooks);

// * Get Books by author
router.get("/author/:authorId", getAuthorBooks);

// * Add Book
router.post("/", postBook);

// * Update Book info by ISBN
// ! ISBN should be immutable
router.put("/:isbn13", userAuth, adminAuth, putBook);

// * Delete Book by ISBN
router.delete("/:isbn13", userAuth, adminAuth, deleteBook);

module.exports = router;
