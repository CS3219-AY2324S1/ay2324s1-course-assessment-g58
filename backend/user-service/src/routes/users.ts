import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken, getUserData, hashPassword } from "../utils/authHelpers";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: {
            email: true,
            username: true,
        },
    });
    res.json(users);
});

router.post("/", async (req: Request, res: Response) => {
    const { username, email, password, admin } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (existingUser) {
        res.status(403).json({
            message: `Email: ${email} is already being used`,
        });
        return;
    }

    const duplicateUser = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    if (duplicateUser) {
        return res.status(409).json({
            message: `User with username: ${username} already exists.`,
        });
    }

    const newUser = await prisma.user.create({
        data: {
            username: username,
            email: email,
            password: await hashPassword(password),
            admin: admin,
        },
        select: {
            username: true,
            email: true,
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
        return res.status(404).json({
            message: `User with email: ${email} not found.`,
        });
    }

    const duplicateUser = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    if (duplicateUser) {
        return res.status(409).json({
            message: `User with username: ${username} already exists.`,
        });
    }

    const updateUser = await prisma.user.update({
        where: {
            email: email,
        },
        data: {
            username: username,
        },
        select: {
            username: true,
            email: true,
            admin: true,
        },
    });

    const newToken = generateToken(updateUser);

    res.status(200).json({ token: newToken, user: updateUser });
});

router.delete("/", async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: "Email is required for deletion." });
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

    const deletedUser = await prisma.user.delete({
        where: {
            email: email,
        },
        select: {
            username: true,
            email: true,
            admin: true,
        },
    });
    res.status(200).json(deletedUser);
});

export default router;
