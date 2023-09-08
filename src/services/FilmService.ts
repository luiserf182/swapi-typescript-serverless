import { config } from "dotenv";
import axios from "axios";
import prisma from "../prisma/client";

config();

export const getFilmsService = async () =>
  await axios.get(`${process.env.BASE_FILMS_URL}`);

export const getFilmByIdService = async (id: string) =>
  await axios.get(`${process.env.BASE_FILMS_URL}/${id}`);

export const addFilmService = async (pelicula: any) => {
  const { title, 
    episode_id, opening_crawl, director, producer, release_date, characters,
    planets, starships, vehicles, species, created, edited, url } = pelicula;

  const { id, ...createdPelicula } = await prisma.peliculas.create({
    data: {
      titulo: title,
      episodio_id: episode_id,
      texto_apertura: opening_crawl,
      director: director,
      productor: producer,
      lanzamiento: release_date,
      actores: JSON.stringify(characters),
      planetas: JSON.stringify(planets),
      naveestelar: JSON.stringify(starships),
      vehiculos: JSON.stringify(vehicles),
      especies: JSON.stringify(species),
      creado: created,
      editado: edited,
      url: url
    },
  });

  return {
    ...createdPelicula
  };
};

export const getPeliculaByTituloService = async (titulo: string) => {
  const peli = await prisma.peliculas.findMany({
    where: {
      titulo: titulo,
    }
  });
  return peli;
};

export const updateFilmService = async (
  pelicula: any
) => {
  const { title, 
    episode_id, opening_crawl, director, producer, release_date, characters,
    planets, starships, vehicles, species, created, edited, url } = pelicula;

  return await prisma.peliculas.updateMany({
    where: {
      titulo: title,
    },
    data: {
      titulo: title,
      episodio_id: episode_id,
      texto_apertura: opening_crawl,
      director: director,
      productor: producer,
      lanzamiento: release_date,
      actores: JSON.stringify(characters),
      planetas: JSON.stringify(planets),
      naveestelar: JSON.stringify(starships),
      vehiculos: JSON.stringify(vehicles),
      especies: JSON.stringify(species),
      creado: created,
      editado: edited,
      url: url
    },
  });
};
