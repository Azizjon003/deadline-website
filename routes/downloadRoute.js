const express = require("express");
const router = express.Router();

const downloadController = require("../controller/downloadController");
const auth = require("../controller/authController");

router
  .route("/:id")
  .get(auth.protect, auth.cashCheck, downloadController.getOne);

module.exports = router;
