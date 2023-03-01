const express = require("express");
const router = express.Router();
const searching = require("../controller/searchController");
router.route("/").get(searching.searching);

// Path: routes/userRoute.js
module.exports = router;
