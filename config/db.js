const config = require('./config');

const { Pool } = require('pg');

const pool = new Pool({
	connectionString: config.DATABASE_URL
});

module.exports = pool