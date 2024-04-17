const { ObjectId } = require("mongodb");
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
}

module.exports = ReaderService;

// #############################################################################
// const { ObjectId } = require("mongodb");

// class ReaderService {
//   constructor(client) {
//     this.Reader = client.db().collection("readers");
//   }
//   // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
//   extractReaderData(payload) {
//     const reader = {
//       name: payload.name,
//       email: payload.email,
//       password: payload.password,
//       birthDay: payload.birthDay,
//       gender: payload.gender,
//       address: payload.address,
//       phone: payload.phone,
//       // favorite: payload.favorite,
//     };

//     // remove undefined fields
//     Object.keys(reader).forEach((key) => {
//       return reader[key] === undefined && delete reader[key];
//     });

//     return reader;
//   }

//   async create(payload) {
//     const reader = this.extractReaderData(payload);
//     const result = await this.Reader.insertOne(reader);
//     // const result = await this.Reader.findOneAndUpdate(
//     // reader,
//     // { $set: { favorite: reader.favorite === true } },
//     // { returnDocument: "after", upsert: true }
//     // );

//     return result;
//     // return insertedId if needed
//     // {
//     //     "acknowledged": true,
//     //     "insertedId": "661e983d140f35b0561d83cf"
//     // }
//   }

//   async find(filter) {
//     const cursor = await this.Reader.find(filter);
//     return await cursor.toArray();
//   }

//   async findByName(name) {
//     return await this.find({
//       name: { $regex: new RegExp(name), $option: "i" },
//     });
//   }

//   async findById(id) {
//     return await this.Reader.findOne({
//       _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//     });
//   }

//   async update(id, payload) {
//     const filter = {
//       _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//     };
//     const update = this.extractReaderData(payload);
//     const result = await this.Reader.findOneAndUpdate(
//       filter,
//       { $set: update },
//       { returnDocument: "after" }
//     ); // return an updated reader

//     return result;
//   }

//   async delete(id) {
//     const result = await this.Reader.findOneAndDelete({
//       _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//     });
//     return result;
//   }

//   // async deleteAll() {
//   //   const result = await this.Reader.deleteMany({});
//   //   return result.deletedCount;
//   // }

//   // async findFavorite() {
//   //   return await this.find({ favorite: true });
//   // }
// }

// module.exports = ReaderService;
