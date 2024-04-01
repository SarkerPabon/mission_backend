const asyncHandler = require("express-async-handler");

const Mission = require("../models/missionModel");
const Survay = require("../models/survayModel");

const getAllSurvays = asyncHandler(async (req, res) => {
	console.log("getAllSurvays");
	const mission = await Mission.findById(req.params.id);

	if (!mission) {
		res.status(401);
		throw new Error("Mission deos not exist");
	}

	const survays = await Survay.find({ mission: mission._id });
	res.status(200).json(survays);
});

const setSurvay = asyncHandler(async (req, res) => {
	console.log("setSurvay");
	const { name, email, profession, rate, review, mission } = req.body;

	if (!name || !email || !profession || !rate || !review || !mission) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	const survay = await Survay.create({
		name,
		email,
		profession,
		rate,
		review,
		mission,
	});

	res.status(201).json(survay);
});

module.exports = {
	getAllSurvays,
	setSurvay,
};
