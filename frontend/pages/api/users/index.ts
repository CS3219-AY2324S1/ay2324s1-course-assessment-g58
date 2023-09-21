import { ResponseData, fetchGet, fetchPost, fetchPut } from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    if (req.method === "GET") {
        const response = await fetchGet(
            process.env.NEXT_PUBLIC_USER_SERVER_URL as string
        );
        return res.json({ status: 200, data: response });
    } else if (req.method === "POST") {
        const { email, username } = req.body
        const response = await fetchPost(
            process.env.NEXT_PUBLIC_USER_SERVER_URL as string, {
                username: username,
                email: email
            }
        );
        return res.json({ status: 201, data: response });
    } else if (req.method === "PUT") {
        const { email, username } = req.body
        const response = await fetchPut(
            process.env.NEXT_PUBLIC_USER_SERVER_URL as string, {
                username: username,
                email: email
            }
        );
        return res.json({ status: 201, data: response });
    }
}