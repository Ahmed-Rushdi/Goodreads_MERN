const Book = require("../models/Book.model");

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

// * Get books by category
const getCategoryBooks = async (req, res) => {
  const books = await Book.find({ categories: req.params.categoryId });
  res.send(books);
};

// * Get books by author
const getAuthorBooks = async (req, res) => {
  const books = await Book.find({ authorId: req.params.authorId });
  res.send(books);
};

// * POST
const postBook = async (req, res) => {
  try {
    await Book.create(req.body);
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
  postBook,
  putBook,
  deleteBook,
};
