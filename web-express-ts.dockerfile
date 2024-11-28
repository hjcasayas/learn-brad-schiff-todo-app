FROM node:lts-alpine AS builder

WORKDIR /todo-app

COPY . .

RUN npm i

RUN npm run build:lib:interfaces && \
npm run build:lib:repositories && \
npm run build:lib:services && \
npm run build:web:express-ts

ENTRYPOINT [ "npm", "run", "start:web:express-ts" ]


