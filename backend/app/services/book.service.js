const { ObjectId } = require("mongodb");
const AppService = require("./app.service");

class BookService extends AppService {
  constructor(client) {
    super(client, "books");
  }

  extractData(payload) {
    const book = {
      name: payload.name, // Tam The
      price: payload.price, // 10.000
      volumeNumber: payload.volumeNumber, // 3
      author: payload.author, // Luu Tu Han
      publicationYear: payload.publicationYear, // 2018
      publisher: payload.publisher, // 001a..
    };

    // remove undefined fields
    Object.keys(book).forEach((key) => {
      return book[key] === undefined && delete book[key];
    });

    return book;
  }
}

module.exports = BookService;
