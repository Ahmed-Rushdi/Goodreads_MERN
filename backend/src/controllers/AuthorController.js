const Author = require("../models/Author.model");

// * GET
const getAuthors = async (req, res) => {
  const authors = await Author.find();
  res.send(authors);
};

const getAuthor = async (req, res) => {
  const authors = await Author.findOne({ _id: req.params.authorId });
  res.send(authors);
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
