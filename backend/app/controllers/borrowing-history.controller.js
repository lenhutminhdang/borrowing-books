const ApiError = require("../api-error");
const BorrowingHistoryService = require("../services/borrowing-history.service");
const MongoDB = require("../utils/mongodb.util");

// Create and Save a new borrowing history
exports.create = async (req, res, next) => {
  try {
    const borrowingHistoryService = new BorrowingHistoryService(MongoDB.client);
    const document = await borrowingHistoryService.create(req.body);

    return res.send(document);
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
    const borrowingHistoryService = new BorrowingHistoryService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await borrowingHistoryService.findByName(name);
    } else {
      documents = await borrowingHistoryService.find({});
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
    const borrowingHistoryService = new BorrowingHistoryService(MongoDB.client);
    const document = await borrowingHistoryService.findById(req.params.id);
    if (!document)
      return next(new ApiError(404, "borrowing history not found!"));
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(
        500,
        `Error retrieving borrowing history with id=${req.params.id}`
      )
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const borrowingHistoryService = new BorrowingHistoryService(MongoDB.client);

    const document = await borrowingHistoryService.update(
      req.params.id,
      req.body
    );

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
    const borrowingHistoryService = new BorrowingHistoryService(MongoDB.client);
    const document = await borrowingHistoryService.delete(req.params.id);
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
