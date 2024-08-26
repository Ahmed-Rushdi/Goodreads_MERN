const Book = require("../models/Book.model");
const Author = require("../models/Author.model");
const Category = require("../models/Category.model");
const paginateData = require("../utils/Paginator");
const getTrendingBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const query = Book.find({})
      .populate("authorId", "name")
      .populate("categories", "name")
      .sort({ averageRating: -1, ratingCount: -1 });

    const paginatedBooks = await paginateData(
      query,
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json(paginatedBooks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trending books", error });
  }
};
const getTrendingAuthors = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const query = Author.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "authorId",
          as: "books",
        },
      },
      {
        $unwind: "$books",
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          bio: { $first: "$bio" },
          birthDate: { $first: "$birthDate" },
          totalRatings: { $sum: "$books.ratingsCount" },
          averageRating: { $avg: "$books.averageRating" },
        },
      },
      {
        $sort: { totalRatings: -1, averageRating: -1 },
      },
    ]);

    const paginatedAuthors = await paginateData(
      query,
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json(paginatedAuthors);
  } catch (error) {
    console.error("Error fetching trending authors:", error);
    res.status(500).json({ message: "Error fetching trending authors", error });
  }
};

const getTrendingCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const query = Category.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "categories",
          as: "books",
        },
      },
      {
        $addFields: {
          bookCount: { $size: "$books" },
        },
      },
      {
        $sort: { bookCount: -1 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          bookCount: 1,
        },
      },
    ]);

    const paginatedCategories = await paginateData(
      query,
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json(paginatedCategories);
  } catch (error) {
    console.error("Error fetching trending categories:", error);
    res
      .status(500)
      .json({ message: "Error fetching trending categories", error });
  }
};

module.exports = {
  getTrendingBooks,
  getTrendingAuthors,
  getTrendingCategories,
};
