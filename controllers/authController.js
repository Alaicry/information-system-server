import { User } from "../models/models.js";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
import generateJwt from "../utils/generateJwt.js";

dotenv.config();



class AuthController {
	async signUp(req, res) {
		try {
			const { email, password, role, firstName, lastName } = req.body;
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
				firstName,
				lastName,
			});
			const token = generateJwt(
				user.id,
				user.email,
				user.role,
				user.firstName,
				user.lastName
			);

			return res.json({ token });
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

			res.json({
				token,
			});
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: "Не удалось авторизоваться",
			});
		}
	}
	async checkAuth(req, res) {
		try {
			const user = await User.findOne({ where: { id: req.user.id } });
			const { ...userData } = user;
			res.json(userData);
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: "Нет доступа",
			});
		}
	}
}

export default new AuthController();
