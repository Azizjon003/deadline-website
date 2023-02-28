const express = require("express");
const auth = require("../controller/authController");
const path = require("path");
const cors = require("cors");
const app = express();
const errorHandler = require("../controller/errorHandler");
const AppError = require("../utility/appError");
const cookie = require("cookie-parser");
app.use(cors("*"));
app.use(cookie());
app.use(express.json());
app.use(
  // auth.protect,
  express.static(path.join(__dirname, "../public/uploads"))
);

app.use("/api/v1/users", require("../routes/userRoute"));
app.use("/api/v1/auth", require("../routes/authRoute"));
app.use("/api/v1/upload", require("../routes/uploadRoute"));
app.use("/api/v1/deadline", require("../routes/deadlineRoute"));
app.use("/api/v1/download", require("../routes/downloadRoute"));
app.use("/api/v1/deadlinecheck", require("../routes/deadlinecheck"));
app.all("*", (req, res, next) => {
  next(new AppError("Not found", 404));
});

app.use(errorHandler);
module.exports = app;
