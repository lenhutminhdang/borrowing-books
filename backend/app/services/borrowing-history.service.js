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
}

module.exports = BorrowingHistoryService;
