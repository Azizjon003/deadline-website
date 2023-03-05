const express = require("express");
const router = express.Router();
const cource = require("../controller/courceController");

router.route("/").get(cource.getAll);

module.exports = router;
