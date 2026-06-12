import { EmailTemplate } from '../../../_components/Email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { emailToSend, userName, fileName, fileSize, fileType, shortUrl, message } = body;

        if (!emailToSend) {
            return Response.json({ error: 'Recipient email is required' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'SwiftSend <onboarding@resend.dev>', // Resend free tier restriction
            to: [emailToSend],
            subject: `${userName || 'Someone'} shared a file with you!`,
            react: EmailTemplate({
                userName,
                fileName,
                fileSize,
                fileType,
                shortUrl,
                message
            }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error: any) {
        return Response.json({ error: error.message || 'Server error' }, { status: 500 });
    }
}