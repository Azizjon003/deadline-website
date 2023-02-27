const express = require("express");
const User = require("../model/user");
const app = express();
const errorHandler = require("../controller/errorHandler");
const AppError = require("../utility/appError");
const cookie = require("cookie-parser");
app.use(cookie());
app.use(express.json());
app.use("/api/v1/users", require("../routes/userRoute"));
app.use("/api/v1/auth", require("../routes/authRoute"));
app.use("/api/v1/upload", require("../routes/uploadRoute"));
app.use("/api/v1/deadline", require("../routes/deadlineRoute"));
app.all("*", (req, res, next) => {
  next(new AppError("Not found", 404));
});

app.use(errorHandler);
module.exports = app;
