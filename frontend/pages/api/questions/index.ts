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
    if (req.method === "POST") {
        const { _id, title, description, difficulty, category } = req.body;
        const token = req.headers.authorization;

        try {
            const express_gateway: string = ((process.env
                .GATEWAY_SERVER_URL as string) +
                process.env.QUESTION_SERVICE_ADD_QUESTION_ENDPOINT) as string;
            const response = await fetchPost(express_gateway as string, {
                _id: _id,
                title: title,
                description: description,
                difficulty: difficulty,
                category: category,
                token: token,
            });
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
    } else if (req.method === "GET") {
        const token = req.headers.authorization;
        try {
            const express_gateway: string = ((process.env
                .GATEWAY_SERVER_URL as string) +
                process.env.QUESTION_SERVICE_GET_QUESTION_ENDPOINT) as string;
            const response = await fetchGet(express_gateway as string, {
                token: token,
            });
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
    } else if (req.method === "DELETE") {
        const { _id, title, description, difficulty, category } = req.body;
        const token = req.headers.authorization;

        try {
            const express_gateway: string = ((process.env
                .GATEWAY_SERVER_URL as string) +
                process.env
                    .QUESTION_SERVICE_DELETE_QUESTION_ENDPOINT) as string;
            const response = await fetchDelete(express_gateway as string, {
                _id: _id,
                title: title,
                description: description,
                difficulty: difficulty,
                category: category,
                token: token,
            });
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
    } else if (req.method === "PUT") {
        const { _id, title, description, difficulty, category } = req.body;
        const token = req.headers.authorization;

        try {
            const express_gateway: string = ((process.env
                .GATEWAY_SERVER_URL as string) +
                process.env.QUESTION_SERVICE_EDIT_QUESTION_ENDPOINT) as string;
            const response = await fetchPut(express_gateway as string, {
                _id: _id,
                title: title,
                description: description,
                difficulty: difficulty,
                category: category,
                token: token,
            });
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
        return res.json({ status: 405, message: "Method not allowed" });
    }
}
