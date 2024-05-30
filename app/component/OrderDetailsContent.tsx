"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { IoArrowBackCircleOutline, IoCheckmark, IoEye } from "react-icons/io5";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
// import PreviewOrderPage from "../dashboard/preview-order/page";
import PreviewOrder from "./PreviewOrder";
import { AreasSelector } from "../types/areas";
import SelectComponent from "./SelectComponent";
import InputFileUpload from "./UpLoadButton";
import {
    diagnosisMachineTwo,
    suppliers,
} from "./constants/stepByStepConstants";
import Spinner from "./spinner/Spinner";
import DoctorVector from "./vectors/DoctorVector";

interface Props {
    userRol: string;
    expandReceptionData: boolean;
    setExpandReceptionData: (e: any) => void;
    expandSpecialist: boolean;
    setExpandSpecialist: (e: any) => void;
    expandRx1: boolean;
    setExpandRx1: (e: any) => void;
    expandRx2: boolean;
    setExpandRx2: (e: any) => void;
    selectedDiagnosis: string[];
    setSelectedDiagnosis: (e: any) => void;
    selectedSuppliers: string[];
    setSelectedSuppliers: (e: any) => void;
    orderAndPatientData: any;
    handleChecks: (
        option: string,
        selected: string[],
        setSelected: (e: any) => void,
    ) => void;
    selectChangeHandlerSentTo: (e: any) => void;
    detailStep: number;
    setDetailStep: (e: any) => void;
    handleSendForm: (e: any) => Promise<void>;
    setObservationComment: (e: any) => void;
    setDiagnosticImpressionComment: (e: any) => void;
    allAreas: AreasSelector[];
}

