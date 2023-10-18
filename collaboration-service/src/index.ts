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

const acceptances: { [roomId: string]: Set<string> } = {};

// TODO: protect our server against direct, maybe malicious socket.io connections

// handle '/' route for testing
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start the server
httpServer.listen(PORT, () => {
    console.log("Server listening on port", PORT);
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
        // Broadcast the message to all other clients in the room, exlcuding sender
        extendedSocket.broadcast
            .to(extendedSocket.roomId)
            .emit("message", message + " (excluding sender)");
        // Broadcast the message to everyone in the room including sender
        io.sockets
            .in(extendedSocket.roomId)
            .emit("message", message + " (including sender)");
    });

    // Broadcast intention to move to next question to a room (including sender)
    extendedSocket.on("openNextQuestionPrompt", () => {
        io.sockets.in(extendedSocket.roomId).emit("openNextQuestionPrompt");
    });

    // Receive request by a user to move to next question, wait for all users to accept
    // before broadcasting to all users in the room
    extendedSocket.on("aUserHasAcceptedNextQuestionPrompt", () => {
        console.log(extendedSocket.id, " accepted");

        // Initialize the set for the room if it doesn't exist
        if (!acceptances[extendedSocket.roomId]) {
            acceptances[extendedSocket.roomId] = new Set();
        }

        // Add the user's socket ID to the set
        acceptances[extendedSocket.roomId].add(extendedSocket.id);

        // Check if all clients in the room have accepted
        const numClientsInRoom =
            io.sockets.adapter.rooms.get(extendedSocket.roomId)?.size || 0;
        console.log("clients in room:", numClientsInRoom);
        console.log(
            "total clients in room: ",
            io.sockets.adapter.rooms.get(extendedSocket.roomId)
        );
        // Need times 2 as each client has 2 sockets- general and for code editor
        if (acceptances[extendedSocket.roomId].size * 2 === numClientsInRoom) {
            io.sockets
                .in(extendedSocket.roomId)
                .emit("proceedWithNextQuestion");
            // Delete as users have moved on to next qn, reset this
            delete acceptances[extendedSocket.roomId];
        }
    });

    // Receive message that a user doesn't want to move on, reset all 'acceptances' for the room
    extendedSocket.on("aUserHasRejectedNextQuestionPrompt", () => {
        console.log(extendedSocket.id, " rejected");
        delete acceptances[extendedSocket.roomId];
        io.sockets
            .in(extendedSocket.roomId)
            .emit("dontProceedWithNextQuestion");
    });

    // Handle text edit event
    extendedSocket.on("editEvent", (event) => {
        console.log("edit");
        console.log(extendedSocket.roomId);
        extendedSocket.broadcast.to(extendedSocket.roomId).emit("text", event);
    });

    // Handle selection event
    extendedSocket.on("selection", (event) => {
        console.log("select");
        extendedSocket.broadcast
            .to(extendedSocket.roomId)
            .emit("select", event);
    });

    extendedSocket.on("disconnect", (reason) => {
        console.log(
            "Socket disconnected:",
            extendedSocket.id,
            "\nReason: ",
            reason
        );
    });
});
