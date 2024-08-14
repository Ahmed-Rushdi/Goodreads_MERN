const Book = require("../models/Book.model");
const Author = require("../models/Author.model");
const Category = require("../models/Author.model");
const getTrendingBooks = async (req, res) => {
  try {
    const trendingBooks = await Book.find({})
      .sort({ averageRating: -1, ratingCount: -1 })
      .limit(10);
    res.status(200).json(trendingBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending books ", error });
  }
};
const getTrendingAuthors = async (req, res) => {
  try {
    const trendingAuthors = await Author.find({})
      .populate("bookCount")
      .populate("totalRatings")
      .populate("averageRating")
      .sort({ totalRating: -1, averageRating: -1 })
      .limit(10);

    res.status(200).json(trendingAuthors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trending authors ", error });
  }
};
const getTrendingCategories = async (req, res) => {
  try {
    const trendingCategories = await Category.find({})
      .populate("bookCount")
      .sort({ bookCount: -1 })
      .limit(10);

    res.status(200).json(trendingCategories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching trending categories ", error });
  }
};

module.exports = {
  getTrendingBooks,
  getTrendingAuthors,
  getTrendingCategories,
};
