const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fileUpload = require('express-fileupload');

const config = require('./config/config');
const sequelize = require('./config/db');

const app = express();

require('./models/associations');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, './public')));
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(async (req, res, next) => {
	const userId  = req.signedCookies.userId;
	const user = await User.findByPk(userId);

	res.locals.logged =  user ? true : false;
	if (user) {
		res.locals.isAdmin = user.isAdmin ? true : false;
	}
	next();
});

app.use('/', require('./routes/index.routes'));
app.use('/', require('./routes/admin.routes'));
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/cart.routes'));
app.use('/', require('./routes/product.routes'));
app.use('/', require('./routes/user.routes'));

app.use((req, res, next) => {
	res.render('404.ejs', {
		url: req.url
	});
});

async function setupDB() {
	console.log('In setupDB\n');
	try {
		await sequelize.authenticate();
		await sequelize.sync({alter : true});
	} catch (err) {
		console.log('Unable to connect:', err);
	}
}

const bcrypt = require('bcrypt');
const User = require('./models/User');

async function addAdmin() {
	const username = 'admin';
	const email = 'admin@weppo.org';
	const password = 'admin';

	try {
		if (await User.findOne({ where: { username: username }})) {
			console.log('Admin already exists');
			return;
		}

		await User.create({
			username: username,
			email: email,
			passwordHash: await bcrypt.hash(password, 10),
			isAdmin: true
		});

		console.log('Admin user created');

	} catch (err) {
		console.log('Unable to create admin: ', err);
	}
};

async function removeUser(username) {
	try {
		if (await User.findOne({ where: { username: username }})) {
			console.log('User found');
			await User.destroy({where: {username: username}})
			return;
		}
		else {

			console.log("User not found")
		}

	} catch (err) {
		console.log('Unable to delete user: ', err);
	}
};

setupDB();
addAdmin();

app.listen(
	config.PORT,
	() => console.log(`Server is running, go to http://localhost:${ config.PORT }`)
);