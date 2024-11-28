import express from 'express';

import type { ITodoRepository, ITodoService } from '@todo-app/lib-interfaces/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

interface Dependencies {
    todoService: ITodoService
}

export const createExpressApp = ({ todoService }: Dependencies) => {
    const app = express();
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public')))
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
                        <form method="POST" action="/create-item">
                            <div class="d-flex align-items-center">
                            <input autofocus name="item" autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                            <button class="btn btn-primary">Add New Item</button>
                            </div>
                        </form>
                        </div>
                        
                        <ul class="list-group pb-5">
                        ${todos.map(todo => {
            return `
                                <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                                    <span class="item-text">${todo.item}</span>
                                    <div>
                                    <button class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                                    <button class="delete-me btn btn-danger btn-sm">Delete</button>
                                    </div>
                                </li>
                            `;
        }).join('')}
                        </ul>
                        
                    </div>
                    <script src='/browser.js' defer type='module'></script>
                </body>
            </html>
        `);
    });

    app.post('/create-item', async (req, res) => {
        console.log('form data', req.body);
        const item = req.body.item;
        await todoService.add({ item });
        res.redirect('/');
    });

    return app;
}
