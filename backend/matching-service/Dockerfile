# Referenced from https://nodejs.org/en/docs/guides/nodejs-docker-webapp
FROM --platform=linux/amd64 node:20

WORKDIR /app/matching-service

COPY ./backend/matching-service/package*.json .
RUN npm install

COPY ./backend/matching-service .

EXPOSE 3004

CMD [ "npm", "start" ]