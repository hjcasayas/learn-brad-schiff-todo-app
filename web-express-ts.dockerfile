FROM node:lts-alpine

WORKDIR /todo-app

COPY . .

RUN npm i

ENTRYPOINT [ "npm", "run", "dev:web:express-ts" ]