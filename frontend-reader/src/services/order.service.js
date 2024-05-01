import createApiClient from "./api.service";

class OrderService {
  constructor(baseUrl = "http://localhost:3000/api/orders") {
    this.api = createApiClient(baseUrl);
  }

  async borrowBook(payload) {
    return (await this.api.post("/", payload)).data;
  }

  async getAllOrdersHistory(readerId) {
    return (await this.api.get(`/reader?id=${readerId}`)).data;
  }
}
export default new OrderService();
