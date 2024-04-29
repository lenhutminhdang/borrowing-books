import createApiClient from "./api.service";

class HistoryService {
  constructor(baseUrl = "http://localhost:3000/api/history") {
    this.api = createApiClient(baseUrl);
  }

  async borrowBook(payload) {
    return (await this.api.post("/", payload)).data;
  }

  async getAllHistory(readerId) {
    return (await this.api.get(`/reader?id=${readerId}`)).data;
  }
}
export default new HistoryService();
