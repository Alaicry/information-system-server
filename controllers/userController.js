import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import generateJwt from "../utils/generateJwt.js";

class UserController {
	async signUp(req, res) {
		try {
			if (!req.body.email || !req.body.password) {
				return res.status(404).json({
					message: "Некорректный адрес электронной почты или пароль",
				});
			}

			const candidate = await User.findOne({
				where: { email: req.body.email },
			});

			if (candidate) {
				return res
					.status(404)
					.json({ message: "Пользователь с таким email уже существует" });
			}

			const hashPassword = await bcrypt.hash(req.body.password, 5);

			const user = await User.create({
				email: req.body.email,
				role: req.body.role,
				password: hashPassword,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
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
			return res.status(500).json({
				message: "Не удалось зарегистрироваться",
			});
		}
	}

	async signIn(req, res) {
		try {
			const user = await User.findOne({ where: { email: req.body.email } });
			if (!user) {
				return res.status(404).json({
					message: "Пользователь не найден",
				});
			}

			const isValidPass = bcrypt.compare(req.body.password, user.password);
			if (!isValidPass) {
				return res.status(400).json({
					message: "Неверный логин и пароль",
				});
			}

			const token = generateJwt(
				user.id,
				user.email,
				user.role,
				user.firstName,
				user.lastName
			);
			return res.json({
				token,
			});
		} catch (err) {
			return res.status(500).json({
				message: "Не удалось авторизоваться",
			});
		}
	}

	async checkAuth(req, res) {
		try {
			const token = generateJwt(
				req.user.id,
				req.user.email,
				req.user.role,
				req.user.firstName,
				req.user.lastName
			);
			return res.json({ token });
		} catch (err) {
			return res.status(500).json({
				message: "Нет доступа",
			});
		}
	}

	async getAll(req, res) {
		try {
			const allUsers = await User.findAll();
			const users = allUsers.map((user) => {
				return {
					id: user.id,
					email: user.email,
					role: user.role,
					firstName: user.firstName,
					lastName: user.lastName,
					createdAt: user.createdAt,
					updatedAt: user.updatedAt,
				};
			});
			return res.json({ users });
		} catch (err) {
			return res
				.status(500)
				.json({ message: "Не удалось найти список пользователей" });
		}
	}

	async getOne(req, res) {
		try {
			const user = await User.findOne({ where: { id: req.params.id } });
			if (!user) {
				return res
					.status(404)
					.json({ message: "Данный пользователь не найден" });
			}
			return res.json(user);
		} catch (err) {
			return res
				.status(500)
				.json({ message: "Не удалось найти данного пользователя" });
		}
	}
}

export default new UserController();
