# Referenced from https://nodejs.org/en/docs/guides/nodejs-docker-webapp
FROM --platform=linux/amd64 node:20

WORKDIR /app/frontend

COPY ./frontend/package*.json .
RUN npm install

COPY ./frontend .

EXPOSE 3000

CMD [ "npm", "run", "dev"]
