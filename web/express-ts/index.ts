import { createServer } from "node:http";

import {app} from './src/app.js'

const server = createServer(app);

const PORT = process.env.PORT ?? 8080;

server.listen(PORT, () => console.log(`Server listening on ${PORT}.`));