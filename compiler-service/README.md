# Starting judge0 server (dev)
**First use**
```
cd judge0-v1.13.0
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```
Your instance of Judge0 CE v1.13.0 is now available at `localhost:2358`
Subsequently run `docker-compose up -d` to start

# Compile service
1. `npm install`
1. `npm run dev`
1. Running on localhost:3005

## Input:
`Post` to `localhost:3005` with body of `language`, `source_code` and `tests`. `language` should be `c`, `c++`, `python` or `java`
## Output: 
res body contains `stdout`, `stderr`, `status_id`, `time`, `memory`