const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const BookService = require("../services/book.service");
const MongoDB = require("../utils/mongodb.util");

// Create and Save a new book
exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.create(req.body);

    return res.send(document);
  } catch (error) {
    console.log("error", error);

    return next(new ApiError(500, "An error occur while creating book"));
  }
};

// Retrieve all books from the DB
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const bookService = new BookService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await bookService.findByName(name);
    } else {
      documents = await bookService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "An error occur while retrieving books"));
  }

  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.findById(req.params.id);
    if (!document) return next(new ApiError(404, "book not found!"));
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving book with id=${req.params.id}`)
    );
  }
};

exports.findOneFullInfo = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.findFullInfo(
      ObjectId.isValid(req.params.id) ? new ObjectId(req.params.id) : null
    );

    if (!document[0]) return next(new ApiError(404, "book info not found!"));
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving book info with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const bookService = new BookService(MongoDB.client);

    const document = await bookService.update(req.params.id, req.body);

    if (!document) {
      return next(new ApiError(404, "book not found!"));
    }
    return res.send({ message: "Book was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating book with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const bookService = new BookService(MongoDB.client);
    const document = await bookService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "book not found!"));
    }
    return res.send({ message: "Book was deleted successfully!" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete book with id=${req.params.id}`)
    );
  }
};
