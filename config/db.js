const { Sequelize } = require('sequelize');

const config = require('./config');

const sequelize = new Sequelize({
	dialect: 'postgres',
	host: config.DB_HOST,
	port: config.DB_PORT,
	database: config.DB_NAME,
	username: config.DB_USERNAME,
	password: config.DB_PASSWORD,
});

module.exports = sequelize;