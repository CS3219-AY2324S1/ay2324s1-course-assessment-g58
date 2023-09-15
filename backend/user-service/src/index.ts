import express, { Application } from "express";
import { Request, Response } from "express";
import userRouter from "./users";

const app: Application = express();
const port = parseInt(process.env.NEXT_PUBLIC_PORT_NUMBER as string);
if (isNaN(port)) console.error("Expected a number for port, received:", port);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// app.use("/api/users", require("./routes/api/users"));
app.use("/api/users", userRouter);

app.listen(process.env.NEXT_PUBLIC_PORT_NUMBER, () => console.log("Server Started"));