const { ObjectId } = require("mongodb");
const AppService = require("./app.service");

class BookService extends AppService {
  constructor(client) {
    super(client, "books");
  }

  extractData(payload) {
    const book = {
      name: payload.name,
      image: payload.image,
      description: payload.description,
      price: payload.price,
      volumeNumber: payload.volumeNumber,
      author: payload.author,
      publicationYear: payload.publicationYear,
      publisher: payload.publisher,
    };

    // remove undefined fields
    Object.keys(book).forEach((key) => {
      return book[key] === undefined && delete book[key];
    });

    return book;
  }
}

module.exports = BookService;
