import { validationResult } from "express-validator";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
	async signUp(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array());
			}

			const password = req.body.password;
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			const doc = new UserModel({
				fullName: req.body.fullName,
				email: req.body.email,
				passwordHash: hash,
			});

			const user = await doc.save();

			const token = jwt.sign(
				{
					_id: user._id,
				},
				"secretUserId",
				{ expiresIn: "30d" }
			);

			const { passwordHash, ...userData } = user._doc;

			res.json({
				...userData,
				token: token,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: "Не удалось авторизоваться",
			});
		}
	}
}

export default new AuthController();
