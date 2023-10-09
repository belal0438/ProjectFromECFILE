const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/User_managment_system");

const express = require("express");
const app = express();

const UserRoute = require("./routes/UserRoute");
const LoginRoute = require("./routes/loginRoute");
const AdminRoute = require("./routes/adminRoute");

app.use("/", UserRoute);
app.use("/", LoginRoute);
app.use("/admin", AdminRoute);

app.listen(4000, () => {
  console.log("Server is running...");
});
