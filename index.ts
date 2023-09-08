import dotenv from "dotenv";
import server from "./src/utils/createServer";
import swaggerOptions from './swagger';
import swagger from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

dotenv.config();

const app = server();

const port: number = parseInt(process.env.PORT as string, 10);

const apiSpec = swaggerJSDoc(swaggerOptions);
app.use('/docs', swagger.serve, swagger.setup(apiSpec));

app.listen(port, () => console.log(`Listening on port: ${port}`));

export { app };