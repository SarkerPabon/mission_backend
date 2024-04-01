const express = require("express");

const {
	registerUser,
	loginUser,
	getMe,
	logoutUser,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", protect, getMe);

module.exports = router;
