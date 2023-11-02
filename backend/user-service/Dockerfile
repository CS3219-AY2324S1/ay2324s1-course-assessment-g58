# Referenced from https://nodejs.org/en/docs/guides/nodejs-docker-webapp
FROM --platform=linux/amd64 node:20

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./backend/user-service/package*.json .
RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

COPY ./backend/user-service .

EXPOSE 3001

RUN npx prisma generate --schema /app/prisma/schema.prisma

CMD [ "npm", "start" ]