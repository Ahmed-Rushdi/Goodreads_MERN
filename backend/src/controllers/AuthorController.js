const Author = require("../models/Author.model");
const { paginateData } = require("../utils/paginator");
// * GET
// * Get paginated authors
const getAuthorsPaginated = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    const result = await paginateData(Author, {}, page, limit);
    res.send(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

// * Get all authors
const getAllAuthors = async (req, res) => {
  const authors = await Author.find();
  res.send(authors);
};

const getAuthors = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (page !== undefined && limit !== undefined) {
      return getAuthorsPaginated(req, res);
    } else {
      return getAllAuthors(req, res);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.authorId)
      .populate({
        path: "books",
        select: "title isbn13",
      })
      .populate("bookCount");

    if (!author) {
      return res.status(404).send("Author not found");
    }

    res.send(author);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// * POST
const postAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.send("Author created");
  } catch (error) {
    res.status(409).send(`An error occurred while creating author: ${error}`);
  }
};

// * PUT
const putAuthor = async (req, res) => {
  try {
    const author = await Author.findOneAndUpdate(
      { _id: req.params.authorId },
      req.body
    );
    res.send("Author updated");
  } catch (error) {
    res.status(409).send(`An error occurred while updating author: ${error}`);
  }
};

// * DELETE
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findOneAndDelete({
      _id: req.params.authorId,
    });
    res.send("Author deleted");
  } catch (error) {
    res.status(500).send(`An error occurred while deleting author: ${error}`);
  }
};

module.exports = {
  getAuthors,
  getAuthor,
  postAuthor,
  putAuthor,
  deleteAuthor,
};