const OrderDetailsContent = ({
    userRol,
    allAreas,
    expandReceptionData,
    setExpandReceptionData,
    expandSpecialist,
    setExpandSpecialist,
    expandRx1,
    setExpandRx1,
    expandRx2,
    setExpandRx2,
    selectedDiagnosis,
    setSelectedDiagnosis,
    selectedSuppliers,
    setSelectedSuppliers,
    orderAndPatientData,
    handleChecks,
    selectChangeHandlerSentTo,
    detailStep,
    setDetailStep,
    handleSendForm,
    setObservationComment,
    setDiagnosticImpressionComment,
}: Props) => {
    const router = useRouter();

    const backToOrder = () => {
        setDetailStep(1);
    };

    const backToDetail = () => {
        setDetailStep(0);
    };

    if (!orderAndPatientData || !userRol) {
        return (
            <div className="mx-auto flex flex-col rounded-[2.5rem] bg-company-gray pt-12 w-full max-w-[1440px]">
                <Spinner
                    visual
                    background="bg-transparent"
                    screenH="min-h-96"
                />
            </div>
        );
    }

    return (
        <div
            className={`mx-auto flex flex-col rounded-[2.5rem] bg-company-gray ${
                detailStep !== 3 && "pt-12"
            } w-full max-w-[1440px]`}
        >
            {(userRol === "Profesional" ||
                orderAndPatientData?.status !== "enviada") &&
                detailStep === 0 && (
                    <div className="flex items-center space-x-8 px-12">
                        <Link href={"/dashboard/orders-historial"}>
                            <IoArrowBackCircleOutline
                                className="text-company-blue"
                                size={32}
                            />
                        </Link>
                        <h2 className="text text-company-orange text-xl">
                            {orderAndPatientData &&
                                `Orden #${orderAndPatientData?.uid} - ${orderAndPatientData?.name} ${orderAndPatientData?.lastName}`}
                        </h2>
                    </div>
                )}

            {detailStep === 0 && (
                <div className="mx-28 my-10">
                    <button
                        onClick={() => {
                            setDetailStep(3);
                        }}
                        className="flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                    >
                        <IoEye className="text-company-blue" size={24} />
                        <span>Previsualizar PDF</span>
                    </button>
                </div>
            )}

            {(userRol === "Profesional" ||
                orderAndPatientData?.status !== "enviada") &&
                detailStep === 0 && (
                    <div className="pb-10">
                        {/* Reception data */}
                        {(orderAndPatientData?.recObservationComment ||
                            userRol === "Recepción") && (
                            <div
                                className={`flex flex-col mx-28 mb-10 transition-transform rounded-xl ${
                                    expandReceptionData
                                        ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                        : "bg-company-blue text-white"
                                }`}
                            >
                                <button
                                    onClick={() =>
                                        setExpandReceptionData(
                                            !expandReceptionData,
                                        )
                                    }
                                    className="flex justify-between items-center py-2 px-4"
                                >
                                    Datos recepción
                                    {expandReceptionData ? (
                                        <RiArrowUpSLine size={32} />
                                    ) : (
                                        <RiArrowDownSLine size={32} />
                                    )}
                                </button>
                                {expandReceptionData && (
                                    <div className="flex flex-col p-4 space-y-2 text-white">
                                        <h2 className="font-bold text-xl">
                                            Observaciones
                                        </h2>
                                        <p className="">
                                            {orderAndPatientData?.[
                                                userRol
                                                    ?.substring(0, 3)
                                                    .toLocaleLowerCase() +
                                                    "ObservationComment"
                                            ] || "Sin comentarios"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* specialist */}
                        {(orderAndPatientData?.observationComment ||
                            userRol === "Profesional") && (
                            <div
                                className={`flex flex-col mx-28 mb-10 transition-transform rounded-xl ${
                                    expandSpecialist
                                        ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                        : "bg-company-blue text-white"
                                }`}
                            >
                                <button
                                    onClick={() =>
                                        setExpandSpecialist(!expandSpecialist)
                                    }
                                    className="flex justify-between items-center py-2 px-4 "
                                >
                                    Especialista
                                    {expandSpecialist ? (
                                        <RiArrowUpSLine size={32} />
                                    ) : (
                                        <RiArrowDownSLine size={32} />
                                    )}
                                </button>
                                {expandSpecialist && (
                                    <div className="flex flex-col p-4 space-y-2 text-white">
                                        <h2 className="font-bold text-xl">
                                            Observaciones
                                        </h2>
                                        <p className="">
                                            {orderAndPatientData.observationComment ||
                                                "Sin comentarios"}
                                        </p>
                                        {/* <textarea
                                    disabled
                                    id="Observations"
                                    name="observations"
                                    rows={4}
                                    cols={50}
                                    className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                    placeholder="Escribe aquí tus observaciones..."
                                    // onChange={(e) =>
                                    //     setObservationComment(e.target.value)
                                    // }
                                /> */}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Rx1 */}
                        {/* <div
                        className={`flex flex-col mx-16 transition-transform rounded-xl ${
                            expandRx1
                                ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                : "bg-company-blue text-white"
                        }`}
                    >
                        <button
                            onClick={() => setExpandRx1(!expandRx1)}
                            className="flex justify-between items-center py-2 px-4"
                        >
                            Rx 1
                            {expandRx1 ? (
                                <RiArrowUpSLine size={32} />
                            ) : (
                                <RiArrowDownSLine size={32} />
                            )}
                        </button>
                        {expandRx1 && (
                            <div className="flex flex-col p-4 space-y-2 text-white">
                                <h2 className="font-bold text-xl">
                                    Observaciones
                                </h2>
                                <p className="">
                                    {orderAndPatientData?.[
                                        userRol?.substring(0, 3)
                                            .toLocaleLowerCase() +
                                            "ObservationComment"
                                    ] || "Sin comentarios"}
                                </p>
                            </div>
                        )}
                    </div> */}

                        {/* Rx2 */}
                        {/* <div
                        className={`flex flex-col mx-16 transition-transform rounded-xl ${
                            expandRx2
                                ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                : "bg-company-blue text-white"
                        }`}
                    >
                        <button
                            onClick={() => setExpandRx2(!expandRx2)}
                            className="flex justify-between items-center py-2 px-4"
                        >
                            Rx 2
                            {expandRx2 ? (
                                <RiArrowUpSLine size={32} />
                            ) : (
                                <RiArrowDownSLine size={32} />
                            )}
                        </button>
                        {expandRx2 && (
                            <div className="flex flex-col p-4 space-y-2 text-white">
                                <h2 className="font-bold text-xl">
                                    Observaciones
                                </h2>
                                <p className="">
                                    {orderAndPatientData?.[
                                        userRol?.substring(0, 3)
                                            .toLocaleLowerCase() +
                                            "ObservationComment"
                                    ] || "Sin comentarios"}
                                </p>
                            </div>
                        )}
                    </div> */}
                    </div>
                )}

            {userRol !== "Profesional" &&
                orderAndPatientData?.status === "enviada" &&
                detailStep === 0 && (
                    <>
                        {userRol === "Recepción" && (
                            <div className="flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50 my-10 mx-28">
                                <h3 className="text-company-orange text-xl font-bold">
                                    Observaciones
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <textarea
                                        // disabled
                                        id="Observations"
                                        name="observations"
                                        rows={6}
                                        cols={50}
                                        className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                        placeholder="Escribe aquí tus observaciones..."
                                        onChange={(e) =>
                                            setObservationComment(
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        {userRol === "Modelos" && (
                            <div className="grid grid-cols-2 gap-4 my-10 mx-28">
                                <div className="col-span-1 flex flex-col space-y-4 py-4 rounded-xl">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Diagnóstico
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {diagnosisMachineTwo.map(
                                            (option, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col flex space-x-2 items-center"
                                                    >
                                                        <div
                                                            onClick={() =>
                                                                handleChecks(
                                                                    option,
                                                                    selectedDiagnosis,
                                                                    setSelectedDiagnosis,
                                                                )
                                                            }
                                                            className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
                                                                selectedDiagnosis.includes(
                                                                    option,
                                                                )
                                                                    ? "bg-company-orange"
                                                                    : "bg-transparent"
                                                            }`}
                                                        >
                                                            {selectedDiagnosis.includes(
                                                                option,
                                                            ) && (
                                                                <IoCheckmark color="black" />
                                                            )}
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col space-y-4 py-4 rounded-xl">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Proveedores
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {suppliers.map((option, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="col flex space-x-2 items-center"
                                                >
                                                    <div
                                                        onClick={() =>
                                                            handleChecks(
                                                                option,
                                                                selectedSuppliers,
                                                                setSelectedSuppliers,
                                                            )
                                                        }
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
                                                            selectedSuppliers.includes(
                                                                option,
                                                            )
                                                                ? "bg-company-orange"
                                                                : "bg-transparent"
                                                        }`}
                                                    >
                                                        {selectedSuppliers.includes(
                                                            option,
                                                        ) && (
                                                            <IoCheckmark color="black" />
                                                        )}
                                                    </div>
                                                    <span className="text-white">
                                                        {option}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-auto pb-5">
                                    <div className="space-y-4 w-2/6">
                                        <label className="text-company-orange">
                                            Área de destino
                                        </label>
                                        <SelectComponent
                                            options={allAreas}
                                            selectChangeHandlerSentTo={
                                                selectChangeHandlerSentTo
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Observaciones
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        <textarea
                                            // disabled
                                            id="Observations"
                                            name="observations"
                                            rows={4}
                                            cols={50}
                                            className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                            placeholder="Escribe aquí tus observaciones..."
                                            onChange={(e) =>
                                                setObservationComment(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Impresión diagnostica
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        <textarea
                                            // disabled
                                            id="Observations"
                                            name="observations"
                                            rows={4}
                                            cols={50}
                                            className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                            placeholder="Escribe aquí tus observaciones..."
                                            onChange={(e) =>
                                                setDiagnosticImpressionComment(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        {userRol === "Diagnostico" && (
                            <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50 my-10 mx-28">
                                <h3 className="text-company-orange text-xl font-bold">
                                    Observaciones
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <textarea
                                        // disabled
                                        id="Observations"
                                        name="observations"
                                        rows={4}
                                        cols={50}
                                        className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                        placeholder="Escribe aquí tus observaciones..."
                                        onChange={(e) =>
                                            setObservationComment(
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        {userRol === "Despachos" && (
                            <div className="grid grid-cols-2 gap-4 my-10 mx-28">
                                <div className="col-span-1 flex flex-col space-y-3 py-4 rounded-xl">
                                    <h1 className="text-company-orange text-2xl font-bold">
                                        Diagnóstico
                                    </h1>
                                    <h2 className="text-company-orange">
                                        Proceso Completado
                                    </h2>
                                    <div className="grid grid-cols-3 gap-4">
                                        {diagnosisMachineTwo.map(
                                            (option, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col flex space-x-2 items-center"
                                                    >
                                                        <div
                                                            onClick={() =>
                                                                handleChecks(
                                                                    option,
                                                                    selectedDiagnosis,
                                                                    setSelectedDiagnosis,
                                                                )
                                                            }
                                                            className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
                                                                selectedDiagnosis.includes(
                                                                    option,
                                                                )
                                                                    ? "bg-company-orange"
                                                                    : "bg-transparent"
                                                            }`}
                                                        >
                                                            {selectedDiagnosis.includes(
                                                                option,
                                                            ) && (
                                                                <IoCheckmark color="black" />
                                                            )}
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col space-y-3 py-4 rounded-xl">
                                    <h1 className="text-company-orange text-xl font-bold">
                                        Proveedores
                                    </h1>
                                    <h2 className="text-company-orange">
                                        Proceso Completado
                                    </h2>
                                    <div className="grid grid-cols-3 gap-4">
                                        {suppliers.map((option, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="col flex space-x-2 items-center"
                                                >
                                                    <div
                                                        onClick={() =>
                                                            handleChecks(
                                                                option,
                                                                selectedSuppliers,
                                                                setSelectedSuppliers,
                                                            )
                                                        }
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
                                                            selectedSuppliers.includes(
                                                                option,
                                                            )
                                                                ? "bg-company-orange"
                                                                : "bg-transparent"
                                                        }`}
                                                    >
                                                        {selectedSuppliers.includes(
                                                            option,
                                                        ) && (
                                                            <IoCheckmark color="black" />
                                                        )}
                                                    </div>
                                                    <span className="text-white">
                                                        {option}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-col pb-5 space-y-4 w-48">
                                    <InputFileUpload />
                                </div>
                                <div className="col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Observaciones
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2">
                                        <textarea
                                            disabled
                                            id="Observations"
                                            name="observations"
                                            rows={4}
                                            cols={50}
                                            className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                            placeholder="Escribe aquí tus observaciones..."
                                            onChange={(e) =>
                                                setObservationComment(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-row items-center overflow-visible bg-company-blue/70 w-full h-[0.2rem]" />
                        <div
                            className={`flex justify-end px-16 py-4 items-center space-x-8`}
                        >
                            <button
                                onClick={() => {
                                    router.replace(
                                        "/dashboard/orders-historial",
                                    );
                                }}
                                className="flex items-center cursor-pointer text-lg text-company-blue"
                            >
                                <BiChevronLeft size={32} />
                                <span>Atrás</span>
                            </button>
                            <button
                                onClick={() => {
                                    setDetailStep(
                                        (prevStep: number) => prevStep + 1,
                                    );
                                }}
                                className="flex items-center cursor-pointer text-lg text-company-blue"
                            >
                                <span>Guardar</span>
                                <BiChevronRight size={32} />
                            </button>
                        </div>
                    </>
                )}

            {detailStep === 1 && (
                <div className="flex flex-col px-20 py-10 relative">
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="flex flex-col space-y-4 p-4 mb-[20%]">
                            <h2 className="text-company-orange font-bold text-4xl">
                                Examen Finalizado con Éxito
                            </h2>
                            <p className="text-white w-[80%] xl:w-[80%] text-justify pb-10">
                                Lorem ipsum dolor sit amet, consectetuer
                                adipiscing elit, sed diam nonummy nibh euismod
                                tincidunt ut laoreet dolore magna aliquam erat
                                volutpat. Ut wisi enim ad minim veniam, quis
                                nostrud exerci tation ullamcorper suscipit
                                lobortis nisl ut aliquip ex ea commodo
                                consequat.
                            </p>
                            {userRol === "Recepción" && (
                                <div className="pr-10 space-y-4 pb-10">
                                    <label className="text-company-orange">
                                        Enviar a:
                                    </label>
                                    <SelectComponent
                                        options={allAreas}
                                        selectChangeHandlerSentTo={
                                            selectChangeHandlerSentTo
                                        }
                                    />
                                </div>
                            )}
                            <div className="grid grid-cols-1 xl:grid-cols-2">
                                <button
                                    onClick={(e) => {
                                        handleSendForm(e).then(() => {
                                            setDetailStep(
                                                (prevStep: number) =>
                                                    prevStep + 1,
                                            );
                                        });
                                    }}
                                    className="w-48 flex items-center justify-center bg-gray-800 hover:bg-gray-700 shadow-md px-1 py-2 border border-company-blue rounded-xl text-white"
                                >
                                    <span>Guardar y enviar</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setDetailStep(3);
                                    }}
                                    className="w-48 flex items-center justify-center bg-gray-800 hover:bg-gray-700 shadow-md space-x-2 px-1 py-2 border border-company-blue rounded-xl text-white"
                                >
                                    <IoEye
                                        className="text-company-blue"
                                        size={24}
                                    />
                                    <span>Previsualizar</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col h-auto justify-end items-center left-[50%] absolute -bottom-5">
                            <DoctorVector width={500} height={500} />
                        </div>
                    </div>
                </div>
            )}
            {detailStep === 2 && (
                <div className="flex flex-col p-16 pt-4 relative">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-row space-x-4 rounded-xl bg-black bg-opacity-40">
                            <div className="flex flex-col pr-[40%] pb-[15%] pl-[10%] pt-[15%] space-y-8">
                                <h2 className="text-company-orange font-bold text-4xl">
                                    {`La orden #${orderAndPatientData?.uid} ha sido enviada con éxito al área
                                    encargada`}
                                </h2>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDetailStep(0);
                                        router.replace(
                                            "/dashboard/orders-historial",
                                        );
                                    }}
                                    className="w-48 flex flex-col justify-center items-center space-x-2 text-white hover:text-gray-300 text-center border-sky-800 hover:border-sky-300 border-2 rounded-md p-2 bg-company-gray shadow-lg"
                                >
                                    <span>Ir al historial</span>
                                </button>
                            </div>
                            <div className="flex flex-col justify-center items-center mt-10 left-[50%] absolute -bottom-5">
                                <DoctorVector width={500} height={500} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {detailStep === 3 && (
                <PreviewOrder
                    backToOrder={backToOrder}
                    backToDetail={backToDetail}
                />
            )}
        </div>
    );
};

export default OrderDetailsContent;
