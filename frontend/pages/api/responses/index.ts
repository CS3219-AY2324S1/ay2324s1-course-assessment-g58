import Question from "@/types/Question";
import {
    HttpError,
    ResponseData,
    fetchDelete,
    fetchGet,
    fetchPost,
    fetchPut,
} from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === "POST") {
        const { text, questionId, roomId, language } = req.body;
        try {
            const express_gateway: string =
                (process.env.GATEWAY_SERVER_URL as string) + "/api/response";
            const response = await fetchPost(express_gateway as string, {
                text: text,
                questionId: questionId,
                roomId: roomId,
                language: language,
            });
            return res.json({ status: 201, data: response });
        } catch (error) {
            if (error instanceof HttpError) {
                return res.json({
                    status: error.status,
                    message: error.message,
                });
            } else {
                return res.json({ status: 400, data: error });
            }
        }
    } else {
        return res.json({ status: 405, message: "Method not allowed" });
    }
}
