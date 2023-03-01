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
module.exports = router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
