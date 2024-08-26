const { Router } = require("express");
const { userAuth, adminAuth } = require("../middlewares/JwtAuth");
const {
  getBookReviews,
  getUserReviews,
  getReview,
  postReview,
  putReview,
  deleteReview,
} = require("../controllers/ReviewController");

const router = Router();

// * Get reviews of specific book
router.get("/book/:isbn13", getBookReviews);

// * Get reviews of specific user
router.get("/user/", getUserReviews);

// * Get specific review by isbn13 (from req.params) and user._id (from req.user)
router.get("/user/:isbn13", userAuth, getReview);

// * Add review to specific book and current user
router.post("/:isbn13", userAuth, postReview);

// * Update specific review from book and user
router.put("/:isbn13", userAuth, putReview);

// * Delete specific review from book and current user
router.delete("/:isbn13", userAuth, deleteReview);

// * Delete specific review from book and any user (admin op)
router.delete("/:isbn13/:userId", userAuth, adminAuth, deleteReview);

module.exports = router;
