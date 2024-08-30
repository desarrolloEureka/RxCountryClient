"use client";
import Link from "next/link";
import { IoArrowBackCircleOutline, IoEye } from "react-icons/io5";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { RolesBd } from "../types/roles";
import Spinner from "./spinner/Spinner";
import _ from "lodash";

interface Props {
    fromDetails: string | null | undefined;
    userRol?: RolesBd;
    expandReceptionData: boolean;
    setExpandReceptionData: (e: any) => void;
    expandSpecialist: boolean;
    setExpandSpecialist: (e: any) => void;
    expandRx1: boolean;
    setExpandRx1: (e: any) => void;
    expandRx2: boolean;
    setExpandRx2: (e: any) => void;
    expandRx3: boolean;
    setExpandRx3: (e: any) => void;
    expandRx4: boolean;
    setExpandRx4: (e: any) => void;
    expandRx5: boolean;
    setExpandRx5: (e: any) => void;
    expandRx6: boolean;
    setExpandRx6: (e: any) => void;
    expandRx7: boolean;
    setExpandRx7: (e: any) => void;
    orderAndPatientData: any;
    detailStep: number;
    // setDetailStep: (e: any) => void;
    area: string;
    formatearFecha: (fecha: string) => string;
    getLastUserData: (id: string) => string;
    areasSelected: string[];
}

