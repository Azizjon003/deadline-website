const express = require("express");
const app = express();

app.use("/api", (req, res, next) => {
  console.log("This is the first middleware");
  res.send("This is the first middleware");
});

module.exports = app;
