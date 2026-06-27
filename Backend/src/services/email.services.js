import {Brevo} from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async (to, subject, text, html) => {
  try {
    const result = await apiInstance.sendTransacEmail({
      sender: {
        name: process.env.SENDER_NAME,
        email: process.env.SENDER_EMAIL,
      },
      to: [{ email: to }],
      subject,
      textContent: text,
      htmlContent: html,
    });

    console.log("Email sent successfully:", result.body);
    return result;
  } catch (error) {
    console.error(
      "Brevo email error:",
      error.response?.body || error
    );
    throw error;
  }
};

export default sendEmail;