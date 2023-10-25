import { where } from "sequelize";
import { Device } from "../models/index.js";

class DeviceController {
	async create(req, res) {}
	async update(req, res) {}
	async delete(req, res) {}
	async getOne(req, res) {}
	async getAll(req, res) {
		try {
			const devices = await Device.findAll();
			return res.json({ devices });
		} catch (err) {
			return res.status(500).json({ message: "Не удалось найти устройства" });
		}
	}
	async getByType(req, res) {}
}
