const { ObjectId } = require("mongodb");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const securePassword = async (password) => {
  try {
    const saltvalue = 10;
    const passwordHash = await bcrypt.hash(password, saltvalue);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

// for send mail;
const sendVerifyMail = async (name, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "ara62@ethereal.email",
        pass: "SGhrtyqkGjVz13C2d7",
      },
    });

    const mailOptions = {
      from: "ara62@ethereal.email",
      to: email,
      subject: "For varification mail",
      html:
        "<p> Hi " +
        name +
        ', please click here to <a href="http://127.0.0.1:4000/verify?id=' +
        user_id +
        '"> verify </a> your mail </p>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent:-", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const loadRegister = async (req, res) => {
  try {
    res.render("registration.ejs");
  } catch (error) {
    console.log(error.message);
  }
};

const InsertUser = async (req, res) => {
  try {
    const spassword = await securePassword(req.body.password);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mno,
      Image: req.file.filename,
      password: spassword,
      is_amin: 0,
    });

    const userData = await user.save();

    if (userData) {
      // console.log("userData._id>>>>>>>", userData._id);
      sendVerifyMail(req.body.name, req.body.email, userData._id.toString());
      res.render("registration", {
        message:
          "your registration has been successfull, Pleas verify your mail and phone number",
      });
    } else {
      res.render("registration", {
        message: "your registration has been failed...",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const verfyMail = async (req, res) => {
  try {
    const updateInfo = await User.updateOne(
      { _id: new ObjectId(`${req.query.id}`) },
      { $set: { is_varified: 1 } }
    );
    // console.log(updateInfo);
    res.render("email-verified");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadRegister,
  InsertUser,
  verfyMail,
};
