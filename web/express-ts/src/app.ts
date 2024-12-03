import express, { type NextFunction, type Request, type Response } from 'express';
import type { ITodoService, TodoEntity } from '@todo-app/lib-interfaces/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import sanitize from 'sanitize-html';
import { config } from "dotenv-safe";
config();

interface Dependencies {
    todoService: ITodoService
}

export const createExpressApp = ({ todoService }: Dependencies) => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public')))
    app.use(passwordProtected);
    app.get('/', async (_req, res) => {
        const todos = await todoService.getAll();
        res.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Simple To-Do App</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
                </head>
                <body>
                    <div class="container">
                        <h1 class="display-4 text-center py-1">To-Do App</h1>
                        
                        <div class="jumbotron p-3 shadow-sm">
                        <form id="create-form" method="POST" action="/create-item">
                            <div class="d-flex align-items-center">
                            <input id="create-form-field" autofocus name="item" autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                            <button class="btn btn-primary">Add New Item</button>
                            </div>
                        </form>
                        </div>
                        
                        <ul id="item-list" class="list-group pb-5">
                        
                        </ul>
                        
                    </div>
                    <script>
                        const items = ${JSON.stringify(todos)};
                    </script>
                    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
                    <script src='/browser.js' defer type='module'></script>
                </body>
            </html>
        `);
    });

    app.post('/create-item', async (req, res) => {
        const item = req.body.item;
        await todoService.add({ item: sanitize(item, { allowedTags: [], allowedAttributes: {} }) });
        res.redirect('/');
    });

    app.post('/update-item', async (req, res) => {
        const todo = req.body as TodoEntity;
        const { id } = await todoService.updateById(todo);
        res.status(200).json({ message: 'OK', id });
    });

    app.post('/delete-item', async (req, res) => {
        const id = req.body.id;
        await todoService.deletById(id);
        res.status(200).json({ message: 'OK' });
    });

    function passwordProtected(req: Request, res: Response, next: NextFunction) {
        res.set('WWW-Authenticate', 'Basic realm="Simple Todo App"');
        console.log(req.headers.authorization);
        if (req.headers.authorization == `Basic ${process.env.BASIC_AUTH_TOKEN}`) {
            next();
        } else {
            res.status(401).send('Authorization neededs');
        }
    }

    return app;
}
