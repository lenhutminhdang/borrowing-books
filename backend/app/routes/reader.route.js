const express = require("express");

const readers = require("../controllers/reader.controller");

const router = express.Router();

router.route("/").get(readers.findAll);

router.route("/signup").post(readers.signup);
router.route("/login").post(readers.login);
router.route("/profile").get(readers.getProfile);
router.route("/logout").get(readers.logout);

router
  .route("/favorites")
  .get(readers.findAllFavorite)
  .post(readers.addToFavorite);

router.route("/favorites/:bookId").patch(readers.removeFromFavorite);

router
  .route("/:id")
  .get(readers.findOne)
  .put(readers.update)
  .delete(readers.delete);

module.exports = router;
