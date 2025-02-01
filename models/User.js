const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		notEmpty: true
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
		isEmail: true,
	},
	passwordHash: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	isAdmin: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false
	}
});

User.prototype.comparePassword = async function (password) {
	return bcrypt.compare(password, this.passwordHash);
};

module.exports = User;