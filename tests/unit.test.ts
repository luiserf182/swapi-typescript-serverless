import { getFilmsService } from "../src/services/FilmService";

describe("FilmService -> getFilms()", () => {
  test("retorna todos los films", async () => {
    const { data } = await getFilmsService();
    expect(data.results.length).toBe(6);
  });
});
