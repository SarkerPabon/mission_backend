const asyncHandler = require("express-async-handler");

const Mission = require("../models/missionModel");
const Survay = require("../models/survayModel");

const getAllOpenMissions = asyncHandler(async (req, res) => {
	const missions = await Mission.find({ status: true });
	res.status(200).json(missions);
});

const getAllCloseMissions = asyncHandler(async (req, res) => {
	const missions = await Mission.find({ status: false });
	res.status(200).json(missions);
});

const getMission = asyncHandler(async (req, res) => {
	const mission = await Mission.findById(req.params.id);
	res.status(200).json(mission);
});

const setMission = asyncHandler(async (req, res) => {
	const { title, description, status } = req.body;

	if (!title || !description || status === undefined) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	if (!req.user) {
		res.status(401);
		throw new Error("User does not found. Please Login.");
	}

	const mission = await Mission.create({
		title,
		description,
		status,
		user: req.user.id,
	});

	res.status(201).json(mission);
});

const updateMission = asyncHandler(async (req, res) => {
	console.log("Server Update ID: ", req.params.id);
	console.log("Server Update Data: ", req.body);

	const { title, description, status } = req.body;

	if (!title || !description || status === undefined) {
		res.status(400);
		throw new Error("Please add all fields");
	}

	if (!req.user) {
		res.status(401);
		throw new Error("User does not found. Please Login.");
	}

	const mission = await Mission.findById(req.params.id);

	if (!mission) {
		res.status(400);
		throw new Error("Mission does not found");
	}

	if (mission.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error("User does not authorized");
	}

	const updatedMission = await Mission.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);

	res.status(200).json(updatedMission);
});

const deleteMission = asyncHandler(async (req, res) => {
	console.log("Server Update ID: ", req.params.id);

	if (!req.user) {
		res.status(401);
		throw new Error("User does not found. Please Login.");
	}

	const mission = await Mission.findById(req.params.id);

	if (!mission) {
		res.status(400);
		throw new Error("Mission does not found");
	}

	if (mission.user.toString() !== req.user._id.toString()) {
		res.status(401);
		throw new Error("User does not authorized");
	}

	// Delete all surveys for this mission
	const survays = await Survay.find({ mission: mission._id });
	if (survays.length > 0) {
		const deleteAllSurvays = await Survay.deleteMany({ mission: mission._id });
		console.log("DeleteAllSurvays: ", deleteAllSurvays);
	}

	const deletedMission = await Mission.findOneAndDelete({ _id: req.params.id });
	console.log("DeletedGoal: ", deletedMission);

	res.status(200).json({ id: req.params.id });
});

module.exports = {
	getAllOpenMissions,
	getAllCloseMissions,
	getMission,
	setMission,
	updateMission,
	deleteMission,
};
