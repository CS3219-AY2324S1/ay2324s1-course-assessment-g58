import express, { Request, Response } from "express";
import { PrismaClient, ResponseStatus } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

/**   This POST "/" endpoint creates a Response for a specific Session and Question
 *      @param { sessionId, questionId, text, language, status } as POST body
 *      @verifies an existing Session
 *      @assumes unique (SessionId, QuestionId) key for each response
 */
router.post("/", async (req: Request, res: Response) => {
    const { sessionId, questionId, text, language, status } = req.body;

    // Verify session exists
    const existingSession = await prisma.session.findUnique({
        where: {
            id: sessionId,
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
            sessionId: sessionId,
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

    // Assign enum
    let responseStatus;
    if (status === "WRONG") {
        responseStatus = ResponseStatus.WRONG;
    } else if (status === "SUCCESS") {
        responseStatus = ResponseStatus.SUCCESS;
    } else {
        return res.status(404).json({
            message: `Expected responsestatus enum value, received ${status}`,
        });
    }

    if (existingResponse.length > 0) {
        const updatedResponse = await prisma.response.update({
            where: {
                id: existingResponse[0].id,
            },
            data: {
                language: language,
                text: text,
                status: responseStatus,
            },
        });

        console.log(updatedResponse);

        res.status(200).json({ message: "Response updated successfully!" });
    } else {
        const newResponse = await prisma.response.create({
            data: {
                questionId: questionId,
                language: language,
                text: text,
                status: responseStatus,
                sessionId: existingSession.id,
            },
        });

        console.log(newResponse);

        res.status(200).json({ message: "Response created successfully!" });
    }
});

export default router;
