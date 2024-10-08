"use client";
import Spinner from "@/app/component/spinner/Spinner";
import useAuth from "@/app/firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function ProtectionPolicyPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const userRoleId = localStorage.getItem("userRoleId") ?? "";

        if (!user && !userRoleId) {
            router.replace("/sign-in");
            return;
        }
    }, [router, user]);

    if (!user) {
        return <Spinner />;
    }
    return (
        <main className="flex flex-col justify-start items-center min-h-screen w-full bg-gray-image bg-cover">
            <div className="px-8 pb-16 md:px-20 lg:px-20 xl:px-52 lg:py-8 flex flex-col items-start space-y-4">
                <div className="mt-28 w-full">
                    <Link href={"/dashboard"}>
                        <div className="flex flex-row items-center justify-start space-x-2 text-company-blue font-bold text-3xl">
                            <IoArrowBackCircleOutline
                                className="w-1/8"
                                size={32}
                            />
                            <h1 className="w-full">
                                Política de Protección de Datos
                            </h1>
                        </div>
                    </Link>
                </div>
                <div className="pt-28 text-white text-justify">
                    <p>
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
                        ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum
                    </p>
                </div>
            </div>
        </main>
    );
}
