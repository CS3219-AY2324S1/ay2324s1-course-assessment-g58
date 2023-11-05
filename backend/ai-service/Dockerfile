# Referenced from https://nodejs.org/en/docs/guides/nodejs-docker-webapp
FROM --platform=linux/amd64 node:20

WORKDIR /app/ai-service

COPY ./backend/ai-service/package*.json .
RUN npm install

COPY ./backend/ai-service .

RUN npm run build

EXPOSE 3008

CMD ["npm", "start" ]