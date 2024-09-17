"use client";
import Spinner from "@/app/component/spinner/Spinner";
import useAuth from "@/app/firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function AboutPage() {
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
                        <div className="flex flex-row items-center  justify-items-start space-x-2 text-company-blue font-bold text-3xl">
                            <IoArrowBackCircleOutline
                                className="w-1/8"
                                size={32}
                            />
                            <h1 className="w-full">Acerca De</h1>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col pt-28 text-white text-justify">
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
                    <div className="w-full flex flex-col justify-center items-center p-10 sm:p-16">
                        <span>Desarrollado por:</span>
                        <div className="w-1/2 flex items-center justify-center">
                            <Image
                                src={"/assets/LogoEurekaDreams.png"}
                                width={0}
                                height={0}
                                sizes="1200px"
                                alt={"logo"}
                                style={{ width: "100%", height: "auto" }}
                                placeholder="blur"
                                blurDataURL={"/assets/LogoEurekaDreams.png"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
