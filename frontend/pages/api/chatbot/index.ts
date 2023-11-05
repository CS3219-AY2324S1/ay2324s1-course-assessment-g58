import DataForAiService from "@/types/DataForAiService";
import {
    HttpError,
    ResponseData,
    fetchPost,
} from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === "POST") {
        const data = req.body as DataForAiService;
        try {
            const express_gateway: string = ((process.env
                .GATEWAY_SERVER_URL as string) +
                process.env.AI_SERVICE_ENDPOINT) as string;
            const response = await fetchPost(express_gateway as string, data);
            return res.json({ status: 201, data: response });
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
    }
}