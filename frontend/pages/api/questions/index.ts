import { HttpError, ResponseData, fetchDelete, fetchGet, fetchPost, fetchPut } from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === "POST") {
        const { title, description, complexity, category } = req.body;
        try {
            const response = await fetchPost(
                process.env.NEXT_PUBLIC_QUESTION_SERVER_URL as string, {
                    title: title,
                    description: description,
                    difficulty: complexity,
                    category: category
                }
            );
            return res.json({ status: 201, data: response });
        } catch (error) {
            if (error instanceof HttpError) {
                return res.json({ status: error.status, message: error.message })
            } else {
                return res.json({ status: 400, data: error })
            }
        }
    } else if (req.method === "GET") {
        try {
            const response = await fetchGet(
                process.env.NEXT_PUBLIC_QUESTION_SERVER_URL as string
            );
            return res.json({ status: 200, data: response });
        } catch (error) {
            if (error instanceof HttpError) {
                return res.json({ status: error.status, message: error.message })
            } else {
                return res.json({ status: 400, data: error })
            }
        }
    }
}