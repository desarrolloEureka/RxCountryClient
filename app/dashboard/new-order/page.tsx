"use client";
import DashboardHeader from "@/app/component/DashboardHeader";
import LightIcon from "@/app/component/icons/LightIcon";
import StepByStep from "@/app/component/StepByStep";
import DoctorVector from "@/app/component/vectors/DoctorVector";
import Link from "next/link";
import { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import {
    IoAlertCircleSharp,
    IoArrowBackCircleOutline
} from "react-icons/io5";
import { MdClose } from "react-icons/md";

const NewOrderPage = () => {
    const [showHelp, setShowHelp] = useState(false);
    const [formStep, setFormStep] = useState(0);

    //*Aquí para cambiar de vista de especialista a recepcionista
    const [user, setUser] = useState("Receptionista");

    //*Aquí para cambiar de vista de edición
    const [isEdit, setIsEdit] = useState(false);

    return (
        <main className="relative min-h-screen w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 flex flex-col w-full min-h-screen p-16 space-y-16">
                <DashboardHeader selectedMenuItem="create-order" />
                <div className="flex flex-col rounded-3xl shadow-lg bg-company-gray w-full max-w-[1440px] mx-auto relative">
                    <div className="flex justify-center items-center">
                        <div className="flex justify-between items-center w-full p-8">
                            <div
                                className={`flex items-center space-x-8 ${
                                    formStep === 7 && "hidden"
                                }`}
                            >
                                <Link href={"/dashboard/images-query"}>
                                    <IoArrowBackCircleOutline
                                        className="text-company-blue"
                                        size={32}
                                    />
                                </Link>
                            </div>
                            <div></div>
                            {formStep < 6 && (
                                <div className="flex flex-col items-center space-y-2 text-white text-sm">
                                    <button
                                        onClick={() => setShowHelp(true)}
                                        className="rounded-full w-8 h-8 flex justify-center items-center shadow-lg bg-white"
                                    >
                                        <LightIcon color="#5696D3" />
                                    </button>
                                    <span>Ayuda</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <StepByStep
                        formStep={formStep}
                        setFormStep={setFormStep}
                        user={user}
                        isEdit={isEdit}
                    />

                    {formStep < 6 && (
                        <div className="flex flex-row items-center mt-8 overflow-visible bg-company-blue w-full h-[0.1rem]">
                            <div
                                className={`h-4 w-${formStep}/6 bg-company-blue ${
                                    formStep < 5
                                        ? "rounded-r-full"
                                        : "rounded-none"
                                }`}
                            />
                            <div className={`h-4 w-${6 - formStep}/6`} />
                        </div>
                    )}
                    <div
                        className={`flex ${
                            formStep < 6 ? "justify-between" : "justify-end"
                        } items-center p-8 ${formStep === 6 && "hidden"}`}
                    >
                        {formStep < 6 && (
                            <div className="text-white">Paso {formStep}/5</div>
                        )}
                        <div className="flex items-center space-x-8">
                            {formStep < 6 && formStep > 0 && (
                                <div
                                    onClick={() => {
                                        let step = formStep;
                                        step--;
                                        setFormStep(step);
                                    }}
                                    className="flex items-center cursor-pointer text-company-blue"
                                >
                                    <BiChevronLeft size={32} />
                                    <span>Atrás</span>
                                </div>
                            )}
                            {formStep < 6 && (
                                <div
                                    onClick={() => {
                                        let step = formStep;
                                        step++;
                                        setFormStep(step);
                                    }}
                                    className="flex items-center cursor-pointer text-company-blue"
                                >
                                    <span>Siguiente</span>
                                    <BiChevronRight size={32} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showHelp && (
                <>
                    <div className="absolute top-[22rem] right-[5.5rem] 2xl:right-64 bg-white p-2 rounded-xl">
                        <div className="flex justify-end items-center">
                            <button onClick={() => setShowHelp(false)}>
                                <MdClose color="gray" size={24} />
                            </button>
                        </div>
                        <div className="flex items-center space-x-2 text-black pr-6 pb-5 text-justify">
                            <IoAlertCircleSharp
                                className="text-company-orange mx-4"
                                size={40}
                            />
                            <p className="w-64">
                                Si una orden tiene una alerta en la campana de
                                notificación quiere decir que en ella
                                encontraras las observaciones por cada area de
                                esta orden.
                            </p>
                        </div>
                    </div>
                    <div className="fixed transition-transform right-16 -bottom-3">
                        <DoctorVector />
                    </div>
                </>
            )}
        </main>
    );
};

export default NewOrderPage;
