const AppService = require("./app.service");

class OrderService extends AppService {
  constructor(client) {
    super(client, "orders");
  }

  extractData(payload) {
    const order = {
      reader: payload.reader,
      book: payload.book,
      borrowDate: payload.borrowDate,
      dueDate: payload.dueDate,
      status: payload.status,
    };

    // remove undefined fields
    Object.keys(order).forEach((key) => {
      return order[key] === undefined && delete order[key];
    });

    return order;
  }

  async updateStatus(orderId, newStatus) {
    const result = await this.Collection.updateOne(
      { _id: orderId },
      { $set: { status: newStatus } }
    );
    return result;
  }

  async findAllOrdersInfoOfReader(readerId) {
    const cursor = await this.Collection.aggregate([
      {
        $match: { reader: readerId },
      },
      {
        $lookup: {
          from: "books", // from books collection
          localField: "book", // from order document
          foreignField: "_id", // from books collection
          as: "bookInfo",
        },
      },
      {
        $project: {
          _id: 1,
          borrowDate: 1,
          dueDate: 1,
          status: 1,
          bookInfo: 1,
        },
      },
    ]).sort({ borrowDate: -1 });

    return await cursor.toArray();
  }
}

module.exports = OrderService;
