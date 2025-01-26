const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const fileUpload = require('express-fileupload');

const config = require('./config/config');
const sequelize = require('./config/db');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, './public')));
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes/index.routes'));
app.use('/', require('./routes/admin.routes'));
app.use('/', require('./routes/auth.routes'));
app.use('/', require('./routes/cart.routes'));
app.use('/', require('./routes/product.routes'));

app.use((req, res, next) => {
	res.render('404.ejs', {
		url: req.url
	});
});

async function setupDB() {
	try {
		await sequelize.authenticate();
		await sequelize.sync({ force: false });
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

setupDB();
addAdmin();
app.listen(
	config.PORT,
	() => console.log(`Server is running, go to http://localhost:${ config.PORT }`)
);