const OrderDetailsContent = ({
    fromDetails,
    userRol,
    area,
    expandReceptionData,
    setExpandReceptionData,
    expandSpecialist,
    setExpandSpecialist,
    expandRx1,
    setExpandRx1,
    expandRx2,
    setExpandRx2,
    expandRx3,
    setExpandRx3,
    expandRx4,
    setExpandRx4,
    expandRx5,
    setExpandRx5,
    expandRx6,
    setExpandRx6,
    expandRx7,
    setExpandRx7,
    orderAndPatientData,
    detailStep,
    // setDetailStep,
    formatearFecha,
    getLastUserData,
    areasSelected,
}: Props) => {
    // const router = useRouter();

    if (
        !orderAndPatientData ||
        !userRol ||
        (!area && userRol.uid !== "ZWb0Zs42lnKOjetXH5lq")
    ) {
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
            className={`mx-auto flex flex-col rounded-[1.5rem]  sm:rounded-[2.5rem] bg-company-gray ${
                detailStep !== 3 && "pt-12"
            } w-full max-w-[1440px]`}
        >
            {detailStep === 0 && (
                <div className="flex flex-col lg:flex-row justify-between px-4 lg:px-12 space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-8 w-full">
                        <Link
                            href={`${
                                fromDetails === "received"
                                    ? "/dashboard/orders-historial"
                                    : "/dashboard/orders-historial/?to=send"
                            }`}
                        >
                            <IoArrowBackCircleOutline
                                className="text-company-blue"
                                size={32}
                            />
                        </Link>
                        <h2 className="text-company-orange text-xl">
                            {orderAndPatientData &&
                                `Orden #${orderAndPatientData?.uid} - ${orderAndPatientData?.name} ${orderAndPatientData?.lastName}`}
                        </h2>
                    </div>
                    {orderAndPatientData?.areaList &&
                        !_.isEmpty(orderAndPatientData?.areaList) && (
                            <div className="flex flex-col justify-center items-center text-company-orange text-xl w-full">
                                <span className="font-bold">
                                    Áreas Seleccionadas:&nbsp;
                                </span>
                                <span>{areasSelected.join(", ")}</span>
                            </div>
                        )}
                </div>
            )}

            {/* Visualizar PDF */}
            {detailStep === 0 && (
                <div className="flex mx-4 my-5 lg:mx-28 lg:my-10 lg:items-center justify-center lg:justify-start">
                    <button
                        type="button"
                        className="flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                    >
                        <IoEye className="text-company-blue" size={24} />
                        <Link
                            href={`/dashboard/preview-order/${orderAndPatientData?.uid}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <span className="text-nowrap">
                                Previsualizar PDF
                            </span>
                        </Link>
                    </button>
                </div>
            )}

            {/* Trazabilidad */}

            {detailStep === 0 && (
                <div className="pb-10">
                    {/* Despacho */}
                    {(orderAndPatientData?.desObservationComment ||
                        userRol.uid === "9RZ9uhaiwMC7VcTyIzhl") && (
                        <div
                            className={`flex flex-col m-4 lg:mx-28 lg:mb-10 transition-transform rounded-xl ${
                                expandRx7
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white text-sm lg:text-base"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx7(!expandRx7)}
                                className="flex justify-between items-center py-2 px-4 text-sm lg:text-base"
                            >
                                Despacho
                                {expandRx7 ? (
                                    <>
                                        {orderAndPatientData?.desObservationComment && (
                                            <>
                                                <span className="text-xs lg:text-base">
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.desObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.desObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Hora: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.desObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[1]
                                                    }`}
                                                </span>
                                            </>
                                        )}

                                        <RiArrowUpSLine size={32} />
                                    </>
                                ) : (
                                    <RiArrowDownSLine size={32} />
                                )}
                            </button>
                            {expandRx7 && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-base lg:text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="text-sm lg:text-base">
                                        {orderAndPatientData
                                            ?.desObservationComment?.message ||
                                            "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Diagnostico */}
                    {(orderAndPatientData?.diaObservationComment ||
                        userRol.uid === "wGU4GU8oDosW4ayQtxqT") && (
                        <div
                            className={`flex flex-col m-4 lg:mx-28 lg:mb-10 transition-transform rounded-xl ${
                                expandRx6
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white text-sm lg:text-base"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx6(!expandRx6)}
                                className="flex justify-between items-center py-2 px-4 text-sm lg:text-base"
                            >
                                Diagnostico
                                {expandRx6 ? (
                                    <>
                                        {orderAndPatientData?.diaObservationComment && (
                                            <>
                                                <span className="text-xs lg:text-base">
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.diaObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.diaObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Hora: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.diaObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[1]
                                                    }`}
                                                </span>
                                            </>
                                        )}

                                        <RiArrowUpSLine size={32} />
                                    </>
                                ) : (
                                    <RiArrowDownSLine size={32} />
                                )}
                            </button>
                            {expandRx6 && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-base lg:text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="text-sm lg:text-base">
                                        {orderAndPatientData
                                            ?.diaObservationComment?.message ||
                                            "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Radiología */}
                    {(orderAndPatientData?.radObservationComment ||
                        userRol.uid === "V5iMSnSlSYsiSDFs4UpI") && (
                        <div
                            className={`flex flex-col m-4 lg:mx-28 lg:mb-10 transition-transform rounded-xl ${
                                expandRx5
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white text-sm lg:text-base"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx5(!expandRx5)}
                                className="flex justify-between items-center py-2 px-4 text-sm lg:text-base"
                            >
                                Radiología
                                {expandRx5 ? (
                                    <>
                                        {orderAndPatientData?.radObservationComment && (
                                            <>
                                                <span className="text-xs lg:text-base">
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.radObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.radObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Hora: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.radObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[1]
                                                    }`}
                                                </span>
                                            </>
                                        )}

                                        <RiArrowUpSLine size={32} />
                                    </>
                                ) : (
                                    <RiArrowDownSLine size={32} />
                                )}
                            </button>
                            {expandRx5 && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-base lg:text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="text-sm lg:text-base">
                                        {orderAndPatientData
                                            ?.radObservationComment?.message ||
                                            "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Laboratorio */}
                    {(orderAndPatientData?.labObservationComment ||
                        userRol.uid === "chbFffCzpRibjYRyoWIx") && (
                        <div
                            className={`flex flex-col m-4 lg:mx-28 lg:mb-10 transition-transform rounded-xl ${
                                expandRx4
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white text-sm lg:text-base"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx4(!expandRx4)}
                                className="flex justify-between items-center py-2 px-4 text-sm lg:text-base"
                            >
                                Laboratorio
                                {expandRx4 ? (
                                    <>
                                        {orderAndPatientData?.labObservationComment && (
                                            <>
                                                <span className="text-xs lg:text-base">
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.labObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.labObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Hora: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.labObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[1]
                                                    }`}
                                                </span>
                                            </>
                                        )}

                                        <RiArrowUpSLine size={32} />
                                    </>
                                ) : (
                                    <RiArrowDownSLine size={32} />
                                )}
                            </button>
                            {expandRx4 && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-base lg:text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="text-sm lg:text-base">
                                        {orderAndPatientData
                                            ?.labObservationComment?.message ||
                                            "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Escáner Digital */}
                    {(orderAndPatientData?.escObservationComment ||
                        userRol.uid === "VEGkDuMXs2mCGxXUPCWI") && (
                        <div
                            className={`flex flex-col m-4 lg:mx-28 lg:mb-10 transition-transform rounded-xl ${
                                expandRx3
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white text-sm lg:text-base"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx3(!expandRx3)}
                                className="flex justify-between items-center py-2 px-4 text-sm lg:text-base"
                            >
                                Escáner Digital
                                {expandRx3 ? (
                                    <>
                                        {orderAndPatientData?.escObservationComment && (
                                            <>
                                                <span className="text-xs lg:text-base">
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.escObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.escObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Hora: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.escObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[1]
                                                    }`}
                                                </span>
                                            </>
                                        )}

                                        <RiArrowUpSLine size={32} />
                                    </>
                                ) : (
                                    <RiArrowDownSLine size={32} />
                                )}
                            </button>
                            {expandRx3 && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-base lg:text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="text-sm lg:text-base">
                                        {orderAndPatientData
                                            ?.escObservationComment?.message ||
                                            "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Fotografía */}
                    {(orderAndPatientData?.fotObservationComment ||
                        userRol.uid === "c24R4P0VcQmQT0VT6nfo") && (
                        <div
                            className={`flex flex-col m-4 lg:mx-28 lg:mb-10 transition-transform rounded-xl ${
                                expandRx2
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white text-sm lg:text-base"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx2(!expandRx2)}
                                className="flex justify-between items-center py-2 px-4 text-sm lg:text-base"
                            >
                                Fotografía
                                {expandRx2 ? (
                                    <>
                                        {orderAndPatientData?.fotObservationComment && (
                                            <>
                                                <span className="text-xs lg:text-base">
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.fotObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.fotObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Hora: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.fotObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[1]
                                                    }`}
                                                </span>
                                            </>
                                        )}

                                        <RiArrowUpSLine size={32} />
                                    </>
                                ) : (
                                    <RiArrowDownSLine size={32} />
                                )}
                            </button>
                            {expandRx2 && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-base lg:text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="text-sm lg:text-base">
                                        {orderAndPatientData
                                            ?.fotObservationComment?.message ||
                                            "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Modelos */}
                    {(orderAndPatientData?.modObservationComment ||
                        userRol.uid === "g9xGywTJG7WSJ5o1bTsH") && (
                        <div
                            className={`flex flex-col m-4 lg:mx-28 lg:mb-10 transition-transform rounded-xl ${
                                expandRx1
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white text-sm lg:text-base"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx1(!expandRx1)}
                                className="flex justify-between items-center py-2 px-4 text-sm lg:text-base"
                            >
                                Modelos
                                {expandRx1 ? (
                                    <>
                                        {orderAndPatientData?.modObservationComment && (
                                            <>
                                                <span className="text-xs lg:text-base">
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.modObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.modObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Hora: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.modObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[1]
                                                    }`}
                                                </span>
                                            </>
                                        )}

                                        <RiArrowUpSLine size={32} />
                                    </>
                                ) : (
                                    <RiArrowDownSLine size={32} />
                                )}
                            </button>
                            {expandRx1 && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-base lg:text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="text-sm lg:text-base">
                                        {orderAndPatientData
                                            ?.modObservationComment?.message ||
                                            "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Reception data */}
                    {(orderAndPatientData?.recObservationComment ||
                        userRol.uid === "Ll6KGdzqdtmLLk0D5jhk") && (
                        <div
                            className={`flex flex-col m-4 lg:mx-28 lg:mb-10 transition-transform rounded-xl ${
                                expandReceptionData
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white text-sm lg:text-base"
                            }`}
                        >
                            <button
                                onClick={() =>
                                    setExpandReceptionData(!expandReceptionData)
                                }
                                className="flex justify-between items-center py-2 px-4 text-sm lg:text-base"
                            >
                                <span>Datos recepción</span>

                                {expandReceptionData ? (
                                    <>
                                        {orderAndPatientData?.recObservationComment && (
                                            <>
                                                <span className="text-xs lg:text-base">
                                                    {`Usuario:  ${
                                                        orderAndPatientData?.recObservationComment
                                                            ? getLastUserData(
                                                                  orderAndPatientData
                                                                      ?.recObservationComment
                                                                      ?.userId,
                                                              )
                                                            : ""
                                                    }`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Fecha: ${
                                                        orderAndPatientData?.recObservationComment
                                                            ? formatearFecha(
                                                                  orderAndPatientData
                                                                      ?.recObservationComment
                                                                      ?.timestamp,
                                                              ).split(" ")[0]
                                                            : ""
                                                    }`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Hora: ${
                                                        orderAndPatientData?.recObservationComment
                                                            ? formatearFecha(
                                                                  orderAndPatientData
                                                                      ?.recObservationComment
                                                                      ?.timestamp,
                                                              ).split(" ")[1]
                                                            : ""
                                                    }`}
                                                </span>
                                            </>
                                        )}

                                        <RiArrowUpSLine size={32} />
                                    </>
                                ) : (
                                    <RiArrowDownSLine size={32} />
                                )}
                            </button>
                            {expandReceptionData && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-base lg:text-xl">
                                        Observaciones
                                    </h2>
                                    <p className="text-sm lg:text-base">
                                        {orderAndPatientData
                                            ?.recObservationComment?.message ||
                                            "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* specialist */}
                    {(orderAndPatientData?.observationComment ||
                        userRol.uid === "ZWb0Zs42lnKOjetXH5lq") && (
                        <div
                            className={`flex flex-col m-4 lg:mx-28 lg:mb-10 transition-transform rounded-xl ${
                                expandSpecialist
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white text-sm lg:text-base"
                            }`}
                        >
                            <button
                                onClick={() =>
                                    setExpandSpecialist(!expandSpecialist)
                                }
                                className="flex justify-between items-center py-2 px-4 text-sm lg:text-base"
                            >
                                Especialista
                                {expandSpecialist ? (
                                    <>
                                        {orderAndPatientData?.observationComment && (
                                            <>
                                                <span className="text-xs lg:text-base">
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.observationComment
                                                            .userId,
                                                    )}`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.observationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span className="text-xs lg:text-base">
                                                    {`Hora: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.observationComment
                                                                ?.timestamp,
                                                        ).split(" ")[1]
                                                    }`}
                                                </span>
                                            </>
                                        )}

                                        <RiArrowUpSLine size={32} />
                                    </>
                                ) : (
                                    <RiArrowDownSLine size={32} />
                                )}
                            </button>
                            {expandSpecialist && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-base lg:text-xl">
                                        Observaciones
                                    </h2>
                                    <p className="text-sm lg:text-base">
                                        {orderAndPatientData.observationComment
                                            ?.message || "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderDetailsContent;
