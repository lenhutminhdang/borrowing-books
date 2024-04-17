const express = require("express");
const borrowingHistory = require("../controllers/borrowing-history.controller");
const router = express.Router();

router.route("/").get(borrowingHistory.findAll).post(borrowingHistory.create);

router
  .route("/:id")
  .get(borrowingHistory.findOne)
  .put(borrowingHistory.update)
  .delete(borrowingHistory.delete);

module.exports = router;
