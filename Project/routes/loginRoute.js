const express = require("express");
const bodyParser = require("body-parser");
const login_route = express();
const session = require("express-session");
const config = require("../config/config");
login_route.use(
  session({
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
  })
);
const auth = require("../middleware/auth");
login_route.set("view engine", "ejs");
login_route.set("views", "./views/users");
login_route.use(bodyParser.json());

login_route.use(bodyParser.urlencoded({ extended: true }));
const loginController = require("../controllers/loginController");

login_route.get("/", loginController.loginLoad);
login_route.get("/login", loginController.loginLoad);
login_route.post("/login", loginController.verifyLogin);
login_route.get("/home", loginController.loadHome);
module.exports = login_route;
