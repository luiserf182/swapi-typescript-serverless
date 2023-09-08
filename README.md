# RIMAC prueba tecnica

## Description

Prueba tecnica rimac - Swapi

## Stack

- `Typescript`
- `Express`
- `MySql`
- `Prisma`
- `Jest`
- `Supertest`
- `Serverless`

## Prerequisities

- `node > 14`
- `mysql db created (workbench)`

## To run

### Install dependencies

```
npm i
```

### Run API

```
npm run start
```

## App architecture

Aplicación de tipo REST

<details>
<summary>
Aplicación se comunica con la api StartWars(Swapi)
</summary>

<img src="./.github/img/arch.png">
</details>

## Database

<details>
<summary>
La DB tiene una tabla Peliculas.
</summary>

</details>

## Env setup

Crear archivo `.env` en la raiz del proyecto.

```
DB_URL=url-de-base-de-datos
PORT=5000
BASE_FILMS_URL=https://swapi.dev/api/films
PASS=
USER=
PORT_DB=3306
```

## API

| Endpoint |                       Method           |
| :------: | :--------------------------------------|
|   GET    |       [`/films`]                       |
|   GET    |       [`/films/:id`]                   |
|   POST   |       [`/films/`] {id: 1}              |
|   GET    |       [`/films/pelicula/{titulo}`]     |
|   GET    |       [`/docs`] Documentacion Swagger  |

NOTA: Para el POST el id pertenece al id en swapi
ejemplo Body => {"id": 1}

## Tests

### To run:

`Unit tests`

```
npm run test-unit
```

`Integration/API tests`

```
npm run test-api
```