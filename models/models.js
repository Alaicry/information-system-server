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
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Type = sequelize.define("type", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
});

const Brand = sequelize.define("brand", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
	},
});

const Device = sequelize.define("device", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	model: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	number: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	act: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
	},
});

Type.hasMany(Device);
Device.belongsTo(Type);

Brand.hasMany(Device);
Device.belongsTo(Brand);

User.hasMany(Device);
Device.belongsTo(User);

export { User, Type };
