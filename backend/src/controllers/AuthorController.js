const Author = require("../models/Author.model");
const paginateData = require("../utils/Paginator");
// * GET
// * Get authors handles pagination and search with req.query {page, limit, q}
const getAuthors = async (req, res) => {
  try {
    const { page = 1, limit = 0, q = "" } = req.query;
    const result = await paginateData(buildSearchQuery(Author, q), page, limit);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
// * Get specific author with Author._id passed in req.params
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
