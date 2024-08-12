const express = require("express");
const Book = require("../models/Book.model");
const Review = require("../models/Review.model");
const User = require("../models/User.model");

const router = express.Router();

// TODO: integrate with user  (uncomment code when the user model is available)

// * Get all reviews of specific book
router.get("/book/:isbn13", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  const reviews = book.reviews;
  res.send(reviews);
});

// * Get all reviews of specific user
router.get("/user/:userId", async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId });
  if (!user) return res.status(404).send("User not found");
  const reviews = user.reviews;
  res.send(reviews);
});

// * Add review to specific book and user
router.post("/:isbn13", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  const user = await User.findOne({ _id: req.body.userId });
  if (!user) return res.status(404).send("User not found");
  const review = new Review(req.body);
  book.reviews.push(review);
  user.reviews.push(review);
  await book.save();
  res.send("Added Review");
});

// * Delete specific review from book and user async (req, res) => { async (req, res) => {
// ? There is probably a better way to do this?
// TODO find a better way
router.delete("/:isbn13/:userId", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  const user = await User.findOne({ _id: req.params.userId });
  if (!user) return res.status(404).send("Review not found");

  const review = User.reviews.find((r) => r.bookId === req.params.isbn13);
  book.reviews.pull(review);
  user.reviews.pull(review);

  await book.save();
  await user.save();

  res.send("Deleted Review");
});


module.exports = router;