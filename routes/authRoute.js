const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  updatePassword,
  protect,
} = require("../controller/authController.js");

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/updatepassword").post(protect, updatePassword);
module.exports = router;
