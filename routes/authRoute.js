const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  updatePassword,
  protect,
  updateMe,
  deleteUser,
  logout,
} = require("../controller/authController.js");

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/updatepassword").post(protect, updatePassword);
router.route("/updateme").post(protect, updateMe);
router.route("/deleteuser").post(protect, deleteUser);
router.route("/logout").get(protect, logout);
module.exports = router;
