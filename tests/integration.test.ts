import server from "../src/utils/createServer";
import request from "supertest";
import { createDB, flushDBs, resetSequence } from "./hooks/db";

let app;

beforeAll(async () => {
  // run express server
  app = server();

  // delete tables rows
  await flushDBs();

  // reset sequences
  await resetSequence();

  // arbitrary lists
  let names = [
    "Old Saga",
    "Ice Saga",
    "Fire Saga",
    "God Saga",
    "Titan Saga",
    "Dark Saga",
    "Light Saga",
  ];

  // create table in db for each name for test purposes
  for (let i = 0; i < names.length; i++) {
    await createDB(names[i]);
  }
});

afterAll(async () => {
  // flush all dbs
  await flushDBs();
  // reset sequential values
  await resetSequence();
});

describe("GET /films", () => {
  test("retorna todos los films", async () => {
    const res = await request(app).get("/films");

    expect(res.status).toBe(200);
    expect(res.body.length).toBe(6);
    
  });
});

describe("GET /films/:id", () => {
  test("Cuando el id proporcionado es válida, devuelve una película específica.", async () => {
    const id = "2";
    const res = await request(app).get(`/films/${id}`);

    expect(res.status).toBe(200);

    // Title of film with id 2 is The Empire Strikes Back.
    expect(res.body.title).toBe("The Empire Strikes Back");
  });

  test("cuando el id proporcionado no es un valor numérico, devuelve un mensaje de error", async () => {
    const id = "id";
    const res = await request(app).get(`/films/${id}`);

    expect(res.status).toBe(404);
    expect(res.body.err).toBe("id debe ser un numero");
  });

  test("cuando el film con el id proporcionado no existe, se devuelve un mensaje de error", async () => {
    const id = "7";
    const res = await request(app).get(`/films/${id}`);

    expect(res.status).toBe(404);
    expect(res.body.err).toBe("film con el id no existe");
  });
});