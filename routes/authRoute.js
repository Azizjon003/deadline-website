const express = require("express");
const router = express.Router();
const {
  signUp,
  login,
  updatePassword,
  protect,
  updateme,
  deleteUser,
} = require("../controller/authController.js");

router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/updatepassword").post(protect, updatePassword);
router.route("/updateme").patch(protect, updateme);
router.route("/deleteuser").delete(protect, deleteUser);
module.exports = router;
