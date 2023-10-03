import express, { Express } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app: Express = express();
app.use(cors());
const PORT = process.env.PORT || 3005;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// handle '/' route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Start the server
httpServer.listen(PORT, () => {
    console.log("Server listening on port ", PORT);
});
