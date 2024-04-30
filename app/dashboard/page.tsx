"use client";

import { IoArrowForward } from "react-icons/io5";
import DashboardHeader from "../component/DashboardHeader";
import Spinner from "../component/spinner/Spinner";
import DashBoardHook from "./hook/DashBoardHook";

export default function Dashboard() {
    const { user, isActiveUser } = DashBoardHook();

    // if (!user || !isActiveUser) {
    //     return <Spinner />;
    // }

    return (
        <main className="min-h-screen w-full bg-home-image bg-cover">
            <div className="bg-black bg-opacity-60 flex flex-col min-h-screen w-full p-16 space-y-16">
                <DashboardHeader />
                {isActiveUser ? (
                    <div className="mx-32 flex flex-col space-y-8">
                        <h2 className="text-white font-bold text-5xl">
                            Bienvenido Doc
                        </h2>
                        <p className="text-white w-[80%] xl:w-[30%] text-justify">
                            Lorem ipsum dolor sit amet, consectetuer adipiscing
                            elit, sed diam nonummy nibh euismod tincidunt ut
                            laoreet dolore magna aliquam erat volutpat. Ut wisi
                            enim ad minim veniam, quis nostrud exerci tation
                            ullamcorper suscipit lobortis nisl ut aliquip ex ea
                            commodo consequat.
                        </p>
                        <button className="w-48 flex justify-center items-center space-x-2 text-white hover:text-gray-300 text-center border-white hover:border-gray-300 border-2 rounded-md p-2">
                            <span>Empezar</span>
                            <IoArrowForward />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-1 justify-center items-center">
                        <div className="flex flex-col space-y-8 p-8 rounded-3xl border-2 border-company-blue bg-black bg-opacity-80">
                            <div className="flex flex-col space-y-8 items-center mx-16">
                                <h2 className="text-company-orange text-xl">
                                    ¡Bienvenido a Rx Country!
                                </h2>
                                <p className="text-white text-center w-96">
                                    Tu registro está a verificación por parte
                                    del área administrativa. Espera a la
                                    activación de tu cuenta. ¡Gracias!
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
