// env
import { config } from "dotenv";
config();

import { Request, Response } from "express";

// services
import {
  getFilmsService,
  addFilmService,
  updateFilmService,
  getFilmByIdService,
  getPeliculaByTituloService,
} from "../services/FilmService";

import { validateFilm, validateFilms } from "../api/schema/response";
import { map, chain } from "lodash";

export const getFilms = async (req: Request, res: Response) => {
  try {
    // fetch all films from swapi
    const { data } = await getFilmsService();

    // destucture info about films
    const { results } = data;

    // use ajv to validate json schema
    if (!validateFilms(results)) throw new Error("JSON schema no es valido");

    // showing needed properties
    const films = map(results, (film) => {
      return chain(film)
        .pick("url", "title");
    });

    res.status(200).json(films);
  } catch (err) {
    if (err.message.includes("404"))
      err.message = "filmd no existen";
    return res.status(404).json({
      fail: true,
      err: err.message,
    });
  }
};

export const getFilmById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // if id is not a numeric value, throw an error
    if (isNaN(parseInt(id))) throw new Error("id debe ser un numero");

    // otherwise get data about specific movie
    const { data } = await getFilmByIdService(id);

    // validate json schema structure
    if (!validateFilm(data)) throw new Error("JSON schema no es valido");

    // return single film
    res.status(200).json(data);
  } catch (err) {
    if (err.message.includes("404"))
      err.message = "film con el id no existe";
    return res.status(404).json({
      fail: true,
      err: err.message,
    });
  }
};

export const getPeliculaByTitulo = async (req: Request, res: Response) => {
  try {
    const titulo = req.params.titulo;

    // if id is not a numeric value, throw an error
    if (!titulo) throw new Error("titulo es requerido.");

    // otherwise get data about specific movie
    let data = await getPeliculaByTituloService(titulo);

    // return single film
    res.status(200).json(data);
  } catch (err) {
    if (err.message.includes("404"))
      err.message = "film con el id no existe";
    return res.status(404).json({
      fail: true,
      err: err.message,
    });
  }
};

export const addFilm = async (req: Request, res: Response) => {
  try {
    // id of film, list name
    const { id } = req.body;

    // if provided id is not numeric, throw error
    if (isNaN(parseInt(id))) throw new Error("id debe ser un numero");

    // get film by id
    const { data } = await getFilmByIdService(id);

    // validate json schema structure
    if (!validateFilm(data)) throw new Error("JSON schema no es valido");

    let pelis = await getPeliculaByTituloService(data.title)

    // if not exist movie
    if (pelis.length === 0) {
      // create new movie in db
      const filmAdded = await addFilmService(data);

      // return film which was added to db
      res.json({ filmAdded });

      // otherwise update film
    } else {

      const filmUpdated = await updateFilmService(data);

      // return list and film which was added to list
      res.json({ filmUpdated, data });
    }
  } catch (err) {
    if (err.message.includes("404"))
      err.message = "film con el id no existe";
    else if (err.message.includes("Unique constraint failed"))
      err.message =
        "film duplication error. Film with this id already exist in db";
    return res.status(404).json({
      fail: true,
      err: err.message,
    });
  }
};
