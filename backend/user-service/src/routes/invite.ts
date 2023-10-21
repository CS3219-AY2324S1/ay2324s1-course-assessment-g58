import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

/** The post "/" endpoint creates the invitation for user.
 *
 *  @returns status 200 OK if invitee added to invitation table.
 *  @returns status 400 Bad Request if invitation creation failed.
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
            email: true,
        },
    });
    if (!newInvitation) {
        res.status(400).json({
            message: `Failed to create new Invitation`,
        });
        return;
    }

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
