import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

/**   This POST "/" endpoint creates a Response for a specific Session and Question
 *      @param { roomId, questionId, text, language } as POST body
 *      @verifies an existing Session
 *      @assumes unique (roomId->SessionId, QuestionId) key for each response
 */
router.post("/", async (req: Request, res: Response) => {
    const { roomId, questionId, text, language } = req.body;

    // Verify session exists
    const existingSession = await prisma.session.findFirst({
        where: {
            roomId: roomId,
        },
    });
    if (!existingSession) {
        return res.status(404).json({
            message: "SessionId for response not found.",
        });
    }

    // Search for response already exists
    const existingResponse = await prisma.response.findMany({
        where: {
            sessionId: existingSession.id,
            questionId: questionId,
        },
    });

    if (existingResponse.length > 1) {
        console.log(
            "Unexpected Error: response with identical session & question id"
        );
        return res.status(404).json({
            message:
                "Unexpected Error: response with identical session & question id",
        });
    }

    if (existingResponse.length > 0) {
        const updatedResponse = await prisma.response.update({
            where: {
                id: existingResponse[0].id,
            },
            data: {
                text: text,
            },
        });

        console.log(updatedResponse);

        res.status(200).json({ message: "Response updated successfully!" });
    } else {
        const newResponse = await prisma.response.create({
            data: {
                questionId: questionId,
                text: text,
                sessionId: existingSession.id,
            },
        });

        console.log(newResponse);

        res.status(200).json({ message: "Response created successfully!" });
    }
});

export default router;
