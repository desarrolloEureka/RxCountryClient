"use client";
import Spinner from "@/app/component/spinner/Spinner";
import useAuth from "@/app/firebase/auth";
import AuthValidate from "@/app/hook/AuthValidate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerificationEmailSend() {
    const router = useRouter();
    const { user, isLoading } = useAuth();

    // useEffect(() => {
    //     if (user) {
    //         router.replace("/dashboard");
    //     }
    //     if (!isLoading && !user) {
    //         router.replace("/sign-in");
    //     }
    // }, [router, user, isLoading]);

    // if (user === undefined || user === null) {
    //     return <Spinner />;
    // }

    return (
        <main className="relative flex flex-col justify-center items-center bg-login-image bg-cover bg-bottom min-h-screen w-full">
            <div className="flex flex-col items-center space-y-8 p-8 rounded-3xl border-2 border-company-blue bg-black bg-opacity-80">
                <div className="flex flex-col space-y-8 items-center w-full mx-16">
                    <h2 className="text-company-orange text-xl">
                        ¡Bienvenido a Rx Country!
                    </h2>
                    <p className="text-white text-center w-96">
                        Por favor verifica tu correo electrónico registrado para
                        poder continuar, gracias!
                    </p>
                    <button
                        className="bg-company-blue rounded-2xl px-5 py-3 text-white"
                        onClick={() => router.push("/sign-in")}
                    >
                        Continuar
                    </button>
                </div>
            </div>
        </main>
    );
}
