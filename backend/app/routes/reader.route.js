const express = require("express");

const readers = require("../controllers/reader.controller");

const router = express.Router();

router.route("/").get(readers.findAll).post(readers.create);
// .delete(readers.deleteAll);
// router.route("/favorites").get(readers.findAllFavorite);

router
  .route("/:id")
  .get(readers.findOne)
  .put(readers.update)
  .delete(readers.delete);

// Favorites
router
  .route("/favorites")
  .get(readers.findAllFavorite)
  .post(readers.addToFavorite);

router.route("/favorites/:id").delete(readers.removeFromFavorite);

module.exports = router;
