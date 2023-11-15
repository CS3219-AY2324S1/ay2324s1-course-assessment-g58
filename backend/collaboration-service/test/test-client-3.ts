import { io } from "socket.io-client";

const PORT = process.env.PORT || 3005;

// Connect to the server
const socket = io(`http://localhost:${PORT}`, {
    auth: {
        roomId: "2" // Provide a dummy roomId for testing
    }
});

socket.on("connect", () => {
    console.log("Client 3 connected to the server");
});

socket.on("message", (message) => {
    console.log("Received message from client 3:", message);
});

socket.on("disconnect", () => {
    console.log("Disconnected from the server");
});
