const express = require("express");
const router = express.Router();
const deadline = require("../controller/deadline");
const auth = require("../controller/authController");
router.route("/").get(deadline.getAll).post(auth.protect, deadline.create);
router
  .route("/:id")
  .get(auth.protect, deadline.getOne)
  .patch(auth.protect, deadline.update);

router.route("/course/:course").get(deadline.getCourse);
module.exports = router;
