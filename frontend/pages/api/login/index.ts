import { HttpError, ResponseData, fetchPost } from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            const express_gateway: string = process.env
                .USER_LOGIN_ENDPOINT as string;

            const response = await fetchPost(express_gateway as string, {
                email: email,
                password: password,
            });

            console.log(response.status);

            return res.json({ status: response.status, data: response });
        } catch (error: any) {
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
        return res.json({ status: 405, message: "Method Not Allowed" });
    }
}
