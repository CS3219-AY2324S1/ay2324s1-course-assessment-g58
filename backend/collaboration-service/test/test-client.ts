import { io } from "socket.io-client";

const PORT = process.env.PORT || 3005;

// Connect to the server
const socket = io(`http://localhost:${PORT}`, {
    auth: {
        roomId: "1" // Provide a dummy roomId for testing
    }
});

socket.on("connect", () => {
    console.log("Client 1 connected to the server");

    // Emit a message after 2 seconds of connecting
    setTimeout(() => {
        socket.emit('message', 'Hello from Client 1');
    }, 2000);
});

socket.on("message", (message) => {
    console.log("Received message from client 1:", message);
});

socket.on("disconnect", () => {
    console.log("Disconnected from the server");
});
