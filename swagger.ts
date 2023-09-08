export default {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Swagger Swapi',
      description: 'Documentacion Swagger Swapi',
    },
    servers: [{ url: 'http://localhost:5000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./docs/**/*.yaml'],
};