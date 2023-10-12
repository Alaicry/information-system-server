import sequelize from "../db.js";
import { DataTypes } from "sequelize";

const User = sequelize.define("user", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
	},
	role: { type: DataTypes.STRING, defaultValue: "USER" },
});

export { User };
