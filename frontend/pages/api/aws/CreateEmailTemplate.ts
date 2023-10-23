import { ResponseData } from "@/utils/apiHelpers";
import { NextApiRequest, NextApiResponse } from "next";
import { SESv2Client, CreateEmailTemplateCommand } from "@aws-sdk/client-sesv2";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const client = new SESv2Client({
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });

    const input = {
        TemplateName: "PeerPrepAdminInvitation",
        TemplateContent: {
            // EmailTemplateContent
            Subject: "PeerPrep Admin Invitation",
            Text: "Hi {{Name}}, you have been invited to be an admin of PeerPrep. Click the link below to accept the invitation: {{InvitationLink}}",
            Html: "<html><body><h1>PeerPrep Admin Invitation</h1><p>Hi {{Name}}</p><p>You have been invited to be an admin of PeerPrep. Click the link to accept the invitation:</p><a href='{{InvitationLink}}'>Accept Invitation</a></body></html>",
        },
    };

    const command = new CreateEmailTemplateCommand(input);
    const response = await client.send(command);
    console.log(response);
}
