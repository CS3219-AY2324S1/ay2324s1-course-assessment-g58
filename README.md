# Assignment 5 instructions

1. Create the `.env` files in the respective directories based on the txt files submitted in canvas (for ./backend/ai-service, ./backend/user-service, ./backend/email-service, ./frontend, ./matching-service, ./mongodb-database)

2. Start docker

3. Run `docker-compose build` and wait for the build to finish

4. Run `docker-compose up` and wait for the services to finish setting up

5. Go to http://localhost:3000 and create an account

6. Repeat step 5 on an incognito browser

7. Click `Match` on both browsers and specify similar requirements to successfully match

## Getting Started with Docker for Development

1. Install docker at https://www.docker.com/

2. Start docker

3. Run `docker-compose up --build` to build and run images and containers

## Developer guide

As of the last update of this README, only the user-service and question-service have been dockerized. A respective `Dockerfile` has been created within each of their folders. This `Dockerfile` specifies the instructions in order to build the container, install the necessary node modules etc. 

To simplify the container building, a `docker-compose.yml` has been created in order to start both containers at once. This is achieved through running `docker compose build` and `docker compose up` to call both dockerfiles.

The api-gateway requires more work, see https://dev.to/naseef012/create-a-microservices-app-with-dockerized-express-api-gateway-1kf9 for more information.

## Finishing Development

When you are done with developing, kill the program (Ctrl^C) and run `docker compose down`. This cleans up local resources used by docker.

Note: For Mac users, this doesn't work and volumes will continue to pile up. Run `docker system prune -a --volumes` occasionally to remove the remaining volumes.