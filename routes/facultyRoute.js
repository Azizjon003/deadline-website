const express = require("express");
const router = express.Router();
const faculty = require("../controller/faculty");

router.route("/").get(faculty.getAll);

module.exports = router;
