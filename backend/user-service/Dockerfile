# Referenced from https://nodejs.org/en/docs/guides/nodejs-docker-webapp
FROM node:20

# Create app directory
WORKDIR /src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "ts-node", "src/index.ts" ]