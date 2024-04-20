const AppService = require("./app.service");

class ReaderService extends AppService {
  constructor(client) {
    super(client, "readers");
  }

  extractData(payload) {
    const reader = {
      name: payload.name, // le nhut minh dang
      email: payload.email, // minhdang@example.com
      password: payload.password, // 123456
      birthDay: payload.birthDay, // 01-01-2001
      gender: payload.gender, // male
      address: payload.address, // Ninh Kieu, Can Tho
      phone: payload.phone, // 0326900200
      favoriteBooks: payload.favoriteBooks, // ['001a', '002a']
    };

    // remove undefined fields
    Object.keys(reader).forEach((key) => {
      return reader[key] === undefined && delete reader[key];
    });

    return reader;
  }

  async findByEmail(email) {
    return await this.Collection.findOne({ email });
  }

  async addToFavorite(readerId, bookIdToAdd) {
    const result = await this.Collection.updateOne(
      { _id: readerId },
      { $addToSet: { favoriteBooks: bookIdToAdd } }
    );

    return result;
  }

  async removeFromFavorite(readerId, bookIdToRemove) {
    const result = await this.Collection.updateOne(
      { _id: readerId },
      { $pull: { favoriteBooks: bookIdToRemove } }
    );

    return result;
  }

  async findAllFavorites(readerId) {
    const cursor = await this.Collection.aggregate([
      {
        $match: { _id: readerId },
      },
      {
        $lookup: {
          from: "books", // from books collection
          localField: "favoriteBooks", // from reader document
          foreignField: "_id", // from books collection
          as: "favoriteBooksDetails",
        },
      },
      {
        $project: {
          _id: 1, // reader id
          favoriteBooksDetails: 1, // favorite books
        },
      },
    ]);

    return await cursor.toArray();
  }
}

module.exports = ReaderService;
