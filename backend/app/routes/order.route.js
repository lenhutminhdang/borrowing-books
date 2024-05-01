const express = require("express");
const orderController = require("../controllers/order.controller");
const router = express.Router();

router.route("/").get(orderController.findAll).post(orderController.create);

router.route("/reader").get(orderController.findAllOrdersInfoOfReader);

router
  .route("/:id")
  .get(orderController.findOne)
  .put(orderController.update)
  .patch(orderController.updateStatus)
  .delete(orderController.delete);

module.exports = router;
