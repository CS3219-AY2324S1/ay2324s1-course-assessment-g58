import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import dotenv from 'dotenv';

// Internal modules
import { QuestionRouter } from './routes/question.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app: Application = express();

// Get port number from .env
const PORT = parseInt(process.env.NEXT_PUBLIC_PORT_NUMBER as string);

// Middleware
app.use(json());

// Routes
app.use(QuestionRouter);

// Database connection
const db = mongoose.connection;
mongoose.connect(process.env.DB_CONN_STRING as string);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to DB');
});

// Basic error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Health Check
app.get("/", (req, res) => {
    res.send("Hello from question-service!")
})

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.keepAliveTimeout = 65 * 1000;

