import express, { Application } from "express";
import userRouter from "./routes/users";
import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";

const app: Application = express();

const port = parseInt(process.env.NEXT_PUBLIC_PORT_NUMBER as string);
if (isNaN(port)) console.error("Expected a number for port, received:", port);

app.listen(process.env.NEXT_PUBLIC_PORT_NUMBER, () =>
    console.log(`Server started on port ${process.env.NEXT_PUBLIC_PORT_NUMBER}`)
);

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// app.use("/api/users", require("./routes/api/users"));
app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/users", userRouter);

app.listen(process.env.NEXT_PUBLIC_PORT_NUMBER, () =>
    console.log("Server started at port", port)
);
