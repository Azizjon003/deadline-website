const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  faculty_id: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  cource: {
    type: String,
    enum: ["1", "2", "3", "4"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: [10, "email must be at least 10 characters"],
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isEmail(v);
      },
      message: "Email is not valid",
    },
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value);
      },
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password confirm is required"],
    validate: {
      validator: function (value) {
        return this.password === value;
      },
      message: "password and password confirm must be the same",
    },
  },
  passwordChangedAt: Date,
  hashToken: String,
  expiresDate: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "user", "my-friend"],
    default: "user",
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
