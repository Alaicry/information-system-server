import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors());
// app.use(router)

app.listen(PORT, () => {
	try {
		console.log(`Server started on ${PORT}`);
	} catch (err) {
		console.error(err);
	}
});

mongoose
	.connect(process.env.DATABASE)
	.then(() => console.log("Database connected"))
	.catch((err) => console.error(err));
