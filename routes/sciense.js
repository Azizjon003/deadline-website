const express = require("express");
const router = express.Router();
const science = require("../controller/fanlar");

router.route("/").get(science.getAll);

module.exports = router;
