const express = require("express");
const Book = require("../models/Book.model");
const Review = require("../models/Review.model");
// const User = require("../models/User.model");

const router = express.Router();

// * Reviews
// TODO: integrate with user  (uncomment code when the user model is available)

// retrieve all reviews of specific book
router.get("/book/:isbn13", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  const reviews = book.reviews;
  res.send(reviews);
});

// retrieve all reviews of specific book
router.get("/user/:userId", async (req, res) => {
  // TODO: integrate with user model (uncomment code when the user model is available)
  //   const user = await User.findOne({ _id: req.params.userId });
  //   if (!user) return res.status(404).send("User not found");
  //   const reviews = user.reviews;
  //   res.send(reviews);
});

// add review to specific book and user
router.post("/:isbn13", async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  // TODO: integrate with user model
  const review = new Review(req.body);
  book.reviews.push(review);
  await book.save();
  res.send("review added");
});

// TODO: integrate with user model (uncomment code when the user model is available)
// delete specific review from book and user
router.delete("/:isbn13/:userId", async (req, res) => {
  const book = await Book.findOne({
    isbn13: req.params.isbn13,
  });
  if (!book) return res.status(404).send("Book not found");
  //   const user = await User.findOne({ _id: req.params.userId });
  //   if (!user) return res.status(404).send("Review not found");
  const reviewPartial = {
    bookId: req.params.isbn13,
    userId: req.params.userId,
  };
  book.reviews.pull(reviewPartial);
  //   user.reviews.pull(reviewPartial);
  await book.save();
  await user.save();
  res.send("review deleted");
});


module.exports = router;