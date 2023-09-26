import { HttpError, ResponseData, fetchDelete, fetchGet, fetchPost, fetchPut } from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === "POST") {
        const { _id, title, description, difficulty, category } = req.body;
        try {
            const response = await fetchPost(
                process.env.NEXT_PUBLIC_ADD_QUESTION_SERVER_URL as string, {
                    _id: _id,
                    title: title,
                    description: description,
                    difficulty: difficulty,
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
                process.env.NEXT_PUBLIC_GET_QUESTION_SERVER_URL as string
            );
            return res.json({ status: 200, data: response });
        } catch (error) {
            if (error instanceof HttpError) {
                return res.json({ status: error.status, message: error.message })
            } else {
                return res.json({ status: 400, data: error })
            }
        }
    } else if (req.method === "DELETE") {
        const { _id, title, description, difficulty, category } = req.body;
        try {
            const response = await fetchDelete(
                process.env.NEXT_PUBLIC_DELETE_QUESTION_SERVER_URL as string, {
                    _id: _id,
                    title: title,
                    description: description,
                    difficulty: difficulty,
                    category: category
                }
            );
            return res.json({ status: 200, data: response });
        } catch (error) {
            if (error instanceof HttpError) {
                return res.json({ status: error.status, message: error.message })
            } else {
                return res.json({ status: 400, data: error })
            }
        }
    } else if (req.method === "PUT") {
        const { _id, title, description, difficulty, category } = req.body;
        try {
            const response = await fetchPut(
                process.env.NEXT_PUBLIC_EDIT_QUESTION_SERVER_URL as string, {
                    _id: _id,
                    title: title,
                    description: description,
                    difficulty: difficulty,
                    category: category
                }
            );
            return res.json({ status: 200, data: response });
        } catch (error) {
            if (error instanceof HttpError) {
                return res.json({ status: error.status, message: error.message })
            } else {
                return res.json({ status: 400, data: error })
            }
        }
    } else {
        return res.json({ status: 405, message: "Method not allowed" })
    }
}