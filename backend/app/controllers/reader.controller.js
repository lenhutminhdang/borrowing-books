const { ObjectId } = require("mongodb");
const ApiError = require("../api-error");
const BookService = require("../services/book.service");
const ReaderService = require("../services/reader.service");
const MongoDB = require("../utils/mongodb.util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "goodbyeworld";

function getReaderDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;

      resolve(userData);
    });
  });
}

// Create and Save a new Reader (SIGNUP)
exports.signup = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  const { name, email, password } = req.body;

  try {
    const readerService = new ReaderService(MongoDB.client);
    const userDoc = await readerService.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      birthDay: "",
      gender: "",
      address: "",
      phone: "",
      favoriteBooks: [],
    });
    return res.send(userDoc);
  } catch (error) {
    console.log("error", error);
    return next(new ApiError(500, "An error occur while creating reader"));
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const readerService = new ReaderService(MongoDB.client);
    const readerDoc = await readerService.findByEmail(email);

    if (!readerDoc) return next(new ApiError(404, "Reader not found!"));

    // Found reader
    if (readerDoc) {
      const passwordOK = bcrypt.compareSync(password, readerDoc.password);

      if (passwordOK) {
        jwt.sign(
          { id: readerDoc._id, email: readerDoc.email },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;

            res.cookie("token", token, {
              sameSite: "none",
            });
            res.json(readerDoc); // DONT FORGET TO ADD THIS SHIT AFTER set cookie
          }
        );
      } else {
        res.status(422).json("Wrong password");
      }
    }
    // Not found reader
    else {
      res.json("not found user");
    }
  } catch (error) {
    return next(new ApiError(500, `Error retrieving reader`));
  }
};

// logout
exports.logout = async (req, res, next) => {
  res.cookie("token", "").json(true);
};

// Get reader profile
exports.getProfile = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (token) {
      const readerService = new ReaderService(MongoDB.client);
      const verifiedReader = await getReaderDataFromReq(req);
      const readerDoc = await readerService.findById(verifiedReader.id);

      if (!readerDoc) return next(new ApiError(404, "Reader not found!"));

      return res.json(readerDoc);
    }
  } catch (error) {
    return next(new ApiError(500, `Error retrieving reader`));
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

// Find a single reader with an id
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
  const { token } = req.cookies;
  try {
    if (token) {
      const readerService = new ReaderService(MongoDB.client);
      const verifiedReader = await getReaderDataFromReq(req);

      const favoriteBooks = await readerService.findAllFavorites(
        ObjectId.isValid(verifiedReader.id)
          ? new ObjectId(verifiedReader.id)
          : null
      );

      if (!favoriteBooks)
        return next(new ApiError(404, "favorite books not found!"));

      return res.json(favoriteBooks);
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occur while retrieving favorite books")
    );
  }
};

exports.removeFromFavorite = async (req, res, next) => {
  try {
    const { id: readerId, bookId: bookIdToRemove } = req.body;

    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.removeFromFavorite(
      ObjectId.isValid(readerId) ? new ObjectId(readerId) : null,
      ObjectId.isValid(bookIdToRemove) ? new ObjectId(bookIdToRemove) : null
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
    const { id: readerId, bookId: bookIdToAdd } = req.body;

    const readerService = new ReaderService(MongoDB.client);
    const document = await readerService.addToFavorite(
      ObjectId.isValid(readerId) ? new ObjectId(readerId) : null,
      ObjectId.isValid(bookIdToAdd) ? new ObjectId(bookIdToAdd) : null
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
