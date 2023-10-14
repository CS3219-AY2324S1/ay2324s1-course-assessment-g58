# Starting judge0 server (dev)
**Starting judge0 compiler server**
```
cd judge0-v1.13.0
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s
```
Your instance of Judge0 CE v1.13.0 is now available at `localhost:2358`

**Shutting down**
`docker-compose down`

**Error handling on subsequent launches (windows)**
If your server-1 keeps crashing on subsequent launches, do:
1. Open `wsl`
1. `dos2unix judge0.conf` (install `dos2unix` if needed)
1. Try starting judge0 again with instructions above

# Compile service
1. `npm install`
1. `npm run dev`
1. Running on localhost:3005

## Input:
`Post` to `localhost:3005` with body of `language`, `source_code`, `testFunction: String` and `tests`. 

`language`:
Should be `c`, `c++`, `python` or `java`

`testFunction`:
For now we only handle single function leetcode qns. The value of `testFunction` is the name of the function the user has to fill up with their answer

`tests`:
```typescript
export interface Test {
    input: string;
    expectedOutput: string;
}

export type Tests = Test[];

/* eg:
"tests": [
        {
            "input": "1, 2",
            "expectedOutput": "3"
        },
        {
            "input": "3, 4",
            "expectedOutput": "7"
        }
    ]
}
*/
```

## Output: 
res body contains `stdout`, `stderr`, `status_id`, `time`, `memory`

# Testing
Run `npm test`