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

const deadline = require("../controller/deadline");
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/updatepassword").post(protect, updatePassword);
router.route("/updateme").post(protect, updateMe);
router.route("/deleteuser").post(protect, deleteUser);
router.route("/logout").get(protect, logout);
router.route("/mydeadline").get(protect, deadline.myUploadDeadlines);
/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Returns a list of users
 *     description: Optional extended description in Markdown.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

module.exports = router;
