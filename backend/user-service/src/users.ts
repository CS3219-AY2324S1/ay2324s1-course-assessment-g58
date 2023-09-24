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
            admin: true,
        },
    });

    res.json(newUser);
});

router.put("/", async (req: Request, res: Response) => {
    const { email, username } = req.body;
    if (!email || !username) {
        res.status(400).json({
            message: "Email and name are required for updating.",
        });
        return;
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!existingUser) {
        res.status(404).json({
            message: `User with email: ${email} not found.`,
        });
        return;
    }

    const updateUser = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            username: username,
        },
    });

    res.json(updateUser);
});

export default router;
