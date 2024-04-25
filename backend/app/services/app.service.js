const { ObjectId } = require("mongodb");

class AppService {
  constructor(client, collection) {
    this.Collection = client.db().collection(collection);
  }

  extractData(payload) {
    // remove undefined fields
    Object.keys(payload).forEach((key) => {
      return payload[key] === undefined && delete payload[key];
    });

    return payload;
  }

  async create(payload) {
    const reader = this.extractData(payload);
    const result = await this.Collection.insertOne(reader);

    return result;
  }

  async find(filter) {
    const cursor = await this.Collection.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      name: { $regex: name, $options: "i" },
    });
  }

  async findById(id) {
    return await this.Collection.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractData(payload);
    const result = await this.Collection.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );

    return result;
  }

  async delete(id) {
    const result = await this.Collection.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  // async deleteAll() {
  //   const result = await this.Collection.deleteMany({});
  //   return result.deletedCount;
  // }
}

module.exports = AppService;
