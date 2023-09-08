import prisma from "../../prisma/client";

// create db
export const createDB = async (pelicula: any) =>{
  const { title, 
    episode_id, opening_crawl, director, producer, release_date, characters,
    planets, starships, vehicles, species, created, edited, url } = pelicula;
  await prisma.peliculas.create({
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
}
// flush dbs
export const flushDBs = async () => {
  await prisma.peliculas.deleteMany({});
};

// reset sequences on id's
export const resetSequence = async () => {
  await prisma.$executeRaw`ALTER SEQUENCE "Film_id_seq" RESTART WITH 1;`;
};
