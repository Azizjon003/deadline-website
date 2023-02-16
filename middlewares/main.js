const express = require("express");
const User = require("../model/user");
const app = express();

app.use("/api", async (req, res, next) => {
  console.log("This is the first middleware");
  await User.create({
    name: "John",
    lastname: "Doe",
    faculty_id: "123456789",
    balance: 100,
    cource: "1",
  });
  res.send("This is the first middleware");
});

module.exports = app;
