const ApiError = require("../api-error");
const StaffService = require("../services/staff.service");

const MongoDB = require("../utils/mongodb.util");

// Create and Save a new Staff
exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.create(req.body);

    return res.send(document);
  } catch (error) {
    console.log("error", error);

    return next(new ApiError(500, "An error occur while creating staff"));
  }
};

// Retrieve all staffs from the DB
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const staffService = new StaffService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await staffService.findByName(name);
    } else {
      documents = await staffService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "An error occur while retrieving staffs"));
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.findById(req.params.id);
    if (!document) return next(new ApiError(404, "Staff not found!"));
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving staff with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const staffService = new StaffService(MongoDB.client);

    const document = await staffService.update(req.params.id, req.body);

    if (!document) {
      return next(new ApiError(404, "Staff not found!"));
    }
    return res.send({ message: "Staff was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating staff with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const staffService = new StaffService(MongoDB.client);
    const document = await staffService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Staff not found!"));
    }
    return res.send({ message: "Staff was deleted successfully!" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete staff with id=${req.params.id}`)
    );
  }
};
