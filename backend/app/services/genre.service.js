const AppService = require("./app.service");

class GenreService extends AppService {
  constructor(client) {
    super(client, "genres");
  }
}

module.exports = GenreService;
