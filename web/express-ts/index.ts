import { createServer } from "node:http";

import { createExpressApp } from './src/app.js'
import { TodoService } from "@todo-app/lib-services/index.js";
import { MongoTodoRepository } from "@todo-app/lib-repositories/index.js";
import { MongoClient } from "mongodb";


const start = async () => {
    const mongoClient = new MongoClient(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DOMAIN}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_DB}&retryWrites=true`);
    await mongoClient.connect();
    const todoService = new TodoService(new MongoTodoRepository(mongoClient.db()));
    const server = createServer(createExpressApp({ todoService }));
    const PORT = process.env.PORT ?? 8080;
    server.listen(PORT, () => console.log(`Server listening on ${PORT}.`));
}

start();