import express, { Request, Response } from "express";
import nodemailer from "nodemailer";

require("dotenv").config();

const router = express.Router();

const transporter = nodemailer.createTransport({
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
        user: "peerprep@ryanchuahj.com",
        pass: process.env.SMTP_PASSWORD,
    },
});

// https://nodemailer.com/about/
router.post("/", async (req: Request, res: Response) => {
    const { inviteeEmail, inviteId } = req.body;
    const inviteLink = `${process.env.FRONTEND_URL}/admin-signup?email=${inviteeEmail}&id=${inviteId}`;
    console.log("Generated invite:", inviteLink);
    const info = await transporter.sendMail({
        from: '"PeerPrep" <peerprep@ryanchuahj.com>',
        to: inviteeEmail,
        subject: "Invitation to join PeerPrep",
        text: `Hello, You've been invited to become an admin at PeerPrep. Click the link to join now! ${inviteLink}. Best wishes, PeerPrep team`,
        html: `
            <p>Hello,</p>
            <p>You've been invited to become an admin at PeerPrep. Click the link below to join now!</p>
            <p style="padding: 12px; font-style: italic;">
            <a href="${inviteLink}">${inviteLink}</a>
            </p>
            <p>
            Best wishes,
            <br>PeerPrep team
            </p>
        `,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: `Email sent to ${inviteeEmail}` });
});

export default router;
