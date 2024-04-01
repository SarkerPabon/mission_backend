const mongoose = require("mongoose");

const missionSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: Boolean,
			required: true,
		},
		// Reference to the user model
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Mission = mongoose.model("Mission", missionSchema);

module.exports = Mission;
