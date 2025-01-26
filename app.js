const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const config = require('./config/config');
const sequelize = require('./config/db');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, './public')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes/index.routes'));
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

setupDB();
app.listen(
	config.PORT,
	() => console.log(`Server is running, go to http://localhost:${ config.PORT }`)
);