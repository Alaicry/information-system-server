import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./db.js";
import router from "./routes/index.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		app.listen(PORT, () => console.log(`Server started at ${PORT}`));
	} catch (err) {
		console.log(err);
	}
};

start();
