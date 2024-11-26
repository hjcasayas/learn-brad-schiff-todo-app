FROM node:lts-alpine

WORKDIR /todo-app

COPY . .

RUN npm i

RUN npm run build:lib:interfaces && \
    npm run build:lib:repositories && \
    npm run build:lib:services

ENTRYPOINT [ "npm", "run", "dev:web:express-ts" ]