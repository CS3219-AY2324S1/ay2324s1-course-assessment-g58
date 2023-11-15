import express, { Application } from "express";
import userRouter from "./routes/users";
import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import tokenRouter from "./routes/tokenLogin";
import inviteRouter from "./routes/invite";
import sessionRouter from "./routes/session";
import responseRouter from "./routes/response";
import { authenticate, authorize } from "./middleware/authorize";

require("dotenv").config();

const app: Application = express();

const port = parseInt(process.env.NEXT_PUBLIC_PORT_NUMBER as string);
if (isNaN(port)) console.error("Expected a number for port, received:", port);

const server = app.listen(process.env.NEXT_PUBLIC_PORT_NUMBER, () =>
  console.log(`Server started on port ${process.env.NEXT_PUBLIC_PORT_NUMBER}`)
);

server.keepAliveTimeout = 65 * 1000;

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/session", sessionRouter);
app.use("/api/response", responseRouter);
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/users", userRouter);
app.use("/api/invite", authorize, inviteRouter);
app.use("/api/token-login", authenticate, tokenRouter);

// Health Check
app.get("/", (req, res) => {
  res.send("Hello from user-service!");
});
