const mongoose = require("mongoose");

const survaySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		profession: {
			type: String,
			enum: ["teaching", "student", "programming", "other"],
			required: true,
		},
		rate: {
			type: String,
			enum: ["poor", "good", "excellent"],
			required: true,
		},
		review: {
			type: String,
			required: true,
		},
		// Reference to the user model
		mission: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Mission",
		},
	},
	{ timestamps: true }
);

const Survay = mongoose.model("Survay", survaySchema);

module.exports = Survay;
