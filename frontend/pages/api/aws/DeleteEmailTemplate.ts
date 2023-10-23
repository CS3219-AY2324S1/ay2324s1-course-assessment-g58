import { ResponseData } from "@/utils/apiHelpers";
import { SESv2Client, DeleteEmailTemplateCommand } from "@aws-sdk/client-sesv2";
import { NextApiRequest, NextApiResponse } from "next";

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
        TemplateName: "PeerPrepAdminInvitation",
    };

    const command = new DeleteEmailTemplateCommand(input);
    const response = await client.send(command);
    console.log(response);
}
