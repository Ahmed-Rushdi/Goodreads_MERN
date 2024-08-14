const express = require("express");
const {
  getTrendingBooks,
  getTrendingAuthors,
  getTrendingCategories,
} = require("../controllers/trendsControllers");

const router = express.Router();

router.get("/trending-books", getTrendingBooks);

router.get("/trending-authors", getTrendingAuthors);

router.get("/trending-categories", getTrendingCategories);
