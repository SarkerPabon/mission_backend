const express = require("express");

const { setSurvay, getAllSurvays } = require("../controllers/survayController");

const router = express.Router();

router.get("/:id", getAllSurvays);
router.post("/", setSurvay);

module.exports = router;
