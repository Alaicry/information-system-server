import { User } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
	async signUp(req, res) {
		try {
			const { email, password, role } = req.body;
			if (!email || !password) {
				return res.status(404).json({
					message: "Некорректный адрес электронной почты или пароль",
				});
			}
			const candidate = await User.findOne({ where: { email } });
			if (candidate) {
				return res
					.status(404)
					.json({ message: "Пользователь с таким email уже существует" });
			}
			const hashPassword = await bcrypt.hash(password, 5);
			const userData = await User.create({
				email,
				role,
				password: hashPassword,
			});
			const token = jwt.sign(
				{ id: userData.id, email, role },
				process.env.SECRET_KEY,
				{
					expiresIn: "24h",
				}
			);

			return res.json({ ...userData, token });
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: "Не удалось зарегистрироваться",
			});
		}
	}

	async signIn(req, res) {}
	async checkAuth(req, res) {}
}

export default new AuthController();
