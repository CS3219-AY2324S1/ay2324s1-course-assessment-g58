import { User, Response } from "@prisma/client";

interface SessionDTO {
    id: string;
    createdAt: Date;
    language: string;
    difficulty: string;
    users: {
        username: string;
    }[];
    responses: {
        questionId: string;
        text: string;
    }[];
}

/**
 * The function `SessionDataToDTO` takes an array of session objects and maps them to an array of
 * session DTOs. This avoids the bigint jsonify issue.
 * @param {any} sessions - An array of session objects. Each session object has the following
 * properties:
 * @returns an array of SessionDTO objects.
 */
export const SessionDataToDTO = (sessions: any) => {
    const sessionDTOs: SessionDTO[] = [];
    for (let i = 0; i < sessions.length; i++) {
        const mappedUsers = sessions[i].users.map((user: User) => ({
            username: user.username,
        }));
        const mappedResponses = sessions[i].responses.map(
            (response: Response) => ({
                questionId: response.questionId,
                text: JSON.stringify(response.text),
            })
        );
        const sessionDTO: SessionDTO = {
            id: sessions[i].id.toString(),
            language: sessions[i].language,
            difficulty: sessions[i].difficulty,
            createdAt: sessions[i].createdAt,
            users: mappedUsers,
            responses: mappedResponses,
        };
        sessionDTOs.push(sessionDTO);
    }

    return sessionDTOs;
};
