require('dotenv').config();

module.exports = {
	PORT: process.env.port || 3000,
	COOKIE_SECRET: process.env.COOKIE_SECRET || 'default_secret',
	DATABASE_URL: process.env.DATABASE_URL || 'postgres://user:password@localhost:5432/shop-database'
};