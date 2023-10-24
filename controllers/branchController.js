import { Branch } from "../models/index.js";

class BranchController {
	async create(req, res) {
		try {
			if (!req.body.name) {
				return res
					.status(404)
					.json({ message: "Некорректное название филиала" });
			}
			const foundBranch = await Branch.findOne({
				where: { name: req.body.name },
			});

			if (foundBranch) {
				return res
					.status(404)
					.json({ message: "Данный филиал уже существует" });
			}
			const branch = await Branch.create({ name: req.body.name });
			return res.json({ branch });
		} catch (err) {
			return res.status(500).json({ message: "Не удалось добавить филиал" });
		}
	}

	async update(req, res) {
		try {
			if (!req.body.name) {
				return res
					.status(404)
					.json({ message: "Введите наименование филиала" });
			}
			await Branch.update(
				{ name: req.body.name },
				{ where: { id: req.params.id } }
			);
			return res.json({
				message: "Успешно",
			});
		} catch (err) {
			console.log(err);
			return res
				.status(500)
				.json({ message: "Не удалось обновить наименование филиала" });
		}
	}

	async delete(req, res) {
		try {
			const branch = await Branch.findOne({ where: { id: req.params.id } });
			if (!branch) {
				return res
					.status(404)
					.json({ message: "Не удалось удалить данный филиал" });
			}
			await Branch.destroy({ where: { id: req.params.id } });
			return res.json({ message: "Успешно" });
		} catch (err) {
			return res
				.status(500)
				.json({ message: "Не удалось удалить данный филиал" });
		}
	}

	async getAll(req, res) {
		try {
			const branches = await Branch.findAll();
			return res.json(branches);
		} catch (err) {
			return res.status(500).json({ message: "Не удалось найти филиалы" });
		}
	}

	async getOne(req, res) {
		try {
			const branch = await Branch.findOne({ where: { id: req.params.id } });
			if (!branch) {
				return res
					.status(404)
					.json({ message: "Не удалось найти искомый филиал" });
			}
			return res.json(branch);
		} catch (err) {
			return res.status(500).json({
				message: "Не удалось найти искомый филиал",
			});
		}
	}
}

export default new BranchController();
