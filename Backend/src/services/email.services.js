import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text, html) => {
    const { data, error } = await resend.emails.send({
        from: 'HireSync <onboarding@resend.dev>',
        to,
        subject,
        html,
        text,
    });

    if (error) {
        console.error('Email error:', error);
        throw error;
    }

    console.log('Email sent:', data);
    return data;
};

export default sendEmail;