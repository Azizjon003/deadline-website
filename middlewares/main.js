const express = require("express");
const User = require("../model/user");
const app = express();
const errorHandler = require("../controller/errorHandler");
const AppError = require("../utility/appError");

app.use(express.json());
app.use("/api/v1/users", require("../routes/userRoute"));
app.use("/api/v1/auth", require("../routes/authRoute"));

app.all("*", (req, res, next) => {
  next(new AppError("Not found", 404));
});

app.use(errorHandler);
module.exports = app;
