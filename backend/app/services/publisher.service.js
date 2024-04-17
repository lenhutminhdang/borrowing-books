const AppService = require("./app.service");

class PublisherService extends AppService {
  constructor(client) {
    super(client, "publishers");
  }
}

module.exports = PublisherService;
