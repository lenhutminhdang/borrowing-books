const ApiError = require("../api-error");
const GenreService = require("../services/genre.service");
const MongoDB = require("../utils/mongodb.util");

exports.findAll = async (req, res, next) => {
  try {
    const genreService = new GenreService(MongoDB.client);
    const documents = await genreService.find({});

    res.json(documents);
  } catch (error) {
    return next(new ApiError(500, "An error occur while retrieving genres"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const genreService = new GenreService(MongoDB.client);
    const document = await genreService.find({
      alt: req.params.alt,
    });

    res.json(document[0]);
  } catch (error) {
    return next(new ApiError(500, "An error occur while retrieving genre"));
  }
};
