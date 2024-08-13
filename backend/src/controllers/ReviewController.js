const Review = require("../models/Review.model");
const Book = require("../models/Book.model");
const User = require("../models/User.model");

// * GET
// * Get paginated reviews of specific book with isbn13 passed as query param
const getBookPaginatedReviews = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return res
      .status(400)
      .send({ error: "Page and limit must be positive integers." });
  }
  const startIndex = (page - 1) * limit;
  const isbn13 = req.params.isbn13;

  const book = await Book.findOne({ isbn13 });
  if (!book) return res.status(404).send("Book not found");

  const paginatedReviews = book.reviews.slice(startIndex, startIndex + limit);
  const count = book.reviews.length;

  if (paginatedReviews.length === 0) {
    return res.status(404).send({ error: "No reviews found." });
  }

  res.send({
    reviews: paginatedReviews,
    totalReviews: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  });
};

// * Get paginated reviews of specific user with User._id passed as req.user from jwt middleware
const getUserPaginatedReviews = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return res
      .status(400)
      .send({ error: "Page and limit must be positive integers." });
  }
  const startIndex = (page - 1) * limit;
  const uid = req.user.id;

  const user = await User.findOne({ _id: uid });
  if (!user) return res.status(404).send("User not found");

  const paginatedReviews = user.reviews.slice(startIndex, startIndex + limit);
  const count = user.reviews.length;

  if (paginatedReviews.length === 0) {
    return res.status(404).send({ error: "No reviews found." });
  }

  res.send({
    reviews: paginatedReviews,
    totalReviews: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  });
};

// * Get all reviews of specific book with isbn13 passed as query param
const getAllBookReviews = async (req, res) => {
  const isbn = req.params.isbn13;
  const book = await Book.findOne({ isbn13: isbn });
  if (!book) return res.status(404).send("Book not found");
  const reviews = book.reviews;
  res.send(reviews);
};

// * Get all reviews of specific user with User._id passed as req.user from jwt middleware
const getAllUserReviews = async (req, res) => {
  const uid = req.user.id;
  const user = await User.findOne({ _id: uid });
  if (!user) return res.status(404).send("User not found");
  const reviews = user.reviews;
  res.send(reviews);
};

// * Get: main BookReviews handler checks if pagination is requested or not
const getBookReviews = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (page !== undefined && limit !== undefined) {
      return getBookPaginatedReviews(req, res);
    } else {
      return getAllBookReviews(req, res);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// * Get: main UserReviews handler checks if pagination is requested or not
const getUserReviews = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (page !== undefined && limit !== undefined) {
      return getUserPaginatedReviews(req, res);
    } else {
      return getAllUserReviews(req, res);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// * Get specific review by isbn13 (from req.params) and user._id (from req.user)
const getReview = async (req, res) => {
  const review = await Review.findOne({
    bookId: req.params.isbn13,
    userId: req.user.id,
  });
  if (!review) return res.status(404).send("Review not found");
  res.send(review);
};

// * POST
const postReview = async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  const user = await User.findOne({ _id: req.user.id });
  if (!user) return res.status(404).send("User not found");

  const review = new Review(req.body);
  review.bookId = req.params.isbn13;
  review.userId = req.user.id;

  book.reviews.push(review);
  user.reviews.push(review);

  await Promise.all([book.save(), user.save()]);

  res.send("Review Added");
};

// * PUT
const putReview = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn13: req.params.isbn13 });
    if (!book) return res.status(404).send("Book not found");
    const user = await User.findOne({ _id: req.user.id });
    if (!user) return res.status(404).send("User not found");
    const review = user.reviews.find((r) => r.bookId === req.params.isbn13);
    if (!review) return res.status(404).send("Review not found");

    book.reviews.pull(review);
    user.reviews.pull(review);

    const newReview = {
      ...review,
      ...req.body,
    };
    book.reviews.push(newReview);
    user.reviews.push(newReview);

    await Promise.all([book.save(), user.save()]);

    res.send("Review Updated");
  } catch (error) {
    res.status(500).send(`an error occurred while updating review: ${error}`);
  }
};

// * DELETE
const deleteReview = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn13: req.params.isbn13 });
    if (!book) return res.status(404).send("Book not found");
    const user = await User.findOne({ _id: req.user.id });
    if (!user) return res.status(404).send("User not found");
    const review = user.reviews.find((r) => r.bookId === req.params.isbn13);
    if (!review) return res.status(404).send("Review not found");

    book.reviews.pull(review);
    user.reviews.pull(review);

    await Promise.all([book.save(), user.save()]);

    res.send("Review Deleted");
  } catch (error) {
    res.status(500).send(`an error occurred while updating review: ${error}`);
  }
};

// * DELETE
const deleteReviewAdmin = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn13: req.params.isbn13 });
    if (!book) return res.status(404).send("Book not found");
    const user = await User.findOne({ _id: req.params.userId });
    if (!user) return res.status(404).send("User not found");
    const review = user.reviews.find((r) => r.bookId === req.params.isbn13);
    if (!review) return res.status(404).send("Review not found");

    book.reviews.pull(review);
    user.reviews.pull(review);

    await Promise.all([book.save(), user.save()]);

    res.send("Review Deleted");
  } catch (error) {
    res.status(500).send(`an error occurred while updating review: ${error}`);
  }
};

module.exports = {
  getBookReviews,
  getUserReviews,
  getReview,
  postReview,
  putReview,
  deleteReview,
  deleteReviewAdmin,
};