FROM node:20.8.0-alpine

RUN apk update && apk add bash curl && apk update

WORKDIR /app

ADD package*.json .
RUN npm install
ADD . .

EXPOSE 3000
CMD npm start