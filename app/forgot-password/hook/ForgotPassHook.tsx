import { resetPasswordFirebase } from "@/app/firebase/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ForgotPassHook = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");

    const handleChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleSendEmailRecover = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!email) {
            return;
        }

        const actionCodeSettings = {
            url: "https://rx-country-client.vercel.app/sign-in",
            handleCodeInApp: false,
        };

        try {
            await resetPasswordFirebase(email, actionCodeSettings).then(() => {
                router.replace("/forgot-password/success");
            });
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return {
        handleSendEmailRecover,
        handleChangeEmail,
        email,
    };
};
