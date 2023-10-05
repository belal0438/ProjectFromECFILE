const { ObjectId } = require("mongodb");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const loginLoad = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    console.log(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("eamil>>>>>", email, "passs>>>>", password);
    const userData = await User.findOne({ email: email });
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (passwordMatch) {
        if (userData.is_varified === 0) {
          res.render("login", { message: "Please verify your mail." });
        } else {
          req.session.user_id = userData._id.toString;
          res.redirect("/home");
        }
      } else {
        res.render("login", { message: "Email and password is incorrect" });
      }
    } else {
      res.render("login", { message: "Email and password is incorrect" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const loadHome = async (req, res) => {
  try {
    res.render("home");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loginLoad,
  verifyLogin,
  loadHome,
};
