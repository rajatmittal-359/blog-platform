const express = require("express");

const protect = require("../middleware/authMiddleware");

const authorizeRoles = require("../middleware/roleMiddleware");

const { getProfile,getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, getProfile);

router.get("/", protect, authorizeRoles("super-admin"), getAllUsers);

module.exports = router;