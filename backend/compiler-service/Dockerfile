# Referenced from https://nodejs.org/en/docs/guides/nodejs-docker-webapp
FROM --platform=linux/amd64 node:20

WORKDIR /app/compiler-service

COPY ./backend/compiler-service/package*.json .
RUN npm install

COPY ./backend/compiler-service .

RUN npm run build

EXPOSE 3006

CMD ["npm", "start" ]