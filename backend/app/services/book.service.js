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
      instock: payload.instock,
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

  async findFullInfo(bookId) {
    const cursor = await this.Collection.aggregate([
      {
        $match: { _id: bookId },
      },
      {
        $lookup: {
          from: "publishers", // from publishers collection
          localField: "publisher", // from book document
          foreignField: "_id", // from publishers collection
          as: "publisherInfo",
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "genresInfo",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          instock: 1,
          volumeNumber: 1,
          author: 1,
          publicationYear: 1,
          image: 1,
          description: 1,
          genresInfo: {
            _id: 1,
            name: 1,
            alt: 1,
          },
          publisherInfo: 1,
        },
      },
    ]);

    return await cursor.toArray();
  }
}

module.exports = BookService;
