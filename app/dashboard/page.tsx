"use client";

import { useRouter } from "next/navigation";
import { IoArrowForward } from "react-icons/io5";
import DashboardHeader from "../component/DashboardHeader";
import Spinner from "../component/spinner/Spinner";
import DashBoardHook from "./hook/DashBoardHook";

export default function Dashboard() {
    const { user, isActiveUser, isLoading, isLoadingValidate, userData } =
        DashBoardHook();

    const router = useRouter();

    if (!user) {
        return <Spinner />;
    }

    return (
        <main className="min-h-screen bg-black dark:bg-black w-full h-screen bg-home-image bg-cover bg-bottom">
            <div className="flex flex-col min-h-screen w-full py-16 px-5 lg:p-16 space-y-16">
                <DashboardHeader />
                <div className="sm:mx-32 flex flex-col space-y-8 min-h-96">
                    <h2 className="text-white font-bold text-2xl sm:text-5xl">
                        {userData?.rol === "ZWb0Zs42lnKOjetXH5lq"
                            ? "Bienvenido Doc"
                            : "¡Bienvenido!"}
                    </h2>
                    <p className="text-white w-[80%] xl:w-[30%] text-justify text-sm sm:text-base">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad
                        minim veniam, quis nostrud exerci tation ullamcorper
                        suscipit lobortis nisl ut aliquip ex ea commodo
                        consequat.
                    </p>

                    {userData?.rol && (
                        <button
                            onClick={() => {
                                if (
                                    userData?.rol === "ZWb0Zs42lnKOjetXH5lq" ||
                                    userData?.rol === "Ll6KGdzqdtmLLk0D5jhk"
                                ) {
                                    router.push("/dashboard/new-order");
                                } else if (
                                    userData?.rol === "ShHQKRuKJfxHcV70XSvC"
                                ) {
                                    router.push("/dashboard/images-query");
                                } else {
                                    router.push("/dashboard/orders-historial");
                                }
                            }}
                            className="w-48 flex justify-center items-center space-x-2 text-white hover:text-gray-300 text-center border-white hover:border-gray-300 border-2 rounded-md p-2"
                        >
                            {userData?.rol === "ShHQKRuKJfxHcV70XSvC" ? (
                                <span>Ver Imágenes</span>
                            ) : (
                                <span>Empezar</span>
                            )}
                            <IoArrowForward />
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
}
