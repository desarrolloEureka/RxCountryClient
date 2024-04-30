"use client";
import Spinner from "@/app/component/spinner/Spinner";
import useAuth from "@/app/firebase/auth";
import AuthValidate from "@/app/hook/AuthValidate";
import Logout from "@/app/hook/Logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserActive() {
    const router = useRouter();
    const { logOut } = Logout();
    const { user, isActiveUser, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/sign-in");
        }
        if (isActiveUser) {
            router.replace("/dashboard");
        }
        // console.log(user, isActiveUser);
    }, [router, user, isLoading, isActiveUser]);

    // if (user === undefined || user === null || isActiveUser) {
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
                        Tu registro está en estado de verificación por parte del
                        área administrativa. Espera a la activación de tu
                        cuenta. ¡Gracias!
                    </p>
                    <button
                        className="bg-company-blue rounded-2xl px-5 py-3 text-white"
                        onClick={logOut}
                    >
                        Salir
                    </button>
                </div>
            </div>
        </main>
    );
}
