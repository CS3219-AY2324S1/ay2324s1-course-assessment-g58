import express, { Request, Response } from "express";
import { SessionDataToDTO } from "../models/session";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

/**   This POST "/" endpoint creates a Session for a user
 *      @param { user1username, user2username, roomId, language, difficulty }
 *      @verifies existing Users
 */
router.post("/", async (req: Request, res: Response) => {
    const { user1username, user2username, roomId, language, difficulty } =
        req.body;

    // Verify user1 exists
    const user1 = await prisma.user.findUnique({
        where: {
            username: user1username,
        },
    });
    if (!user1) {
        return res.status(404).json({
            message: `User ${user1username} not found.`,
        });
    }

    // Verify user2 exists
    const user2 = await prisma.user.findUnique({
        where: {
            username: user2username,
        },
    });
    if (!user2) {
        return res.status(404).json({
            message: `User ${user2username} not found.`,
        });
    }

    // TODO: How do i / do i need to prevent the same party from recreating the same session?

    const currDate = new Date();

    // Return the sessions where the user was a part of
    const session = await prisma.session.create({
        data: {
            users: {
                connect: [user1username, user2username].map((username) => ({
                    username: username,
                })), // This links this session to both users
            },
            roomId: roomId,
            language: language,
            difficulty: difficulty,
            year: currDate.getFullYear(),
            month: currDate.getMonth(),
        },
        include: {
            users: {
                select: {
                    username: true,
                },
            },
        },
    });
    res.status(200).json(
        `Session created for ${session.users[0].username}, ${session.users[1].username}`
    );
});

/**   This GET "/user/:userId" endpoint retrieves all Sessions for a user, along with their partners and Responses
 *      Note, this uses a endpoint function to convert the Session object into a safe Data Transfer Object.
 *      @param userId from req.param
 *      @verifies an existing User
 */
router.get("/user/:username", async (req: Request, res: Response) => {
    const username = req.params.username as unknown as bigint;
    if (!username || typeof username != "string") {
        return res.status(404).json({
            message: `Expected username, received ${username}.`,
        });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
        where: {
            username: username,
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
                    id: user.id,
                },
            },
        },
        include: {
            responses: true,
            users: true,
        },
    });
    res.json(SessionDataToDTO(sessions));
});

/* The `router.get("/:username/past-year", async (req: Request, res: Response) => { ... })` endpoint is
used to retrieve the count of sessions a user had in the past year. */
router.get("/:username/past-year", async (req: Request, res: Response) => {
    const username = req.params.username as unknown as bigint;
    if (!username || typeof username != "string") {
        return res.status(404).json({
            message: `Expected username, received ${username}.`,
        });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });
    if (!user) {
        return res.status(404).json({
            message: `User ${user} not found.`,
        });
    }

    const currDate = new Date();
    // Return an array containing the date to count of sessions the user had in that period.
    // We return the past year's data only
    const pastYearSessionCount = await prisma.session.groupBy({
        by: ["year", "month"],
        _count: {
            _all: true,
        },
        where: {
            createdAt: {
                gte: new Date(
                    currDate.getFullYear() - 1,
                    currDate.getMonth(),
                    1
                ),
            },
            users: {
                some: {
                    username: username,
                },
            },
        },
        orderBy: {
            month: "asc",
        },
    });

    res.json(pastYearSessionCount);
});

/**   This DELETE "/" endpoint delete a Session
 *      @param { sessionId } as req body
 *      @verifies an existing Session
 *      @warn This will cause cascading deletion of responses
 */
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
