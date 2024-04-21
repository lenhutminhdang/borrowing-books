import createApiClient from "./api.service";

class HistoryService {
  constructor(baseUrl = "http://localhost:3000/api/history") {
    this.api = createApiClient(baseUrl);
  }

  async borrowBook(payload) {
    return (await this.api.post("/", payload)).data;
  }

  async getAllHistory(payload) {
    return (await this.api.post("/reader", payload)).data;
  }
}
export default new HistoryService();
