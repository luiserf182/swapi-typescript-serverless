import { Router } from "express";
import {
  getFilms,
  getFilmById,
  addFilm,
  getPeliculaByTitulo,
} from "../controllers/FilmController";

const router = Router();

router.get("/films", getFilms);

router.get("/films/:id", getFilmById);

router.post("/films/", addFilm);

router.get("/films/pelicula/:titulo", getPeliculaByTitulo);

export default router;
