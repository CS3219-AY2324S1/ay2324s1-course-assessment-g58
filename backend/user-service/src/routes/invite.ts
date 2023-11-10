import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
});
const router = express.Router();
const ADMIN_LIMIT = 10; // A limit of 10 admins

/** The get "/" endpoint gets the invitations created by the user.
 *
 *  @returns status 200 OK and invitations.
 *  @returns status 404 Not Found if inviter email hasn't created any invitations or email is not an admin
 */
router.get("/", async (req: Request, res: Response) => {
    const invitations = await prisma.invitation.findMany({
        select: {
            email: true,
        },
    });
    if (!invitations) {
        res.status(404).json({
            message: `No Invitations found`,
        });
        return;
    } else {
        // convert invitations to a string[]
        const data: string[] = [];
        for (const index in invitations) {
            data.push(invitations[index].email);
        }
        res.status(200).json(data);
    }
});

/** The post "/" endpoint creates the invitation for user.
 *  This endpoint only creates an invitation if the total number of admins and invitations is less than the admin limit.
 *  This endpoint also sends a email request to the email-service
 *
 *  @returns status 200 OK if invitee added to invitation table.
 *  @returns status 400 Bad Request if invitation creation failed or admin limit has been reached.
 *  @returns status 404 Not Found if inviter email doesn't exist in user table
 */
router.post("/", async (req: Request, res: Response) => {
    const { email, inviteeEmail } = req.body;

    // Verify admin
    const inviter = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!inviter) {
        res.status(404).json({
            message: `Inviter: ${email} not found`,
        });
        return;
    }

    // Count number of admins
    const adminCount = await prisma.user.count({
        where: {
            admin: true,
        },
    });
    const invitationCount = await prisma.invitation.count();
    if (adminCount + invitationCount >= ADMIN_LIMIT) {
        res.status(400).json({
            message: `Admin count has reached limit.`,
        });
        return;
    }

    // Update/Insert invitation
    const newInvitation = await prisma.invitation.upsert({
        where: {
            email: inviteeEmail,
        },
        create: {
            email: inviteeEmail,
            userId: inviter.id,
        },
        update: {
            createdAt: new Date(),
        },
        select: {
            id: true,
            email: true,
        },
    });
    if (!newInvitation) {
        res.status(400).json({
            message: `Failed to create new Invitation`,
        });
        return;
    }

    // Send request to email-service
    await fetch(process.env.EMAIL_SERVICE_URL as string, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
            inviteeEmail: inviteeEmail,
            inviteId: newInvitation.id.valueOf(),
        }),
    }).then((response) => {
        if (response.status !== 200) {
            console.log("Received response:", response);
            res.status(400).json({
                message: `Failed to send new Email`,
            });
            return;
        }
    });

    res.status(201).json(`Invite: ${newInvitation.email} has been created`);
});

/** The "/" delete endpoint deletes the invitation for user.
 *
 *  @returns status 200 OK if invitee added to invitation table.
 *  @returns status 400 Bad Request if invitation creation failed.
 *  @returns status 404 Not Found if inviter email doesn't exist in user table
 */
router.delete("/", async (req: Request, res: Response) => {
    const { email, inviteeEmail } = req.body;

    // Verify admin
    const inviter = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!inviter) {
        res.status(404).json({
            message: `Inviter: ${email} not found`,
        });
        return;
    }

    const inviteToDelete = await prisma.invitation.findUnique({
        where: {
            email: inviteeEmail,
        },
    });

    if (!inviteToDelete) {
        res.status(404).json(`${inviteeEmail} invite not found`);
        return;
    }

    // Delete invite
    const deletedInvite = await prisma.invitation.delete({
        where: {
            email: inviteeEmail,
        },
        select: {
            email: true,
        },
    });
    if (!deletedInvite) {
        res.status(400).json({
            message: `Failed to delete invitation for ${inviteeEmail}`,
        });
        return;
    }

    res.status(200).json(`Invite: ${deletedInvite.email} has been deleted`);
});

export default router;
