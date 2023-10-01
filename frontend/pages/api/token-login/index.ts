import { HttpError, ResponseData } from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method === "POST") {
        const token = req.body.token;

        try {
            const express_gateway = ((process.env
                .GATEWAY_SERVER_URL as string) +
                process.env.USER_TOKEN_LOGIN_ENDPOINT) as string;

            const response = await fetch(express_gateway, {
                method: "GET",
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
                redirect: "follow", // manual, *follow, error
                referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            });

            // retrieves user data
            const data = await response.json();

            if (!response.ok) {
                throw new HttpError(data.status, data.message);
            }

            return res.json({ status: response.status, data: data });
        } catch (error) {
            return res.json({ status: 500, message: `${error}` });
        }
    }
}
