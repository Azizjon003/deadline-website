const express = require("express");
const router = express.Router();

const auth = require("../controller/authController");
router.route("/").get(auth.protect, auth.role(["admin"]), auth.deadlinecheck);
router
  .route("/:id")
  .get(auth.protect, auth.role(["admin"]), auth.adminDeadlinedownload)
  .post(auth.protect, auth.role(["admin"]), auth.deadlineConfirm);

module.exports = router;
