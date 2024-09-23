"use client";
import Spinner from "@/app/component/spinner/Spinner";
import useAuth from "@/app/firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WelcomeMessage() {
    const router = useRouter();
    const { user, userData } = useAuth();

    useEffect(() => {
        const userRoleId = localStorage.getItem("userRoleId") ?? "";

        // if (!userRoleId) {
        //     router.replace("/sign-in");
        //     return;
        // }
    }, [router, user, userData]);

    // if (!user) {
    //     return <Spinner />;
    // }

    return (
        <main className="relative flex flex-col justify-center items-center bg-login-image bg-cover bg-bottom min-h-screen w-full">
            <div className="flex flex-col items-center space-y-8 p-4 sm:p-8 rounded-3xl border-2 border-company-blue bg-black bg-opacity-80 w-[90%] sm:w-auto">
                <div className="flex flex-col space-y-8 items-center w-full mx-4 sm:mx-16">
                    <h2 className="text-company-orange text-xl">
                        ¡Bienvenido a Rx Country!
                    </h2>
                    <p className="text-white text-center w-auto sm:w-96 text-wrap">
                        Estamos encantados de tenerte con nosotros. Gracias por
                        regístrate en nuestra plataforma. Esperamos que tengas
                        la mejor experiencia posible.
                    </p>
                    <Link
                        href={"/dashboard"}
                        className="bg-company-blue rounded-2xl px-5 py-3 text-white"
                        // onClick={() => router.replace("/dashboard")}
                    >
                        Continuar
                    </Link>
                </div>
            </div>
        </main>
    );
}
