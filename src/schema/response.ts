import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  release_date: string;
  url: string;
}

interface Peliculas {
  titulo: string;
  episodio_id: number
  texto_apertura: string
  director: string
  productor: string
  lanzamiento: string
  actores: string
  planetas: string
  naveestelar: string
  vehiculos: string
  especies: string
  creado: string
  editado: string
  url: string
}

const PeliculaSchema: JSONSchemaType<Peliculas> = {
  type: "object",
  properties: {
    titulo: { type: "string" },
    episodio_id: { type: "integer" },
    texto_apertura: { type: "string" },
    director: { type: "string" },
    productor: { type: "string" },
    lanzamiento: { type: "string" },
    actores: { type: "string" },
    planetas: { type: "string" },
    naveestelar: { type: "string" },
    vehiculos: { type: "string" },
    especies: { type: "string" },
    creado: { type: "string" },
    editado: { type: "string" },
    url: { type: "string" }
  },
  required: [
    "titulo"
  ],
  additionalProperties: false,
};

const FilmSchema: JSONSchemaType<Film> = {
  type: "object",
  properties: {
    url: { type: "string" },
    title: { type: "string" },
    release_date: { type: "string" },
    episode_id: { type: "integer" },
    opening_crawl: { type: "string" },
    director: { type: "string" },
    producer: { type: "string" },
    characters: { type: "array", items: { type: "string" } },
    planets: { type: "array", items: { type: "string" } },
    starships: { type: "array", items: { type: "string" } },
    vehicles: { type: "array", items: { type: "string" } },
    species: { type: "array", items: { type: "string" } },
    created: { type: "string" },
    edited: { type: "string" },
  },
  required: [
    "title",
  ],
  additionalProperties: false,
};

const FilmsSchema: JSONSchemaType<Film[]> = {
  type: "array",
  items: FilmSchema,
};

const validateFilm = ajv.compile(FilmSchema);
const validatePelicula = ajv.compile(PeliculaSchema);
const validateFilms = ajv.compile(FilmsSchema);

export { validateFilm, validateFilms, validatePelicula };
