const Book = require("../models/Book.model");
const Author = require("../models/Author.model");
const Category = require("../models/Author.model");
// TODO Refactor repeated pagination code

// * GET
// * Get paginated books
const getPaginatedBooks = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return res
      .status(400)
      .send({ error: "Page and limit must be positive integers." });
  }

  const startIndex = (page - 1) * limit;
  const paginatedBooks = await Book.find().skip(startIndex).limit(limit);

  const count = await Book.countDocuments();

  if (paginatedBooks.length === 0) {
    return res.status(404).send({ error: "No books found." });
  }
  res.send({
    books: paginatedBooks,
    totalBooks: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  });
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

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return res
      .status(400)
      .send({ error: "Page and limit must be positive integers." });
  }

  const startIndex = (page - 1) * limit;
  const paginatedBooks = await Book.find({ categories: req.params.categoryId })
    .skip(startIndex)
    .limit(limit);

  const count = await Book.countDocuments({
    categories: req.params.categoryId,
  });

  if (paginatedBooks.length === 0) {
    return res.status(404).send({ error: "No books found." });
  }
  res.send({
    books: paginatedBooks,
    totalBooks: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  });
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

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return res
      .status(400)
      .send({ error: "Page and limit must be positive integers." });
  }

  const startIndex = (page - 1) * limit;
  const paginatedBooks = await Book.find({ authorId: req.params.authorId })
    .skip(startIndex)
    .limit(limit);

  const count = await Book.countDocuments({ authorId: req.params.authorId });

  if (paginatedBooks.length === 0) {
    return res.status(404).send({ error: "No books found." });
  }
  res.send({
    books: paginatedBooks,
    totalBooks: count,
    currentPage: page,
    totalPages: Math.ceil(count / limit),
  });
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
