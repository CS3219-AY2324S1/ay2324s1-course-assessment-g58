import {
    HttpError,
    ResponseData,
    fetchDeleteWithAuthorization,
    fetchPostWithAuthorization,
} from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === "POST") {
        const { email, inviteeEmail, token } = req.body;
        if (email && inviteeEmail && token) {
            try {
                const express_gateway: string =
                    (process.env.GATEWAY_SERVER_URL as string) + "/api/invite";
                const response = await fetchPostWithAuthorization(
                    express_gateway as string,
                    {
                        email: email,
                        inviteeEmail: inviteeEmail,
                    },
                    token
                );
                return res.json({ status: 201, data: response });
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
                message: `Expected 2 variables and token, instead received: ${email}, ${inviteeEmail}, ${token}`,
            });
        }
    } else if (req.method === "DELETE") {
        const { email, inviteeEmail, token } = req.body;
        if (email && inviteeEmail && token) {
            try {
                const express_gateway: string =
                    (process.env.GATEWAY_SERVER_URL as string) + "/api/invite";
                const response = await fetchDeleteWithAuthorization(
                    express_gateway as string,
                    {
                        email: email,
                        inviteeEmail: inviteeEmail,
                    },
                    token
                );
                return res.json({ status: 200, data: response });
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
            return res.json({
                status: 400,
                message: `Expected 2 variables and token, instead received: ${email}, ${inviteeEmail}, ${token}`,
            });
        }
    } else {
        return res.json({ status: 405, message: "Method Not Allowed" });
    }
}
