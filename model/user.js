const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const fs = require("fs");
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
    default: 0,
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
  },
  role: {
    type: String,
    enum: ["admin", "user", "my-friend"],
    default: "user",
  },
});

userSchema.pre("updateOne", async function (next) {
  console.log("Update");
  console.log(this._update);
  if (!this._update?.password) return next();
  const hashPass = await bcrypt.hash(this._update.password, 12);
  this._update.password = hashPass;
  this._update.passwordConfirm = undefined;
  this._update.passwordChangedAt = Date.now();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hashPass = await bcrypt.hash(this.password, 12);
  this.password = hashPass;
  this.passwordConfirm = undefined;
});
userSchema.methods.correctPassword = async function (password, hashPass) {
  return await bcrypt.compare(password, hashPass);
};
const User = mongoose.model("Users", userSchema);

User.aggregate([
  {
    $lookup: {
      from: "faculties",
      localField: "faculty_id",
      foreignField: "_id",
      as: "faculties",
    },
  },
]);
module.exports = User;
