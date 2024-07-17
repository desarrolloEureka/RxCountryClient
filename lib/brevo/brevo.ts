import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    "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",
    // process.env.BREVO_API_KEY as string,
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
        email: "fernando@eurekadreams.com",
    };
    await apiInstance.sendTransacEmail(smtpEmail);
};
