import { ResponseData } from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";
import { SESv2Client, ListEmailTemplatesCommand } from "@aws-sdk/client-sesv2";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const client = new SESv2Client({
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: "AKIATXQ5QFOZFWRS76WK",
            secretAccessKey: "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",
        },
    });

    const input = {
        // ListEmailTemplatesRequest
        PageSize: Number("10"),
    };

    const command = new ListEmailTemplatesCommand(input);
    const response = await client.send(command);
    console.log(response);
}
