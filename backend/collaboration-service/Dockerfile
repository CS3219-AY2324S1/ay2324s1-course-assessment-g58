# Referenced from https://nodejs.org/en/docs/guides/nodejs-docker-webapp
FROM --platform=linux/amd64 node:20

WORKDIR /app/collaboration-service

COPY ./backend/collaboration-service/package*.json .
RUN npm install

COPY ./backend/collaboration-service .

RUN npm run build

EXPOSE 3005

CMD [ "npm", "start" ]