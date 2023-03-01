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
 * tags:
 *  name: Auth
 *  description: The user books managing API
 * /api/v1/auth/signup:
 *  post:
 *   summary: Create a new user
 *   responses:
 *    200:
 *     description: The user was successfully created
 *     content:
 *      application/json:
 *       schema:
 *        items:
 *         $ref: '#/components/schemas/User'
 *    500:
 *     description: Some server error
 * /api/v1/auth/login:
 *  post:
 *   summary: login user and get token
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         description: The email of the user
 *        password:
 *         type: string
 *         description: The password of the user
 *
 *   responses:
 *    200:
 *     description: The user was successfully loggin in
 *     content:
 *      application/json:
 *       schema:
 *        properties:
 *         token:
 *          type: string
 *          description: The token of the user
 *         status:
 *          type: string
 *          description: the status
 *    500:
 *     description: Some server error
 * /api/v1/auth/updatepassword:
 *  post:
 *    summary: update password
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *           password:
 *            type: string
 *            description: The password of the user
 *           passwordConfirm:
 *            type: string
 *            description: The passwordConfirm of the user
 *           passwordCurrent:
 *            type: string
 *            description: The passwordCurrent of the user
 *    responses:
 *    200:
 *     description: The user was successfully updated password
 *     content:
 *      application/json:
 *       schema:
 *        items:
 *        $ref: '#/components/schemas/User'
 *    500:
 *     description: Some server error
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *        - name
 *        - lastname
 *        - faculty_id
 *        - cource
 *        - email
 *        - password
 *        - passwordConfirm
 *       properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user
 *        name:
 *         type: string
 *         description: The name of the user
 *        lastname:
 *         type: string
 *         description: The lastname of the user
 *        faculty_id:
 *         type: string
 *         faculty_id: The faculty_id of the user
 *        balance:
 *         type: number
 *         description: The balance of the user
 *        cource:
 *          type: string
 *          description: The cource of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *        password:
 *          type: string
 *          description: The password of the user
 *        passwordConfirm:
 *          type: string
 *          description: The passwordConfirm of the user
 */
