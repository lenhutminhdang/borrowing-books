const express = require("express");
const genres = require("../controllers/genre.controller");
const router = express.Router();

router.route("/").get(genres.findAll);
router.route("/:alt").get(genres.findOne);

module.exports = router;
