const express = require('express');
const User = require('../models/user');
const router = express.Router();


router.post('/register', async (req, res) => {
	const { username, password } = req.body;

	try {
		if (await User.findByUsername(username)) {
			return res.render('register', { message: 'Username already exists.' });
		}

		const newUser = await User.create(username, password);
		res.cookie('user', newUser.username, { signed: true });
		res.redirect('/');
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

router.post('/login', async (req, res) => {
	const {username, password} = req.body;

	try {
		const user = await User.verifyPassword(username, password);
		if (!user) {
			return res.render('login', { message: 'Invalid username or password.' });
		}

		res.cookie('user', user.username, { signed: true });
		res.redirect('/');
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

router.get('/logout', (req, res) => {
	res.cookie('user', '', { maxAge: -1 });
	res.redirect('/');
});

module.exports = router;
