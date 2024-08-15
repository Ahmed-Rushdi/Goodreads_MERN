const Book = require("../models/Book.model");
const Author = require("../models/Author.model");
const Category = require("../models/Category.model");
const { paginateData } = require("../utils/paginator.js");

// * GET
// * Get paginated books
const getPaginatedBooks = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    const result = await paginateData(Book, {}, page, limit);
    res.send(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

// * Get all books
const getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.send(books);
};
// * Get books handler checks for pagination request
const getBooks = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (page !== undefined && limit !== undefined) {
      return getPaginatedBooks(req, res);
    } else {
      return getAllBooks(req, res);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// * Get specific book
const getBook = async (req, res) => {
  const book = await Book.findOne({ isbn13: req.params.isbn13 });
  if (!book) return res.status(404).send("Book not found");
  res.send(book);
};

// * Get paginated category books
const getPaginatedCatBooks = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    const result = await paginateData(
      Book,
      { categories: req.params.categoryId },
      page,
      limit
    );
    res.send(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

// * Get all category books
const getAllCatBooks = async (req, res) => {
  const books = await Book.find({ categories: req.params.categoryId });
  res.send(books);
};
// * Get category books handler checks for pagination request
const getCategoryBooks = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (page !== undefined && limit !== undefined) {
      return getPaginatedCatBooks(req, res);
    } else {
      return getAllCatBooks(req, res);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// * Get paginated author books
const getPaginatedAuthorBooks = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    const result = await paginateData(
      Book,
      { authorId: req.params.authorId },
      page,
      limit
    );
    res.send(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

// * Get all author books
const getAllAuthorBooks = async (req, res) => {
  const books = await Book.find({ authorId: req.params.authorId });
  res.send(books);
};

// * Get author books handler checks for pagination request
const getAuthorBooks = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (page !== undefined && limit !== undefined) {
      return getPaginatedAuthorBooks(req, res);
    } else {
      return getAllAuthorBooks(req, res);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// * POST
const postBook = async (req, res) => {
  const { author, categories, ...bookData } = req.body;
  try {
    let authorDoc = await Author.findOne({ name: author.name });
    if (!authorDoc) {
      authorDoc = await Author.create(author);
    }
    const categoryDocs = await Promise.all(
      categories.map(async (categoryName) => {
        let categoryDoc = await Category.findOne({ name: categoryName });
        if (!categoryDoc) {
          categoryDoc = await Category.create({ name: categoryName });
        }
        return categoryDoc._id;
      })
    );

    await Book.create({
      ...bookData,
      authorId: authorDoc._id,
      categories: categoryDocs,
    });
    res.send("Book created");
  } catch (error) {
    res.status(409).send(`An error occurred while creating book: ${error}`);
  }
};

// * PUT
const putBook = (req, res) => {
  Book.findOneAndUpdate({ isbn13: req.params.isbn13 }, req.body, { new: true })
    .then((book) => {
      if (!book) {
        return res.status(404).send("Book not found");
      }
      res.send("Book updated");
    })
    .catch((error) =>
      res.status(409).send(`An error occurred while updating book: ${error}`)
    );
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
