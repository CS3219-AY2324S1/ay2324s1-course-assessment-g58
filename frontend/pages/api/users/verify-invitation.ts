import { HttpError, ResponseData, fetchPost } from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === "POST") {
        const { email } = req.body;
        if (email) {
            try {
                const express_gateway: string =
                    (process.env.GATEWAY_SERVER_URL as string) +
                    "/api/users/verify-invitation";
                const response = await fetchPost(express_gateway as string, {
                    email: email,
                });
                console.log(response);
                return res.json({ status: 200, data: response });
            } catch (error) {
                console.log(error);
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
            return res.json({
                status: 400,
                message: `Expected email, received ${email}`,
            });
        }
    } else {
        return res.json({ status: 405, message: "Method Not Allowed" });
    }
}
