import { HttpError, ResponseData, fetchPost } from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === "POST") {
        const { category, difficulty } = req.body;
        try {
            const express_gateway: string =
                (process.env.GATEWAY_SERVER_URL as string) +
                "/filter-questions";
            const response = await fetchPost(express_gateway as string, {
                category: category,
                difficulty: difficulty,
            });
            return res.json({ status: 200, data: response });
        } catch (error) {
            console.log(error);
            if (error instanceof HttpError) {
                return res.json({
                    status: error.status,
                    message: error.message,
                });
            } else {
                return res.json({
                    status: 400,
                    data: error
                        ? error
                        : "Something went wrong in the API call",
                });
            }
        }
    } else {
        return res.json({ status: 405, message: "Method not allowed" });
    }
}
