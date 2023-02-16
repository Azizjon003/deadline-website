const express = require("express");
const User = require("../model/user");
const app = express();

app.use("/api/v1/users", require("../routes/userRoute"));

module.exports = app;
