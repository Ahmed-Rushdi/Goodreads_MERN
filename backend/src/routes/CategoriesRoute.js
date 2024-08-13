const { Router } = require("express");
const { userAuth, adminAuth } = require("../middlewares/JwtAuth");
const {
  getCategories,
  getCategory,
  postCategory,
  putCategory,
  deleteCategory,
} = require("../controllers/CategoryController");

const router = Router();

// * GET
router.get("/", getCategories);

// * GET
router.get("/:categoryId", getCategory);

// * POST
router.post("/", userAuth, adminAuth, postCategory);

// * PUT
router.put("/:categoryId", userAuth, adminAuth, putCategory);

// * DELETE
router.delete("/:categoryId", userAuth, adminAuth, deleteCategory);

module.exports = router;
