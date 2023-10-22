import sequelize from "../db.js";
import { DataTypes, Sequelize } from "sequelize";

const User = sequelize.define("users", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
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

const DeviceType = sequelize.define("device_type", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
});

const DeviceName = sequelize.define("device_name", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
	},
});

const Device = sequelize.define("devices", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	serialNumber: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
	},
});

const Branch = sequelize.define("branches", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

const Act = sequelize.define("acts", {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV4,
		primaryKey: true,
	},
	number: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
	},
});

User.hasMany(Device);
Device.belongsTo(User);

Branch.hasOne(Act);
Act.belongsTo(Branch);

DeviceType.hasMany(Device);
Device.belongsTo(DeviceType);

DeviceName.hasMany(Device);
Device.belongsTo(DeviceName);

Act.hasMany(Device);
Device.belongsTo(Act);

export { User, DeviceType, DeviceName, Device, Branch, Act };
