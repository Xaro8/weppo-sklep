const http = require("http");
const path = require('path');
const express = require("express");
const cookieParser = require("cookie-parser");
const config = require('./config/config');

const auth = require("./routes/auth");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(config.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, './public')));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use('/auth', auth);


app.use((req, res, next) => {
		res.render('404.ejs', {
				url: req.url
		});
});


app.listen(
	config.PORT,
	() => console.log(`Server is running, go to http://localhost:${ config.PORT }`)
)

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