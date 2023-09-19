import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken, hashPassword, verifyUser } from "./auth/auth";

const prisma = new PrismaClient();
const router = express.Router();

console.log("userRouter launched");

router.get("/", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

router.post("/", async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (existingUser) {
        console.error(`Email: ${email}is already being used`);
        res.sendStatus(403);
    }

    const newUser = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: await hashPassword(password),
            proficiency: "Beginner",
            role: "admin",
        },
    });

    res.json(newUser);
});

export default router;
