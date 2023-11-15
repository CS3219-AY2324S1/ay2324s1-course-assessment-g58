# Getting Started with User-Service

1. Run `npm install` to install all the dependencies

# Testing
**Removed from package.json**: `"test": "concurrently \"npm start && wait-on http://localhost:3004\" \"npm run test-client\" \"npm run test-client-2\""`

1. Open a terminal window and run npm run test. The test clients will run in parallel. Output from both clients will be displayed in the same terminal window with the following format:

```
[<client name>] <message>
```

Note: The test clients will run indefinitely until the terminal window is closed.
