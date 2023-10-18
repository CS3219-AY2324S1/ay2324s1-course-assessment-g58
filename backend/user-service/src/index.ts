import express, { Application } from "express";
import userRouter from "./routes/users";
import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import tokenRouter from "./routes/tokenLogin";
import { authenticate } from "./middleware/authorize";

require('dotenv').config();

const app: Application = express();

const port = parseInt(process.env.NEXT_PUBLIC_PORT_NUMBER as string);
if (isNaN(port)) console.error("Expected a number for port, received:", port);

app.listen(process.env.NEXT_PUBLIC_PORT_NUMBER, () =>
    console.log(`Server started on port ${process.env.NEXT_PUBLIC_PORT_NUMBER}`)
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/users", userRouter);
app.use("/api/token-login", authenticate, tokenRouter);
