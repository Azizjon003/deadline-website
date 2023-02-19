const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  update,
  deleteOne,
} = require("../controller/UserController.js");
router.route("/").get(getAll);
router.route("/:id").get(getOne).patch(update).delete(deleteOne);

module.exports = router;
