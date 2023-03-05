const express = require("express");
const auth = require("../controller/authController");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const errorHandler = require("../controller/errorHandler");
const AppError = require("../utility/appError");
const cookie = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const options = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(morgan("dev"));
app.use(cors(options));
app.use(cookie());
app.use(express.json());
// app.use(
//   // auth.protect,
//   express.static(path.join(__dirname, "../public/uploads"))
// );

app.use("/api/v1/cource", require("../routes/courseRoute"));
app.use("/api/v1/sciences", require("../routes/sciense"));
app.use("/api/v1/faculties", require("../routes/facultyRoute"));
app.use("/api/v1/searching", require("../routes/searchingRoute"));
app.use("/api/v1/users", require("../routes/userRoute"));
app.use("/api/v1/auth", require("../routes/authRoute"));
app.use("/api/v1/upload", require("../routes/uploadRoute"));
app.use("/api/v1/deadline", require("../routes/deadlineRoute"));
app.use("/api/v1/download", require("../routes/downloadRoute"));
app.use("/api/v1/deadlinecheck", require("../routes/deadlinecheck"));
app.use(
  "/api-doc",
  swaggerUi.serve,
  swaggerUi.setup(require("../doc/swagger"))
);
app.all("*", (req, res, next) => {
  next(new AppError("Not found", 404));
});

app.use(errorHandler);
module.exports = app;
