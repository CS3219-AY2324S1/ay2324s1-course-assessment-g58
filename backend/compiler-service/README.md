# Starting judge0 server (dev)
**Starting judge0 compiler server**
In root directory:
```
docker-compose up -d server db workers redis rabbitmq
```
Your instance of Judge0 CE v1.13.0 is now available at `localhost:2358`

Rabbitmq is running on `localhost:5672` (AMQP) and `localhost:15672` (GUI)

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
1. Running on localhost:3006

## Functions and calls
This is deprecated and unused. However, the server can handle this input, see tests directory

## Java
Java code must contain:
```java
public class Main {
    public static void main(String[] args) {

    }
}
```
Judge0 only runs main function of main class

## Test cases:
For frontend to register a failed testcase, ensure your driver code prints to `**STDERR**` in the following format:
```javascript
ASSERTION_ERROR_PATTERN = /AssertionError: Test (\d+): Expected .+, but got .+/;
```
If not the frontend wont know the first test case failed value, so failed test cases will not show up in UI