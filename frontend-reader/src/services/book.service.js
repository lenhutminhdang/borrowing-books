import createApiClient from "./api.service";

class BookService {
  constructor(baseUrl = "http://localhost:3000/api/books") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async findByName(searchTerm) {
    return (await this.api.get(`/search?q=${searchTerm}`)).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, payload) {
    return (await this.api.put(`/${id}`, payload)).data;
  }
}
export default new BookService();
