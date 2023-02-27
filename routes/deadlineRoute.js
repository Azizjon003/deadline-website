const express = require("express");
const router = express.Router();
const deadline = require("../controller/deadline");

router.route("/").get(deadline.getAll).post(deadline.create);
router.route("/:id").get(deadline.getOne).patch(deadline.update);

module.exports = router;
