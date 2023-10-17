# Referenced from https://nodejs.org/en/docs/guides/nodejs-docker-webapp
FROM node:20

WORKDIR /app/collaboration-service

COPY ./collaboration-service/package*.json .
RUN npm install

COPY ./collaboration-service .

EXPOSE 3005

CMD [ "npm", "run", "dev" ]