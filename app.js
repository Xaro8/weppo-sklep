var http = require("http");
const path = require('path');
var express = require("express");
var cookieParser = require("cookie-parser");
var authorize =  require("./routes/authorize")

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("40a4321994a085d28587afd2621efd7be9e91922654792c763d2e8ef391a15e6"));

app.use(express.static(path.join(__dirname, './public')));


app.set("view engine", "ejs");
app.set("views", "./views");

// wymaga logowania dlatego strażnik – middleware „authorize”
app.get("/", authorize, (req, res) => {
  res.render("app", { user: req.user });
});

const products = [
  {
    id: 1,
    name: "Gaming Laptop",
    description: "High-performance laptop with NVIDIA GeForce RTX, Intel i9, and 16GB RAM.",
    price: 1999.99,
    image: "/images/potatoes-scaled.jpg"
  },
  {
    id: 2,
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones with long battery life.",
    price: 299.99,
    image: "/images/potatoes-scaled.jpg"
  },
  {
    id: 3,
    name: "Smartphone",
    description: "Latest model smartphone with stunning OLED display and 5G support.",
    price: 999.99,
    image: "/images/potatoes-scaled.jpg"
  }
];

app.get("/product/:id",(req,res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === productId);
  
  if (product) {
    res.render("product", { product }); 
  } else {
    res.status(404).render("404", { url: req.url }); 
  }
}
)
app.get("/logout", authorize, (req, res) => {
  res.cookie("user", "", { maxAge: -1 });
  res.redirect("/");
});

// strona logowania
app.get("/login", (req, res) => {
  res.render("login");
});


app.post("/login", (req, res) => {
  var username = req.body.txtUser;
  var pwd = req.body.txtPwd;
  if (username == pwd) {
    // wydanie ciastka
    res.cookie("user", username, { signed: true });
    // przekierowanie
    var returnUrl = req.query.returnUrl;
    res.redirect(returnUrl);
  } else {
    res.render("login", { message: "Zła nazwa logowania lub hasło" });
  }
  
});

app.use((req, res, next) => {
    res.render('404.ejs', {
        url: req.url
    });
});
http.createServer(app).listen(3000);
console.log("serwer działa, nawiguj do http://localhost:3000");
