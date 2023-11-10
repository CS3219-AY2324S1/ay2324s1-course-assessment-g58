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
        const username = req.query.id;
        try {
            const express_gateway: string = ((process.env
                .GATEWAY_SERVER_URL as string) +
                `/api/session/user/${username}`) as string;
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
    } else {
        return res.json({ status: 405, message: "Method Not Allowed" });
    }
}
