const Category = require("../models/Category.model");
const paginateData = require("../utils/Paginator");
const buildSearchQuery = require("../utils/SearchUtils");
// * GET
// * Get categories handles pagination and search with req.query {page, limit, q}
const getCategories = async (req, res) => {
  try {
    const { page = 1, limit = 0, q = "" } = req.query;
    const result = await paginateData(
      buildSearchQuery(Category, q),
      page,
      limit
    );
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
// * Get specific category with Category._id passed in req.params
const getCategory = async (req, res) => {
  const categories = await Category.findOne({ _id: req.params.categoryId });
  res.send(categories);
};

// * POST
const postCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.send("Category created");
  } catch (error) {
    res.status(409).send(`An error occurred while creating category: ${error}`);
  }
};

// * PUT
const putCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.categoryId },
      req.body
    );
    res.send("Category updated");
  } catch (error) {
    res.status(409).send(`An error occurred while updating category: ${error}`);
  }
};

// * DELETE
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.categoryId,
    });
    res.send("Category deleted");
  } catch (error) {
    res.status(500).send(`An error occurred while deleting category: ${error}`);
  }
};

module.exports = {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
};
