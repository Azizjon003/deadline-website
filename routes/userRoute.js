const express = require("express");
const router = express.Router();
const { getAll } = require("../controller/UserController.js");
router.route("/").get(getAll);

module.exports = router;
