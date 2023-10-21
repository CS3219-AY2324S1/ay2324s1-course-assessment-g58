import { Socket } from "socket.io";

const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    // Allow connections from localhost:3000
    cors: {
        origin: ["http://localhost:3000", "https://ay2324s1-course-assessment-g58.vercel.app"],
        methods: ["GET", "POST"],
    },
});

// Store users in a queue
const queue: User[] = [];

// Handle new connections
io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    // Handle request to join the queue
    socket.on("joinQueue", (request) => {
        const user = {
            socketId: socket.id,
            userId: request.userId,
            difficulty: request.difficulty,
            language: request.language,
        };

        addToQueue(user);
        findMatch(user, socket); // Pass the socket object to the findMatch function
    });

    // Handle disconnections
    socket.on("disconnect", () => {
        console.log("A user disconnected");
        removeFromQueue(socket.id);
    });
});

// Add user to the queue
function addToQueue(user: User) {
    queue.push(user);
    console.log("User added to the queue:", user);
}

// Remove user from the queue
function removeFromQueue(socketId: string) {
    const index = queue.findIndex((user) => user.socketId === socketId);
    if (index !== -1) {
        const removedUser = queue.splice(index, 1)[0];
        console.log("User removed from the queue:", removedUser);
    }
}

// Find a match for the user
async function findMatch(user: User, socket: Socket) {
    const matchingUser = queue.find((otherUser) => {
        return (
            otherUser.socketId !== user.socketId &&
            otherUser.difficulty === user.difficulty &&
            otherUser.language === user.language
        );
    });

    if (matchingUser) {
        // Remove both users from the queue
        removeFromQueue(user.socketId);
        removeFromQueue(matchingUser.socketId);

        // Create a room for communication
        const roomName = `${user.socketId}-${matchingUser.socketId}`;
        user.roomId = roomName;
        matchingUser.roomId = roomName;

        // Get questions for the room
        const response = await fetch(
            (process.env.GATEWAY_SERVER_URL as string) +
                (process.env.QUESTION_SERVICE_GET_QUESTION_ENDPOINT as string)
        );
        console.log(response);

        var questions: Question[] = [];

        if (response) {
            questions = await response.json();
            console.log(questions);
        } else {
            console.log("Error getting questions");
        }

        user.questions = questions;
        matchingUser.questions = questions;

        // Join the room
        socket.join(roomName);
        io.to(matchingUser.socketId).emit("match", user);
        io.to(user.socketId).emit("match", matchingUser);

        console.log(
            "Match found:",
            user.userId,
            matchingUser.userId,
            matchingUser.roomId
        );
        console.log("Room created:", roomName);
    } else {
        console.log("No match found for:", user);
    }
}

// Start the server
http.listen(3004, () => {
    console.log("Server listening on port 3004");
});

interface User {
    socketId: string;
    userId: string;
    difficulty: string;
    language: string;
    roomId?: string;
    questions?: Question[];
}

export type Question = {
    _id: string;
    title: string;
    description: string;
    difficulty: string;
    category: string;
};
