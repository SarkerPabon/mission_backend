const express = require("express");
const router = express.Router();

const {
	getAllOpenMissions,
	getAllCloseMissions,
	getMission,
	setMission,
	updateMission,
	deleteMission,
} = require("../controllers/missionController");

const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(getAllOpenMissions).post(protect, setMission);
router.route("/archive").get(getAllCloseMissions);

router
	.route("/:id")
	.get(getMission)
	.put(protect, updateMission)
	.delete(protect, deleteMission);

module.exports = router;
