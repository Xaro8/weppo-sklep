require('dotenv').config();

module.exports = {
	PORT: process.env.port || 8000,
	COOKIE_SECRET: process.env.COOKIE_SECRET || 'default_secret',
	DB_HOST: process.env.DB_HOST || 'localhost',
	DB_PORT: process.env.DB_PORT || 5432,
	DB_NAME: process.env.DB_NAME || 'database',
	DB_USERNAME: process.env.DB_USERNAME || 'username',
	DB_PASSWORD: process.env.DB_PASSWORD || 'password',
};