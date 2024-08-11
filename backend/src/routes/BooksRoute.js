const express = require("express");
const Book = require("../models/Book.model");

const router = express.Router();

// * Get All Books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

// * Get Books by ISBN
router.get("/:isbn13", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  res.send(book);
});

// * Add Book
router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.send("book created");
  } catch (error) {
    res.status(409).send(error.errmsg);
  }
});

// * Update Book info
router.put("/:isbn13", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  book.set(req.body);
  await book.save();
  res.send(book);
});

// * Delete Book
router.delete("/:isbn13", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  await book.remove();
  res.send(book);
});


module.exports = router;
