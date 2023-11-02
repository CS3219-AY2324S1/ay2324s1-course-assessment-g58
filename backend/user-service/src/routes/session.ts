import express, { Request, Response } from "express";
import { SessionDataToDTO } from "../models/session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    const { user1Id, user2Id } = req.body;

    // Verify user1 exists
    const user1 = await prisma.user.findUnique({
        where: {
            id: user1Id,
        },
    });
    if (!user1) {
        return res.status(404).json({
            message: `User ${user1Id} not found.`,
        });
    }

    // Verify user2 exists
    const user2 = await prisma.user.findUnique({
        where: {
            id: user2Id,
        },
    });
    if (!user2) {
        return res.status(404).json({
            message: `User ${user2Id} not found.`,
        });
    }

    // How do i prevent the same party from recreating the same session?

    // Return the sessions where the user was a part of
    const session = await prisma.session.create({
        data: {
            users: {
                connect: [user1Id, user2Id].map((userId) => ({ id: userId })), // This links this session to both users
            },
        },
        include: {
            users: {
                select: {
                    username: true,
                },
            },
        },
    });
    res.json(
        `Session created for ${session.users[0].username}, ${session.users[1].username}`
    );
});

router.get("/user/:userId", async (req: Request, res: Response) => {
    const userId = req.params.userId as unknown as bigint;

    if (!userId) {
        return res.status(404).json({
            message: `Missing userId.`,
        });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        return res.status(404).json({
            message: `User ${user} not found.`,
        });
    }

    // Return the sessions where the user was a part of, and include responses and users
    const sessions = await prisma.session.findMany({
        where: {
            users: {
                some: {
                    id: userId,
                },
            },
        },
        include: {
            responses: true,
            users: true,
        },
    });
    // @ts-ignore
    res.json(SessionDataToDTO(sessions));
});

router.delete("/", async (req: Request, res: Response) => {
    const { sessionId } = req.body;

    // Verify session exists
    const existingSession = await prisma.session.findUnique({
        where: {
            id: sessionId,
        },
    });
    if (!existingSession) {
        return res.status(404).json({
            message: `Session ${sessionId} not found.`,
        });
    }

    // Note cascade deletion of responses
    const sessions = await prisma.session.delete({
        where: {
            id: sessionId,
        },
    });
    res.status(200).json({ message: "Session deleted successfully!" });
});

export default router;
