import { ResponseData } from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const { email } = req.body;
    const client = new SESv2Client({
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    const templateData = {
        Name: email.split("@")[0],
        InvitationLink: "https://www.google.com",
    };

    const input = {
        // SendEmailRequest
        FromEmailAddress: "ryan@peerprep.ryanchuahj.com",
        Destination: {
            // Destination
            ToAddresses: [
                // EmailAddressList
                "ryanchuahj@gmail.com",
                "samanthalaiofficial@gmail.com",
            ],
        },
        Content: {
            // EmailContent
            Template: {
                // Template
                TemplateName: "PeerPrepAdminInvitation",
                TemplateData: JSON.stringify(templateData),
            },
        },
    };

    const command = new SendEmailCommand(input);
    const response = await client.send(command);

    console.log(response);
    return response;
}
