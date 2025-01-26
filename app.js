const path = require('path');
const express = require("express");
const cookieParser = require('cookie-parser');

const config = require('./config/config');
const sequelize = require('./config/db');

const auth = require('./routes/auth.routes');
const isAuthenticated = require('./middlewares/auth.middleware');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, './public')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', auth);

app.get('/', isAuthenticated, (req, res) => {
	console.log("Getting into index");
	res.render('app', { user: req.signedCookies.user });
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.use((req, res, next) => {
		res.render('404.ejs', {
				url: req.url
		});
});

async function setupDB() {
	try {
		await sequelize.authenticate();
		console.log('Connection to DB established succcessfully.');

		await sequelize.sync({ force: false });
		console.log('Database synced successfully.');
	} catch (err) {
		console.log('Unable to connect:', err);
	}
}

setupDB();
app.listen(
	config.PORT,
	() => console.log(`Server is running, go to http://localhost:${ config.PORT }`)
);

/*
	Anonymous user:
		-> GET /products
		-> GET /products/:id
	
	Registering user:
		-> POST /register
		-> POST /login
	
	Shoping cart:
		-> POST /cart (adding items)
		-> GET /cart (getting items)
		-> DELETE /cart/:id remove an item
	
	Order:
		-> POST /orders
		-> GET /orders
	
	Administrator:
		-> /admin secure, only for admins
		-> POST /products (add product)
		-> PUT /products/:id (product update)
		-> DELETE /products/:id (delete product)

		-> GET /users (list registered users)
		-> DELETE /users/:id (delete user)
	
		-> GET /orders (lists all orders)
*/