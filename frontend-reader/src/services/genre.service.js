import createApiClient from "./api.service";

class GenreService {
  constructor(baseUrl = "http://localhost:3000/api/genres") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async getGenreByAlt(genreAlt) {
    return (await this.api.get(`/${genreAlt}`)).data;
  }
}
export default new GenreService();
