const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// Verify Valid Email
function isValidEmail(email) {
	// Regular expression for validating an email address
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
// JWT Token Expire Date
const maxAge = 3 * 24 * 60 * 60;

// Generate JWT Token
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	console.log({ name, email, password });

	if (!name || !email || !password) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	const validEmail = isValidEmail(email);
	console.log({ validEmail });
	if (!validEmail) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error("User already exists");
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}

	// res.json({ message: "Register User" });
});

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!password || !email) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	const validEmail = isValidEmail(email);
	console.log({ validEmail });
	if (!validEmail) {
		res.status(400);
		throw new Error("Please enter a valid email");
	}

	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid Credentials");
	}

	// res.json({ message: "Login User" });
});

const getMe = asyncHandler(async (req, res) => {
	/* const { _id, name, email } = await User.findById(req.user.id);

	res.status(200).json({
		id: _id,
		name,
		email,
	}); */

	if (!req.user) {
		res.status(401);
		throw new Error("User does not found. Please Login.");
	}

	res.status(200).json(req.user);
});

const logoutUser = (req, res) => {
	req.user = "";
	res.status(200).json({ message: "Logout Successfully" });
};

module.exports = { registerUser, loginUser, getMe, logoutUser };
