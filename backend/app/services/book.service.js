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

  async findByNameAndAuthor(searchTerm) {
    const cursor = await this.Collection.aggregate([
      {
        $lookup: {
          from: "authors",
          localField: "authors",
          foreignField: "_id",
          as: "authorsInfo",
        },
      },
      {
        $match: {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } }, // find by book name
            { "authorsInfo.name": { $regex: searchTerm, $options: "i" } }, // find by author name
          ],
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          image: 1,
          authorsInfo: 1,
        },
      },
      { $limit: 10 },
    ]);

    return await cursor.toArray();
  }

  async findByGenre(findingGenre) {
    let cursor;
    const project = {
      _id: 1,
      name: 1,
      image: 1,
      price: 1,
      volumeNumber: 1,
      publicationYear: 1,
    };
    const sort = {
      publicationYear: -1,
      volumeNumber: -1,
    };

    if (!findingGenre) {
      cursor = await this.Collection.find({}).project(project).sort(sort);
    } else {
      cursor = await this.Collection.find({
        genres: findingGenre,
      })
        .project(project)
        .sort(sort);
    }
    return await cursor.toArray();
  }

  async findAndSortByVol(filter) {
    const cursor = await this.Collection.find(filter)
      .project({
        _id: 1,
        name: 1,
        image: 1,
        price: 1,
      })
      .sort({
        volumeNumber: -1,
      });
    return await cursor.toArray();
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
        $lookup: {
          from: "authors",
          localField: "authors",
          foreignField: "_id",
          as: "authorsInfo",
        },
      },
      {
        $lookup: {
          from: "collections",
          localField: "collection",
          foreignField: "_id",
          as: "collectionInfo",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          price: 1,
          instock: 1,
          volumeNumber: 1,
          publicationYear: 1,
          image: 1,
          description: 1,
          collection: 1,
          genresInfo: {
            _id: 1,
            name: 1,
            alt: 1,
          },
          authorsInfo: 1,
          publisherInfo: 1,
          collectionInfo: 1,
        },
      },
    ]);

    return await cursor.toArray();
  }
}

module.exports = BookService;
