const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.registerUser = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ 
			where: { 
				[Op.or]: [
					{ username: username },
					{ email: email },
				]
			}
		});

		if (existingUser) {
			return res.render('register', { message: 'User with this username or email already exists.' });
		}

		const user = await User.create({
			username: username,
			email: email,
			passwordHash: await bcrypt.hash(password, 10)
		});

		res.cookie('userId', user.id, { signed: true });
		res.redirect('/');
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
};

exports.loginUser = async (req, res) => {
	const { username, password } = req.body;
	const returnUrl = req.query.returnUrl || '/';

	try {
		const user = await User.findOne({ where: { username: username } });

		if (!user || !await user.comparePassword(password)) {
			return res.render('login', { message: 'Invalid username or password.' });
		}

		res.cookie('userId', user.id, { signed: true });
		res.redirect(returnUrl);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
};

exports.logoutUser = async (req, res) => {
	res.clearCookie('userId');
	res.redirect('/');
};