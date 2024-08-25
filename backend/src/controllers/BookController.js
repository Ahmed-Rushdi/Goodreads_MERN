const Book = require("../models/Book.model");
const Author = require("../models/Author.model");
const Category = require("../models/Category.model");
const paginateData = require("../utils/Paginator");
const buildSearchQuery = require("../utils/SearchUtils");

// * GET
// * Get books handles pagination and search with req.query {page, limit, q}
const getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 0, query = "" } = req.query;
    const result = await paginateData(
      buildSearchQuery(Book, query)
        .populate("authorId", "name")
        .populate("categories", "name"),
      page,
      limit
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
// * Get specific book
const getBook = async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 })
    .populate("authorId", "name")
    .populate("categories", "name");
  if (!book) return res.status(404).send("Book not found");
  res.send(book);
};

// * Get category books handles pagination and search with req.query {page, limit, q}
const getCategoryBooks = async (req, res) => {
  try {
    const { page = 1, limit = 0, q = "" } = req.query;
    const result = await paginateData(
      buildSearchQuery(Book, q, { categories: req.params.categoryId })
        .populate("authorId", "name")
        .populate("categories", "name"),
      page,
      limit
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// * Get author books handles pagination and search with req.query {page, limit, q}
const getAuthorBooks = async (req, res) => {
  try {
    const { page = 1, limit = 0, q = "" } = req.query;
    const result = await paginateData(
      buildSearchQuery(Book, q, { authorId: req.params.authorId })
        .populate("authorId", "name")
        .populate("categories", "name"),
      page,
      limit
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// * POST
const postBook = async (req, res) => {
  const { author, categories, ...bookData } = req.body;
  try {
    let authorDoc = await Author.findOne(
      typeof author === "string" ? { name: author } : { name: author.name }
    );
    if (!authorDoc) {
      authorDoc = await Author.create(author);
    }
    const categoryDocs = categories
      ? await Promise.all(
          categories.map(async (categoryName) => {
            let categoryDoc = await Category.findOne({ name: categoryName });
            if (!categoryDoc) {
              categoryDoc = await Category.create({ name: categoryName });
            }
            return categoryDoc._id;
          })
        )
      : [];
    const book = new Book({
      ...bookData,
      authorId: authorDoc._id,
      categories: categoryDocs,
    });
    categories;
    book.thumbnail = `thumbnails/${book._id}.${
      req.headers["x-file-type"] ?? "jpg"
    }`;
    book.save();
    res.send("Book created");
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .send(`An error occurred while creating book: ${error.message}`);
  }
};

// * PUT
const putBook = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn13: req.params.isbn13 });
    if (!book) return await postBook(req, res);
    book = { ...book, ...req.body };
    await book.save();
    res.send("Book updated");
  } catch (error) {
    res.status(409).send(`An error occurred while updating book: ${error}`);
  }
};

// * DELETE
const deleteBook = (req, res) => {
  Book.deleteOne({ isbn13: req.params.isbn13 })
    .then(() => res.send("Book deleted"))
    .catch((error) =>
      res.status(500).send(`An error occurred while deleting book: ${error}`)
    );
};

module.exports = {
  getBooks,
  getBook,
  getCategoryBooks,
  getAuthorBooks,
  postBook,
  putBook,
  deleteBook,
};
