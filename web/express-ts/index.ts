import { createServer } from "node:http";

import { createExpressApp } from './src/app.js'

const server = createServer(createExpressApp());

const PORT = process.env.PORT ?? 8080;

server.listen(PORT, () => console.log(`Server listening on ${PORT}.`));