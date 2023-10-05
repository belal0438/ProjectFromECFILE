const express = require("express");
const bodyParser = require("body-parser");
const user_route = express();
// const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/userImages"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

user_route.set("view engine", "ejs");
user_route.set("views", "./views/users");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

const UserController = require("../controllers/UserController");

user_route.get("/register", UserController.loadRegister);
user_route.post("/register", upload.single("image"), UserController.InsertUser);
user_route.get("/verify", UserController.verfyMail);
module.exports = user_route;
