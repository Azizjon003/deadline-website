const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  update,
  deleteOne,
} = require("../controller/UserController.js");
const auth = require("../controller/authController");
router.route("/").get(getAll);
router
  .route("/:id")
  .get(auth.protect, auth.role(["admin"]), getOne)
  .patch(auth.protect, auth.role(["admin"]), update)
  .delete(auth.protect, auth.role(["admin"]), deleteOne);

module.exports = router;
