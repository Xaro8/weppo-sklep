var http = require("http");
var express = require("express");
var cookieParser = require("cookie-parser");
var authorize =  require("./authorize")

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("40a4321994a085d28587afd2621efd7be9e91922654792c763d2e8ef391a15e6"));
app.set("view engine", "ejs");
app.set("views", "./views");

// wymaga logowania dlatego strażnik – middleware „authorize”
app.get("/", authorize, (req, res) => {
  res.render("app", { user: req.user });
});

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
http.createServer(app).listen(3000);
console.log("serwer działa, nawiguj do http://localhost:3000");
