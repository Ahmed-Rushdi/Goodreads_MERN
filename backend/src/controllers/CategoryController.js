const Category = require("../models/Category.model");
const { paginateData } = require("../utils/paginator");

// * GET
// * Get paginated categories
const getPaginatedCategories = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    const result = await paginateData(Category, {}, page, limit);
    res.send(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

// * Get all categories
const getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
};

// * Get categories handler checks for pagination request
const getCategories = async (req, res) => {
  try {
    const { page, limit } = req.query;
    if (page !== undefined && limit !== undefined) {
      return getPaginatedCategories(req, res);
    } else {
      return getAllCategories(req, res);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

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
