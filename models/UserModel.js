const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[A-Za-z0-9+_.-]+@(.+)$/.test(value);
      },
      message: "Invalid email address format",
    },
  },

  mobile: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[6-9]\d{9}$/.test(value);
      },
      message: "Invalid mobile number format",
    },
  },

  Image: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  is_amin: {
    type: Number,
    require: true,
  },
  is_varified: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
