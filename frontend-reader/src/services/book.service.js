import createApiClient from "./api.service";

class BookService {
  constructor(baseUrl = "http://localhost:3000/api/books") {
    this.api = createApiClient(baseUrl);
  }

  async getAll(sort) {
    return (await this.api.get(`?sort=${sort}`)).data;
  }

  async findByNameAndAuthor(searchTerm) {
    return (await this.api.get(`/search?q=${searchTerm}`)).data;
  }

  async findByGenre(payload) {
    return (
      await this.api.get(`/genres?genre=${payload.genre}&sort=${payload.sort}`)
    ).data;
  }

  async findByCollection(collection) {
    return (await this.api.get(`/collection/${collection}`)).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, payload) {
    return (await this.api.put(`/${id}`, payload)).data;
  }
}
export default new BookService();
