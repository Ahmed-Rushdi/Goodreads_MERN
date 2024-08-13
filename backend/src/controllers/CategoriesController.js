const Category = require("../models/Category.model");

// * GET
const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
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
