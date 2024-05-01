const express = require("express");
const books = require("../controllers/book.controller");
const router = express.Router();

router.route("/").get(books.findAll).post(books.create);

router.route("/search").get(books.findByNameAndAuthor);

router.route("/genres").get(books.findByGenre);

router.route("/collection/:id").get(books.findManySameCollection);

router
  .route("/:id")
  .get(books.findOneFullInfo)
  .put(books.update)
  .delete(books.delete);

module.exports = router;
