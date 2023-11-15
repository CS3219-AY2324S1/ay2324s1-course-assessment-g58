# Referenced from https://nodejs.org/en/docs/guides/nodejs-docker-webapp
# See below URL for explanation on "--platform=linux/amd64"
# https://stackoverflow.com/questions/74705475/aws-ecs-exec-usr-local-bin-docker-entrypoint-sh-exec-format-error
FROM --platform=linux/amd64 node:20

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./gateway/package*.json .
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY ./gateway .

EXPOSE 8080

CMD [ "npm", "start" ]