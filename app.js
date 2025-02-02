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
app.use(express.static(path.join(__dirname, 'public')));
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
		await sequelize.sync({ force: true });
	} catch (err) {
		console.log('Unable to connect:', err);
	}
};

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

const { v4: uuidv4 } = require('uuid'); 
const Product = require('./models/Product');

async function addInitPoducts() {
	await Product.create({
		name: 'Ducky One 2 Mini Pro',
		price: 404.00,
		description: `The Ducky One 2 Mini Pro takes the classic form of the One 2 and upgrades it with Ducky's Quack Mechanics. V2 stabilizers provide improved stability, feel, and sound.`,
		imagePath: '/images/13821-4J8X5-Ducky-One-2-Mini-Pro-Classic.webp'
	});

	await Product.create({
		name: 'Keychron Q6 Max',
		price: 1120.00,
		description: `Aluminum CNC machined case\nConnect 3 ways- wired with USB-C cable, Bluetooth 5.1, and 2.4 GHz\nDouble gasket design with PC plate\nHotswap sockets that support both 3-pin or 5-pin switches`,
		imagePath: '/images/18305-9HNJ1-Keychron-Q6-Max.webp'
	})
};

(async() => {
	await setupDB();
	await addAdmin();
	await addInitPoducts();
	
	app.listen(
		config.PORT,
		() => console.log(`Server is running, go to http://localhost:${ config.PORT }`)
	);
})();