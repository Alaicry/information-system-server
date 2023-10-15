import { User } from "../models/models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateJwt = (id, email, role) => {
	return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
		expiresIn: "24h",
	});
};

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
			const user = await User.create({
				email,
				role,
				password: hashPassword,
			});
			const token = generateJwt(user.id, user.email, user.role);

			return res.json({ ...userData, token });
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: "Не удалось зарегистрироваться",
			});
		}
	}

	async signIn(req, res) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ where: { email } });

			if (!user) {
				return res.status(404).json({
					message: "Пользователь не найден",
				});
			}

			const isValidPass = bcrypt.compare(password, user.password);

			if (!isValidPass) {
				return res.status(400).json({
					message: "Неверный логин и пароль",
				});
			}

			const token = generateJwt(user.id, user.email, user.role);
			const { ...userData } = user;
			res.json({
				...userData,
				token,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: "Не удалось авторизоваться",
			});
		}
	}
	async checkAuth(req, res) {}
}

export default new AuthController();
