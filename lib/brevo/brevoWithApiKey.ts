import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY as string,
);

const smtpEmail = new brevo.SendSmtpEmail();

interface Params {
    subject: string;
    to: { email: string; name: string }[];
    htmlContent: string;
}

export const sendEmail = async ({ subject, to, htmlContent }: Params) => {
    smtpEmail.subject = subject;
    smtpEmail.to = to;
    smtpEmail.htmlContent = htmlContent;
    smtpEmail.sender = {
        name: "Rx Country No Reply",
        email: "virtual@rxcountry.com.co",
    };
    await apiInstance.sendTransacEmail(smtpEmail);
};
