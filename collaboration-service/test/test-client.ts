import { io } from "socket.io-client";

const PORT = process.env.PORT || 3005;

// Connect to the server
const socket = io(`http://localhost:${PORT}`, {
    auth: {
        roomId: "1" // Provide a dummy roomId for testing
    }
});

socket.on("connect", () => {
    console.log("Connected to the server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from the server");
});
