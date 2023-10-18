import { Type } from "../models/models.js";

class TypeController {
	async create(req, res) {
		try {
			const { name } = req.body;
			if (!name) {
				return res.status(404).json({
					message: "Некорректный тип устройства",
				});
			}
			const foundType = await Type.findOne({ where: { name } });
			if (foundType) {
				return res.status(404).json({
					message: "Данный тип устройства уже существует",
				});
			}
			const type = await Type.create({
				name,
			});

			return res.json({ type });
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: "Не удалось добавить тип устройства",
			});
		}
	}
	async getAll(req, res) {
		try {
			const types = await Type.findAll();
			return res.json(types);
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: "Не удалось найти типы устройств",
			});
		}
	}
	async get(req, res) {
		try {
			const { id } = req.params;

			const type = await Type.findOne({ where: { id } });
			if (!type) {
				return res
					.status(404)
					.json({ message: "Не удалось найти искомый тип устройства" });
			}
			return res.json(type);
		} catch (err) {
			console.log(err);
			res.status(500).json({
				message: "Не удалось найти типы устройств",
			});
		}
	}
	async update(req, res) {
		try {
			const { id } = req.params;
			const { name } = req.body;

			await Type.update({ name }, { where: { id } });

			return res.json({ message: "Успешно" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Не удалось обновить тип устройства" });
		}
	}
	async delete(req, res) {
		try {
			const { id } = req.params;
			await Type.destroy({ where: { id } });
			return res.json({ message: "Успешно" });
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: "Не удалось удалить тип устройства" });
		}
	}
}

export default new TypeController();
