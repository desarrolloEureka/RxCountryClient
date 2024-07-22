import nodemailer from "nodemailer";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "7873e8001@smtp-brevo.com", // generated brevo user
        pass: "*********", // generated brevo password
    },
});

interface Params {
    subject: string;
    to: { email: string; name: string }[];
    htmlContent: string;
}

export const sendEmailSMTP = async ({ subject, to, htmlContent }: Params) => {
    const listEmails = to.map((item) => item.email);

    const emailObject = {
        from: '"Rx Country No Reply" <fernando@eurekadreams.com>', // sender address
        to: listEmails, // list of receivers
        subject: subject, // Subject line
        html: htmlContent, // HTML body
    };

    await transporter.sendMail(emailObject);
};
