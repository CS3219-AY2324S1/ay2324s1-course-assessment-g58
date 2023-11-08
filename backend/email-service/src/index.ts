import express, { Application, Request, Response } from "express";
import emailRouter from "./routes/email";
require("dotenv").config();

const app = express();

const port = parseInt(process.env.NEXT_PUBLIC_PORT_NUMBER as string);
if (isNaN(port)) console.error("Expected a number for port, received:", port);

app.listen(process.env.NEXT_PUBLIC_PORT_NUMBER, () =>
    console.log(`Server started on port ${process.env.NEXT_PUBLIC_PORT_NUMBER}`)
);

app.use(express.json());

app.use("/email", emailRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from email-service!");
});
