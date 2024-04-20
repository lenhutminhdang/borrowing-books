const express = require("express");
const books = require("../controllers/book.controller");
const router = express.Router();

router.route("/").get(books.findAll).post(books.create);

router
  .route("/:id")
  .get(books.findOneFullInfo)
  .put(books.update)
  .delete(books.delete);

module.exports = router;
