const { Router } = require("express");
const { userAuth, adminAuth } = require("../middlewares/JwtAuth");

const {
  getAuthors,
  getAuthor,
  postAuthor,
  putAuthor,
  deleteAuthor,
} = require("../controllers/AuthorController");

const router = Router();

// * GET
router.get("/", getAuthors);

// * GET
router.get("/:authorId", getAuthor);

// * POST
router.post("/", userAuth, adminAuth, postAuthor);

// * PUT
router.put("/:authorId", userAuth, adminAuth, putAuthor);

// * DELETE
router.delete("/:authorId", userAuth, adminAuth, deleteAuthor);

module.exports = router;
