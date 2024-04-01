const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ message: "Hello  World" });
});

app.use("/api/users", require("./routes/userRoutes"));

app.use("/api/missions", require("./routes/missionRoutes"));

app.use("/api/survays", require("./routes/survayRoutes"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
