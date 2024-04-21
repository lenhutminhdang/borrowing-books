const AppService = require("./app.service");

class BorrowingHistoryService extends AppService {
  constructor(client) {
    super(client, "borrowinghistory");
  }

  extractData(payload) {
    const borrowingHistory = {
      reader: payload.reader,
      book: payload.book,
      borrowDate: payload.borrowDate,
      dueDate: payload.dueDate,
      status: payload.status,
    };

    // remove undefined fields
    Object.keys(borrowingHistory).forEach((key) => {
      return (
        borrowingHistory[key] === undefined && delete borrowingHistory[key]
      );
    });

    return borrowingHistory;
  }

  async updateStatus(historyId, newStatus) {
    const result = await this.Collection.updateOne(
      { _id: historyId },
      { $set: { status: newStatus } }
    );
    return result;
  }

  async findAllHistoryInfoOfReader(readerId) {
    const cursor = await this.Collection.aggregate([
      {
        $match: { reader: readerId },
      },
      {
        $lookup: {
          from: "books", // from books collection
          localField: "book", // from history document
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
    ]);

    return await cursor.toArray();
  }
}

module.exports = BorrowingHistoryService;
