FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN npm install

ENV DEV_DB_NAME=ecomerce

CMD [ "node", "dist/server.js" ]

EXPOSE 3000