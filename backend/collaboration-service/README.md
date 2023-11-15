# Getting Started with Collaboration-service

1. Run `npm install` to install all the dependencies

1. To run development server, do `npm run dev`

-   Do `npm run build` to compile for production before running `npm start`

# Testing

1. Open a new terminal window and do `npm run start-all`

**Expected output**

```
...
[0] Server listening on port  3005
[0] New connection with roomId: 1
[1] Client 1 connected to the server
[0] New connection with roomId: 2
[3] Client 3 connected to the server
[0] New connection with roomId: 1
[2] Client 2 connected to the server
[0] Message received from server: Hello from Client 1
[2] Received message from client 2: Hello from Client 1 (excluding sender)
[1] Received message from client 1: Hello from Client 1 (including sender)
[2] Received message from client 2: Hello from Client 1 (including sender)
```

Explanation: client 1 and 2 are in the same room (1) and client 3 is in a different room (2). Client 1 emits a broadcast to server. Server receives broadcast and sends it to room (1). Client 2 receives msg. Client 1 does not receive as it is the original sender and client 3 does not receive as it is in a different room (2). The sender client 1 receives the message when `io.socket.in(room).emit()` is used, as it sends to sender as well
