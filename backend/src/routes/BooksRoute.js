const express = require("express");
const Book = require("../models/Book.model");
const Review = require("../models/Review.model");

const router = express.Router();

// * Books
// TODO: Add more operations for books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

router.get("/:isbn13", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  res.send(book);
});

router.post("/", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.send("book created");
  } catch (error) {
    res.status(409).send(error.errmsg);
  }
});
router.delete("/:isbn13", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  await book.remove();
  res.send(book);
});

// * Reviews
// TODO: Add more operations for reviews
router.get("/:isbn13/reviews", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  const reviews = book.reviews;
  res.send(reviews);
});

router.post("/:isbn13/reviews", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  const review = new Review(req.body);
  book.reviews.push(review);
  await book.save();
  res.send(review);
});

// FIXME : implement user side deletion
// TODO: possibly change the endpoint review id to user id and pop the review from the books and the
router.delete("/:isbn13/reviews/:reviewId", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  const review = book.reviews.id(req.params.reviewId);
  if (!review) return res.status(404).send("Review not found");
  review.remove();
  await book.save();
  res.send(review);
});

// TODO: Test and add more operations

module.exports = router;
