const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const BookService = require("../services/book.service");
const ReaderService = require("../services/reader.service");
const MongoDB = require("../utils/mongodb.util");

// Create and Save a new Reader
exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.create(req.body);
    return res.send(document);
  } catch (error) {
    console.log("error", error);
    return next(new ApiError(500, "An error occur while creating reader"));
  }
};

// Retrieve all readers from the DB
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const readerService = new ReaderService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await readerService.findByName(name);
    } else {
      documents = await readerService.find({});
    }
  } catch (error) {
    return next(new ApiError(500, "An error occur while retrieving readers"));
  }

  return res.send(documents);
};

// Find a single contact with an id
exports.findOne = async (req, res, next) => {
  try {
    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.findById(req.params.id);
    if (!document) return next(new ApiError(404, "Reader not found!"));
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving reader with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.update(req.params.id, req.body);

    if (!document) {
      return next(new ApiError(404, "Reader not found!"));
    }
    return res.send({ message: "Reader was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating reader with id=${req.params.id}`)
    );
  }
};

exports.delete = async (req, res, next) => {
  try {
    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Reader not found!"));
    }
    return res.send({ message: "Reader was deleted successfully!" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete reader with id=${req.params.id}`)
    );
  }
};

exports.findAllFavorite = async (req, res, next) => {
  try {
    const readerService = new ReaderService(MongoDB.client);
    const bookService = new BookService(MongoDB.client);

    const reader = await readerService.findById(req.body._id);
    const validFavoriteBookIds = reader.favoriteBooks.map((id) =>
      ObjectId.isValid(id) ? new ObjectId(id) : null
    );

    const documents = await bookService.find({
      _id: { $in: validFavoriteBookIds },
    });

    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, "An error occur while retrieving favorite books")
    );
  }
};

exports.removeFromFavorite = async (req, res, next) => {
  try {
    const { id: bookIdToRemove } = req.params;
    const { _id: readerId } = req.body;

    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.removeFromFavorite(
      ObjectId.isValid(readerId) ? new ObjectId(readerId) : null,
      bookIdToRemove
    );

    if (document.acknowledged && document.modifiedCount === 0) {
      return res.send({ message: "Book already removed from favorite" });
    }

    return res.send({ message: "Remove book from favorite sucessfully" });
  } catch (error) {
    return next(
      new ApiError(500, "An error occur while removing favorite book")
    );
  }
};

exports.addToFavorite = async (req, res, next) => {
  try {
    const { _id: readerId, bookIdToAdd } = req.body;

    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.addToFavorite(
      ObjectId.isValid(readerId) ? new ObjectId(readerId) : null,
      bookIdToAdd
    );

    if (document.acknowledged && document.modifiedCount === 0) {
      return res.send({ message: "Book already added to favorite" });
    }

    return res.send({ message: "Add book to favorite sucessfully" });
  } catch (error) {
    return next(new ApiError(500, "An error occur while adding favorite book"));
  }
};

// exports.deleteAll = async (req, res, next) => {
//   try {
//     const readerService = new ReaderService(MongoDB.client);
//     const deletedCount = await readerService.deleteAll();
//     return res.send({
//       message: `${deletedCount} readers were deleted successfully`,
//     });
//   } catch (error) {
//     return next(new ApiError(500, "An error occur while deleting all readers"));
//   }
// };
