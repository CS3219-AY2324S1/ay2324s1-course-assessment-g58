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
    if (req.method === "GET") {
        const userId = req.query.id;
        try {
            const express_gateway: string = ((process.env
                .GATEWAY_SERVER_URL as string) +
                `/api/session/user/${userId}`) as string;
            const response = await fetchGet(express_gateway as string);
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
        // } else if (req.method === "POST") {
        //     const { email, username, password, admin } = req.body;
        //     try {
        //         const express_gateway: string = ((process.env
        //             .GATEWAY_SERVER_URL as string) +
        //             process.env.USER_SERVICE_ENDPOINT) as string;
        //         const response = await fetchPost(express_gateway as string, {
        //             username: username,
        //             email: email,
        //             password: password,
        //             admin: admin,
        //         });
        //         return res.json({ status: 201, data: response });
        //     } catch (error) {
        //         if (error instanceof HttpError) {
        //             return res.json({
        //                 status: error.status,
        //                 message: error.message,
        //             });
        //         } else {
        //             return res.json({ status: 400, data: error });
        //         }
        //     }
        // } else if (req.method === "PUT") {
        //     const { email, username } = req.body;
        //     try {
        //         const express_gateway: string = ((process.env
        //             .GATEWAY_SERVER_URL as string) +
        //             process.env.USER_SERVICE_ENDPOINT) as string;
        //         const response = await fetchPut(express_gateway as string, {
        //             username: username,
        //             email: email,
        //         });
        //         return res.json({ status: response.status, data: response });
        //     } catch (error) {
        //         if (error instanceof HttpError) {
        //             return res.json({
        //                 status: error.status,
        //                 message: error.message,
        //             });
        //         } else {
        //             return res.json({ status: 400, data: error });
        //         }
        //     }
        // } else if (req.method === "DELETE") {
        //     const { email } = req.body;
        //     try {
        //         const express_gateway: string = ((process.env
        //             .GATEWAY_SERVER_URL as string) +
        //             process.env.USER_SERVICE_ENDPOINT) as string;
        //         const response = await fetchDelete(express_gateway as string, {
        //             email: email,
        //         });
        //         return res.json({ status: 200, data: response });
        //     } catch (error) {
        //         if (error instanceof HttpError) {
        //             return res.json({
        //                 status: error.status,
        //                 message: error.message,
        //             });
        //         } else {
        //             return res.json({ status: 400, data: error });
        //         }
        //     }
    } else {
        return res.json({ status: 405, message: "Method Not Allowed" });
    }
}
