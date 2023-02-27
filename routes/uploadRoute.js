const express = require("express");
const router = express.Router();
const controller = require("../controller/uploadController.js");
const {
  signUp,
  login,
  updatePassword,
  protect,
  updateMe,
  deleteUser,
  logout,
} = require("../controller/authController.js");
router.route("/").post(protect, controller.upload);

module.exports = router;
