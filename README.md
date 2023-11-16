# Getting Started with Docker for Development
This will help you set up your local environment to run PeerPrep. Note that if you have received `.env` files for frontend, question and user services, simply add those files to the respective `frontend`, `backend/user-service` and `mongodb-database` directories and rename them to `.env`. Thereafter, skip step 3, 4 and 5.

1. Install docker at https://www.docker.com/

2. Start docker

3. Enter the `backend/user-service` directory and follow the `README.md` to configure the user-service

4. Enter the `mongodb-database` directory and follow the `README.md` to configure the question-service

5. Enter the `frontend` directory and follow the `README.md` to configure the frontend

6. Run `docker compose build` from the root directory to build the images and containers

7. Run `docker compose up` from the root directory to start the container 
(Note: this will only start the user & question service)

8. Enter the `frontend` directory and run `npm install`, followed by `npm run dev`.

9. Enter the `gateway` directory and run `npm install`, followed by `npm start`.

10. Visit http://localhost:3000 and create an account

## Developer guide

As of the last update of this README, only the user-service and question-service have been dockerized. A respective `Dockerfile` has been created within each of their folders. This `Dockerfile` specifies the instructions in order to build the container, install the necessary node modules etc. 

To simplify the container building, a `docker-compose.yml` has been created in order to start both containers at once. This is achieved through running `docker compose build` and `docker compose up` to call both dockerfiles.

The api-gateway requires more work, see https://dev.to/naseef012/create-a-microservices-app-with-dockerized-express-api-gateway-1kf9 for more information.

## Finishing Development

When you are done with developing, kill the program (Ctrl^C) and run `docker compose down`. This cleans up local resources used by docker.

Note: For Mac users, this doesn't work and volumes will continue to pile up. Run `docker system prune -a --volumes` occasionally to remove the remaining volumes.