const express = require("express");
const {
  getBookReviews,
  getUserReviews,
  getReview,
  postReview,
  putReview,
  deleteReview,
} = require("../controllers/ReviewController");

const router = express.Router();

// * Get reviews of specific book
router.get("/book/:isbn13", getBookReviews);

// * Get reviews of specific user
router.get("/user/", getUserReviews);

// * Get specific review by isbn13 (from req.params) and user._id (from req.user)
router.get("/user/:isbn13", getReview);

// * Add review to specific book and user
router.post("/:isbn13", postReview);

// * Update specific review from book and user
router.put("/:isbn13", putReview);

// * Delete specific review from book and user async (req, res) => { async (req, res) => {
router.delete("/:isbn13", deleteReview);

module.exports = router;
