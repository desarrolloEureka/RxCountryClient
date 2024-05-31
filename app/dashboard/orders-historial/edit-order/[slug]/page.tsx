"use client";
import DashboardHeader from "@/app/component/DashboardHeader";
import LightIcon from "@/app/component/icons/LightIcon";
import StepByStep from "@/app/component/StepByStep";
import DoctorVector from "@/app/component/vectors/DoctorVector";
import Link from "next/link";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { IoAlertCircleSharp, IoArrowBackCircleOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import EditOrderHook from "../hook/EditOrderHook";

const EditOrderPage = ({ params: { slug } }: { params: { slug: string } }) => {
    const {
        showHelp,
        allAreas,
        setShowHelp,
        formStep,
        setFormStep,
        isDataSelected,
        setIsDataSelected,
        widthSlider,
        isEdit,
        oldData,
        userRol,
        optionsData,
        patientData,
        titles,
        currentOrderId,
        changeHandler,
        selectChangeHandlerIdType,
        dateChangeHandler,
        phoneChangeHandler,
        setSelectedOptions,
        handleSendForm,
        selectChangeHandlerSentTo,
    } = EditOrderHook({ slug });

    return (
        <main className="relative min-h-screen w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 flex flex-col w-full min-h-screen p-16 space-y-16">
                <DashboardHeader selectedMenuItem="orders-historial" />
                <form
                    onSubmit={handleSendForm}
                    className="flex flex-col rounded-[2.5rem] shadow-lg bg-company-gray w-full max-w-[1440px] mx-auto"
                >
                    <div className="flex justify-center items-center">
                        {formStep < 6 && (
                            <div className="flex justify-between items-center w-full p-8">
                                <div className="flex items-center space-x-8">
                                    <Link href={"/dashboard/orders-historial"}>
                                        <IoArrowBackCircleOutline
                                            className="text-company-blue"
                                            size={32}
                                        />
                                    </Link>
                                </div>

                                <div className="flex flex-1 mx-20">
                                    <h3 className="text-company-blue text-3xl font-bold">
                                        {titles[formStep]}
                                    </h3>
                                </div>

                                <div className="flex flex-col items-center space-y-2 text-white text-sm">
                                    <button
                                        onClick={() => setShowHelp(true)}
                                        className="rounded-full w-8 h-8 flex justify-center items-center shadow-lg bg-white"
                                    >
                                        <LightIcon color="#5696D3" />
                                    </button>
                                    <span>Ayuda</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <StepByStep
                        oldData={oldData}
                        formStep={formStep}
                        setFormStep={setFormStep}
                        userRol={userRol}
                        isEdit={isEdit}
                        setIsDataSelected={setIsDataSelected}
                        optionsData={optionsData}
                        data={patientData}
                        changeHandler={changeHandler}
                        selectChangeHandlerIdType={selectChangeHandlerIdType}
                        dateChangeHandler={dateChangeHandler}
                        phoneChangeHandler={phoneChangeHandler}
                        setSelectedOptions={setSelectedOptions}
                        handleSendForm={handleSendForm}
                        currentOrderId={currentOrderId}
                        idChangeHandler={() => {}}
                        handleClose={() => {}}
                        selectChangeHandlerSentTo={selectChangeHandlerSentTo}
                        allAreas={allAreas}
                    />

                    {formStep < 6 && (
                        <div className="flex flex-row items-center mt-8 overflow-visible bg-company-blue bg-opacity-25 w-full h-[0.1rem]">
                            <div
                                className={`h-[0.3rem] ${
                                    widthSlider[formStep]
                                } bg-company-blue ${
                                    formStep < 5
                                        ? "rounded-r-full"
                                        : "rounded-none"
                                }`}
                            />
                        </div>
                    )}
                    {formStep < 6 && (
                        <div
                            className={`flex ${
                                formStep < 6 ? "justify-between" : "justify-end"
                            } items-center p-8`}
                        >
                            <div className="text-white">Paso {formStep}/5</div>
                            <div className="flex items-center space-x-8">
                                {formStep > 1 && (
                                    <div
                                        onClick={() => {
                                            setFormStep(
                                                (prevStep: number) =>
                                                    prevStep - 1,
                                            );
                                        }}
                                        className="flex items-center cursor-pointer text-company-blue"
                                    >
                                        <BiChevronLeft size={32} />
                                        <span>Atrás</span>
                                    </div>
                                )}
                                <div
                                    onClick={() => {
                                        setFormStep(
                                            (prevStep: number) => prevStep + 1,
                                        );
                                        setIsDataSelected(false);
                                    }}
                                    className="flex items-center cursor-pointer text-company-blue"
                                >
                                    {isDataSelected || formStep === 0 ? (
                                        <span>Siguiente</span>
                                    ) : (
                                        <span>Omitir</span>
                                    )}
                                    <BiChevronRight size={32} />
                                </div>
                            </div>
                        </div>
                    )}
                </form>
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

export default EditOrderPage;
