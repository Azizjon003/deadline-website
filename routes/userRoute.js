const express = require("express");
const router = express.Router();
const { getAll, getOne } = require("../controller/UserController.js");
router.route("/").get(getAll);
router.route("/:id").get(getOne);

module.exports = router;
