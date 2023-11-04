import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken, hashPassword } from "../utils/authHelpers";

const prisma = new PrismaClient();
const router = express.Router();
const INVITATION_EXPIRY = 7; // An invitation expires in a week

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

    // Check if email is being used
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

    // Check if username is being used
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

    // Delete invitation if present and create user
    const newUser = await prisma.$transaction(async (tx) => {
        if (admin) {
            await prisma.invitation.delete({
                where: {
                    email: email,
                },
            });
        }
        return await prisma.user.create({
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

/** The "/verify-invitation" endpoint verifies if the user is qualified to be at the admin signup page
 *  based on their invitation presence and validity.
 *  Validity period is set by above constant. It is verified against invitation createdAt time.
 *
 *  @returns status 200 OK if user is verified to sign-up as admin
 *  @returns status 404 Not Found if user email doesn't exist in invitation table
 *  @returns status 410 Gone if link has already expired.
 */
router.post("/verify-invitation", async (req: Request, res: Response) => {
    const { id } = req.body;
    const invitedUser = await prisma.invitation.findUnique({
        where: {
            id: id,
        },
        select: {
            email: true,
            createdAt: true,
        },
    });

    if (!invitedUser) {
        res.status(404).json({
            message: `Id: ${id} not found in invitations`,
        });
        return;
    }

    const millisecondsToDays = 1000 * 60 * 60 * 24;
    const timeDifference =
        new Date().getTime() - invitedUser.createdAt.getTime();
    const differenceInDays = timeDifference / millisecondsToDays;

    if (differenceInDays > INVITATION_EXPIRY) {
        res.status(403).json({
            message: `Invitation expired`,
        });
        return;
    }

    res.status(200).json(`${id} has an invitation`);
});

export default router;
