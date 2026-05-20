const express = require("express");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const { createBlog,getAllBlogs,getSingleBlog, updateBlog, deleteBlog, } = require("../controllers/blogController");

const router = express.Router();

router.post(
  "/create",
  protect,
  authorizeRoles("super-admin", "editor", "author"),
  createBlog
);
router.get("/", getAllBlogs);

router.get("/:id", getSingleBlog);

router.put(
  "/:id",
  protect,
  authorizeRoles("super-admin", "editor", "author"),
  updateBlog
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("super-admin", "editor", "author"),
  deleteBlog
);
module.exports = router;