import { DeviceType } from "../models/index.js";

class TypeController {
	async create(req, res) {
		try {
			if (!req.body.name) {
				return res.status(404).json({
					message: "Некорректный тип устройства",
				});
			}
			const foundType = await DeviceType.findOne({
				where: { name: req.body.name },
			});

			if (foundType) {
				return res.status(404).json({
					message: "Данный тип устройства уже существует",
				});
			}
			const type = await DeviceType.create({
				name: req.body.name,
			});
			return res.json({ type });
		} catch (err) {
			return res.status(500).json({
				message: "Не удалось добавить тип устройства",
			});
		}
	}

	async update(req, res) {
		try {
			if (!req.body.name) {
				return res
					.status(404)
					.json({ message: "Введите наименование типа устройства" });
			}
			await DeviceType.update(
				{ name: req.body.name },
				{ where: { id: req.params.id } }
			);
			return res.json({ message: "Успешно" });
		} catch (err) {
			return res
				.status(500)
				.json({ message: "Не удалось обновить тип устройства" });
		}
	}

	async getAll(req, res) {
		try {
			const types = await DeviceType.findAll();
			return res.json(types);
		} catch (err) {
			return res.status(500).json({
				message: "Не удалось найти типы устройств",
			});
		}
	}
	async getOne(req, res) {
		try {
			const type = await DeviceType.findOne({ where: { id: req.params.id } });
			if (!type) {
				return res
					.status(404)
					.json({ message: "Не удалось найти искомый тип устройства" });
			}
			return res.json(type);
		} catch (err) {
			return res.status(500).json({
				message: "Не удалось найти типы устройств",
			});
		}
	}
	
	async delete(req, res) {
		try {
			const deviceType = await DeviceType.findOne({
				where: { id: req.params.id },
			});
			if (!deviceType) {
				return res
					.status(404)
					.json({ message: "Не удалось удалить тип устройства" });
			}
			await DeviceType.destroy({ where: { id: req.params.id } });
			return res.json({ message: "Успешно" });
		} catch (err) {
			return res
				.status(500)
				.json({ message: "Не удалось удалить тип устройства" });
		}
	}
}

export default new TypeController();
