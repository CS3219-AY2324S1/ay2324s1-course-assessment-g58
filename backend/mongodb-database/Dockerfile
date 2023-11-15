# Referenced from https://nodejs.org/en/docs/guides/nodejs-docker-webapp
FROM --platform=linux/amd64 node:20

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./backend/mongodb-database/package*.json .
RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

COPY ./backend/mongodb-database .

EXPOSE 3002

CMD [ "npm", "start" ]