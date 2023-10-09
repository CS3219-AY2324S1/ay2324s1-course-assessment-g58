import express, { Express } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { ExtendedSocket } from "./models/ExtendedSocket";

const app: Express = express();
app.use(cors());
const PORT = process.env.PORT || 3005;

const httpServer = http.createServer(app);

// Protect our server by only allowing connections from our frontend
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// TODO: protect our server against direct, maybe malicious socket.io connections

// handle '/' route for testing
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
httpServer.listen(PORT, () => {
    console.log("Server listening on port ", PORT);
});

// Middleware function for all incoming socket connections
io.use((socket: Socket, next) => {
    // Cast socket to ExtendedSocket
    const extendedSocket = socket as ExtendedSocket;

    // Get roomid from incoming frontend connection
    const roomId = socket.handshake.auth.roomId;
    if (!roomId) {
        return;
    }
    extendedSocket.roomId = roomId;
    next();
});

// Handle new connection
io.on("connection", (socket: Socket) => {
    const extendedSocket = socket as ExtendedSocket;
    console.log("New connection with roomId:", extendedSocket.roomId);
    extendedSocket.join(extendedSocket.roomId);

    // Listen for incoming event from this `extendedSocket` instance
    extendedSocket.on("roleSwitch", () => {
        // Broadcast the message to all other clients in the room
        io.sockets.in(extendedSocket.roomId).emit("changeRole");
    });
    extendedSocket.on("interviewer chosen", () => {
        // Broadcast the message to all other clients in the room
        io.sockets.in(extendedSocket.roomId).emit("interviewer-chosen");
    });
    extendedSocket.on("interviewee chosen", () => {
        // Broadcast the message to all other clients in the room
        io.sockets.in(extendedSocket.roomId).emit("interviewee-chosen");
    });

    // USED FOR TESTING- update test scripts before removing
    extendedSocket.on("message", (message) => {
        console.log("Message received from server:", message);
        // Broadcast the message to all other clients in the room
        extendedSocket.to(extendedSocket.roomId).emit("message", message);
    });
    extendedSocket.join(extendedSocket.roomId);

    // Handle text edit event
    extendedSocket.on("editEvent", (event) => {
        console.log(event.changes);
        extendedSocket.broadcast.to(extendedSocket.roomId).emit("text", event);
    });

    // Handle selection event
    extendedSocket.on("selection", (event) => {
        console.log("selection received on backend");
        console.log(event);
        extendedSocket.broadcast
            .to(extendedSocket.roomId)
            .emit("select", event);
    });
});
