import {
    HttpError,
    ResponseData,
    fetchGetWithAuthorization,
} from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === "POST") {
        const { token } = req.body;
        console.log("Sending token:", token);
        if (token) {
            try {
                const express_gateway: string =
                    (process.env.GATEWAY_SERVER_URL as string) + "/api/invite";
                const response = await fetchGetWithAuthorization(
                    express_gateway as string,
                    token
                );
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
                message: `Expected token, instead received: ${token}`,
            });
        }
    } else {
        return res.json({ status: 405, message: "Method Not Allowed" });
    }
}
