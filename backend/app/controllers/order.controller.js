const { ObjectId, Timestamp } = require("mongodb");
const ApiError = require("../api-error");
const OrderService = require("../services/order.service");
const MongoDB = require("../utils/mongodb.util");

// Create and Save a new borrowing history (Borrow book feature)
exports.create = async (req, res, next) => {
  const { reader, book, borrowDate, dueDate, payableAmount } = req.body;
  try {
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.create({
      reader: ObjectId.isValid(reader) ? new ObjectId(reader) : null,
      book: ObjectId.isValid(book) ? new ObjectId(book) : null,
      borrowDate,
      dueDate,
      payableAmount: +payableAmount,
      isPaid: false,
      status: "chưa nhận sách",
      createdAt: new Date(),
    });
    // paidDate

    // Cần giảm số lượng sách tồn kho trong books collection
    return res.status(200).json(document);
  } catch (error) {
    console.log("error", error);

    return next(
      new ApiError(500, "An error occur while creating borrowing history")
    );
  }
};

// Retrieve all borrowing historys from the DB
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const orderService = new OrderService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await orderService.findByName(name);
    } else {
      documents = await orderService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occur while retrieving borrowing historys")
    );
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.findById(req.params.id);
    if (!document)
      return next(new ApiError(404, "borrowing history not found!"));
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving order with id=${req.params.id}`)
    );
  }
};

exports.findAllOrdersInfoOfReader = async (req, res, next) => {
  const { id } = req.query;

  try {
    const orderService = new OrderService(MongoDB.client);
    const historyDoc = await orderService.findAllOrdersInfoOfReader(
      ObjectId.isValid(id) ? new ObjectId(id) : null
    );

    if (!historyDoc)
      return next(new ApiError(404, "borrowing history not found!"));

    return res.json(historyDoc);
  } catch (error) {
    return next(new ApiError(500, `Error retrieving orders history`));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const orderService = new OrderService(MongoDB.client);

    const document = await orderService.update(req.params.id, req.body);

    if (!document) {
      return next(new ApiError(404, "borrowing history not found!"));
    }
    return res.send({ message: "borrowing history was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Error updating borrowing history with id=${req.params.id}`
      )
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "borrowing history not found!"));
    }
    return res.send({ message: "borrowing history was deleted successfully!" });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Could not delete borrowing history with id=${req.params.id}`
      )
    );
  }
};

exports.updateStatus = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  const historyId = req.params.id;
  const { status: newStatus } = req.body;

  try {
    const orderService = new OrderService(MongoDB.client);

    const document = await orderService.updateStatus(
      ObjectId.isValid(historyId) ? new ObjectId(historyId) : null,
      newStatus
    );

    if (!document) {
      return next(new ApiError(404, "borrowing history not found!"));
    }

    if (document.acknowledged && document.modifiedCount === 0) {
      return res.send({
        message: "Status not changed",
      });
    }

    return res.send({
      message: "borrowing history status was updated successfully",
    });
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Error updating borrowing history status with id=${historyId}`
      )
    );
  }
};
