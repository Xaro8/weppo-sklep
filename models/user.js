const bcrypt = require('bcrypt');
const pool = require('../config/db');

const User = {
	async create(username, password) {
			const passwordHash = await bcrypt.hash(password, 10);
			const result = await pool.query(
					'INSERT INTO users (username, password_hash, created_at) VALUES ($1, $2, NOW()) RETURNING id, username',
					[username, passwordHash]
			);

			return result.rows[0]
	},

	async findByUsername(username) {
		const result = await pool.query(
			'SELECT * FROM users WHERE username = $1',
			[username]
		);

		return result.rows[0];
	},

	async verifyPassword(username, password) {
		const user = await this.findByUsername(username);
		if (!user) {
				return false;
		}

		const isCorrect = await bcrypt.compare(password, user.password_hash);
		return isCorrect ? user : false;
	}
};

module.exports = User;