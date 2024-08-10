const express = require("express");
const mongoose = require("mongoose");
const Book = require("../models/Book.model");
const Review = require("../models/Review.model");

const router = express.Router();
// * Books
// TODO: Add more operations for books
router.get("/api/books", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

router.get("/api/books/:isbn13", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  res.send(book);
});

router.post("/api/books/", async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send(book);
});
router.delete("/api/books/:isbn13", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  await book.remove();
  res.send(book);
});
// * Reviews
// TODO: Add more operations for reviews
router.get("/api/books/:isbn13/reviews", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  const reviews = book.reviews;
  res.send(reviews);
});


router.post("/api/books/:isbn13/reviews", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  const review = new Review(req.body);
  book.reviews.push(review);
  await book.save();
  res.send(review);
});


// TODO: Test and add more operations

module.exports = router;
