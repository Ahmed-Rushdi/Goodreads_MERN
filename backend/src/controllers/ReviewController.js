// const Review = require("../models/Review.model");
// const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Types;

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

  const book = await Book.findOne({ isbn13 })
    .populate("reviews.userId", "name")
    .populate("reviews.bookId", "title");
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

  const user = await User.findOne({ _id: uid }).populate(
    "reviews.bookId",
    "title"
  );
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
  const book = await Book.findOne({ isbn13: isbn })
    .populate("reviews.userId", "name")
    .populate("reviews.bookId", "title");
  if (!book) return res.status(404).send("Book not found");
  const reviews = book.reviews;
  res.send(reviews);
};

// * Get all reviews of specific user with User._id passed in req.user from jwt middleware
const getAllUserReviews = async (req, res) => {
  const uid = req.user.id;
  const user = await User.findOne({ _id: uid })
    .populate("reviews.userId", "name")
    .populate("reviews.bookId", "title");
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
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).send("User not authenticated");
    }
    const user = await User.findById(req.user.id);

    const review = user.reviews.find((r) => {
      return r.bookId === req.params.isbn13;
    });
    if (!review) {
      console.log("Review not found for ISBN13:", req.params.isbn13);
      return res.status(404).send("Review not found");
    }

    console.log("Review found:", review);
    res.send(review);
  } catch (error) {
    console.error("Error in getReview:", error);
    res
      .status(500)
      .send(`An error occurred while fetching the review: ${error.message}`);
  }
};
// * POST: Takes review rating and review string from req.body
const postReview = async (req, res) => {
  try {
    const { isbn13 } = req.params;
    const { rating, review } = req.body;
    const userId = req.user.id;

    // Check if the book exists
    const book = await Book.findOne({ isbn13 });
    if (!book) return res.status(404).send("Book not found");

    // Check if the user already reviewed this book
    const existingReview = book.reviews.find(
      (r) => r.userId.toString() === userId
    );

    if (existingReview) {
      return res.status(400).send("User has already reviewed this book");
    }

    // Create a new review
    const newReview = {
      userId,
      bookId: book._id,
      rating,
      review,
    };

    book.reviews.push(newReview);
    await book.save();

    res.status(201).send("Review Added");
  } catch (error) {
    console.error("Error in postReview:", error);
    res.status(500).send(`Error adding review: ${error.message}`);
  }
};

const putReview = async (req, res) => {
  try {
    console.log("PUT Review request received");
    console.log("ISBN13:", req.params.isbn13);
    console.log("User ID:", req.user.id);
    console.log("Request Body:", req.body);

    const book = await Book.findOne({ isbn13: req.params.isbn13 });
    if (!book) return res.status(404).send("Book not found");

    console.log("Book found:", book._id);

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send("User not found");

    console.log("User found:", user._id);

    // Search for review using ISBN13
    let review = user.reviews.find(
      (r) => r.bookId.isbn13 === req.params.isbn13
    );

    if (!review) {
      // If not found in user's reviews, search in book's reviews
      review = book.reviews.find((r) => r.userId.toString() === req.user.id);
    }

    console.log("Found review:", review);

    if (!review) {
      console.log("Review not found, calling postReview");
      return await postReview(req, res);
    }

    // Check if at least one of rating or review is provided
    if (req.body.rating === undefined && req.body.review === undefined) {
      return res
        .status(400)
        .send("Either rating or review must be provided for update");
    }

    // Remove the old review from both book and user
    book.reviews = book.reviews.filter(
      (r) => r.userId.toString() !== req.user.id
    );
    user.reviews = user.reviews.filter(
      (r) => r.bookId.toString() !== book._id.toString()
    );

    // Create updated review
    const updatedReview = {
      userId: req.user.id,
      bookId: book._id,
      rating: req.body.rating !== undefined ? req.body.rating : review.rating,
      review: req.body.review !== undefined ? req.body.review : review.review,
    };

    // Add updated review to both book and user
    book.reviews.push(updatedReview);
    user.reviews.push(updatedReview);

    await Promise.all([book.save(), user.save()]);

    res.send("Review Updated");
  } catch (error) {
    console.error("Error in putReview:", error);
    res
      .status(500)
      .send(`An error occurred while updating the review: ${error.message}`);
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
