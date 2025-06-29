"use server";

import { DataProfessionalObject } from "@/app/types/professionals";
import { sendEmail } from "@/lib/brevo/brevoWithApiKey";
// import { sendEmailSMTP } from "../brevoWithSMTP";
import { plantillaBienvenida } from "../plantillas/bienvenida";
import { plantillaCierreOrden } from "../plantillas/cierreOrden";
import { plantillaNuevaOrden } from "../plantillas/nuevaOrden";

export const handleSendWelcomeEmail = async (data: DataProfessionalObject) => {
    try {
        // Usar sendEmailSMTP para envío son SMTP
        await sendEmail({
            subject: "¡Bienvenido a Rx Country!",
            to: [
                {
                    name: `${data.name} ${data.lastName}`,
                    email: data.email,
                },
            ],

            htmlContent: plantillaBienvenida({
                userName: `${data.name} ${data.lastName}`,
                userEmail: data.email,
                password: data.id,
                loginUrl: "https://rx-country-client.vercel.app/sign-in",
                contactEmail: "soporte-rxcountry@yopmail.com",
            }),
        });
    } catch (error) {
        //console.log("Este fue el error: ", error);
    }
};
export const handleSendFinishedOrderEmail = async (data: any) => {
    try {
        // Usar sendEmailSMTP para envío son SMTP
        await sendEmail({
            subject: "¡Finalización de orden!",
            to: [
                {
                    name: `${data.name} ${data.lastName}`,
                    email: data.email,
                },
                {
                    name: data.professionalName,
                    email: data.professionalEmail,
                },
            ],
            htmlContent: plantillaCierreOrden({
                ...data,
                loginUrl: "https://rx-country-client.vercel.app/sign-in",
                contactEmail: "soporte-rxcountry@yopmail.com",
            }),
        });
    } catch (error) {
        //console.log("Este fue el error: ", error);
    }
};

export const handleSendNewOrderEmail = async (data: any) => {
    try {
        // Usar sendEmailSMTP para envío son SMTP
        await sendEmail({
            subject: "¡Nueva orden registrada!",
            to: [
                {
                    name: `${data.name} ${data.lastName}`,
                    email: data.email,
                },
            ],
            htmlContent: plantillaNuevaOrden({
                ...data,
                loginUrl: "https://rx-country-client.vercel.app/sign-in",
                contactEmail: "soporte-rxcountry@yopmail.com",
            }),
        });
    } catch (error) {
        //console.log("Este fue el error: ", error);
    }
};
