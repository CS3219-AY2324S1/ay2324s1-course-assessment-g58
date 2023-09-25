import { HttpError, ResponseData, fetchDelete, fetchGet, fetchPost, fetchPut } from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === "GET") {
        try {
            const response = await fetchGet(
                process.env.NEXT_PUBLIC_USER_SERVER_URL as string
            );
            return res.json({ status: 200, data: response });
        } catch (error) {
            if (error instanceof HttpError) {
                return res.json({ status: error.status, message: error.message })
            } else {
                return res.json({ status: 400, data: error })
            }
        }
    } else if (req.method === "POST") {
        const { email, username } = req.body
        try {
            const response = await fetchPost(
                process.env.NEXT_PUBLIC_USER_SERVER_URL as string, {
                    username: username,
                    email: email
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
    } else if (req.method === "PUT") {
        const { email, username } = req.body
        try {
            const response = await fetchPut(
                process.env.NEXT_PUBLIC_USER_SERVER_URL as string, {
                    username: username,
                    email: email
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
    } else if (req.method === "DELETE") {
        const { email } = req.body
        try {
            const response = await fetchDelete(
                process.env.NEXT_PUBLIC_USER_SERVER_URL as string, {
                    email: email
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
        return res.json({ status: 405, message: "Method Not Allowed" })
    }
}