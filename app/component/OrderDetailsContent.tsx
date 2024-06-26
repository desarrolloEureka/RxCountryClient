"use client";
import Link from "next/link";
import {
    IoArrowBackCircleOutline,
    IoEye
} from "react-icons/io5";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
// import PreviewOrderPage from "../dashboard/preview-order/page";
import { RolesBd } from "../types/roles";
import Spinner from "./spinner/Spinner";

interface Props {
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
    orderAndPatientData: any;
    detailStep: number;
    // setDetailStep: (e: any) => void;
    area: string;
    formatearFecha: (fecha: string) => string;
    getLastUserData: (id: string) => string;
}

const OrderDetailsContent = ({
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
    orderAndPatientData,
    detailStep,
    // setDetailStep,
    formatearFecha,
    getLastUserData,
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
            className={`mx-auto flex flex-col rounded-[2.5rem] bg-company-gray ${
                detailStep !== 3 && "pt-12"
            } w-full max-w-[1440px]`}
        >
            {/* {(userRol.uid === "ZWb0Zs42lnKOjetXH5lq" ||
                orderAndPatientData?.sendTo !== area) && */}
            {detailStep === 0 && (
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

            {/* Visualizar PDF */}
            {detailStep === 0 && (
                <div className="mx-28 my-10">
                    <Link
                        href="/dashboard/preview-order"
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <button
                            type="button"
                            className="flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                        >
                            <IoEye className="text-company-blue" size={24} />
                            <span>Previsualizar PDF</span>
                        </button>
                    </Link>
                </div>
            )}

            {/* Trazabilidad */}
            {/* {(userRol.uid === "ZWb0Zs42lnKOjetXH5lq" ||
                orderAndPatientData?.sendTo !== area) && */}
            {detailStep === 0 && (
                <div className="pb-10">
                    {/* Reception data */}
                    {(orderAndPatientData?.recObservationComment ||
                        userRol.uid === "Ll6KGdzqdtmLLk0D5jhk") && (
                        <div
                            className={`flex flex-col mx-28 mb-10 transition-transform rounded-xl ${
                                expandReceptionData
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white"
                            }`}
                        >
                            <button
                                onClick={() =>
                                    setExpandReceptionData(!expandReceptionData)
                                }
                                className="flex justify-between items-center py-2 px-4"
                            >
                                <span>Datos recepción</span>

                                {expandReceptionData ? (
                                    <>
                                        {orderAndPatientData?.recObservationComment && (
                                            <>
                                                <span>
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
                                                <span>
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
                                                <span>
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
                                    <h2 className="font-bold text-xl">
                                        Observaciones
                                    </h2>
                                    <p className="">
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
                                    <>
                                        {orderAndPatientData?.observationComment && (
                                            <>
                                                <span>
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.observationComment
                                                            .userId,
                                                    )}`}
                                                </span>
                                                <span>
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.observationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span>
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
                                    <h2 className="font-bold text-xl">
                                        Observaciones
                                    </h2>
                                    <p className="">
                                        {orderAndPatientData.observationComment
                                            ?.message || "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Modelos */}
                    {(orderAndPatientData?.modObservationComment ||
                        userRol.uid === "g9xGywTJG7WSJ5o1bTsH") && (
                        <div
                            className={`flex flex-col mx-28 mb-10 transition-transform rounded-xl ${
                                expandRx1
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx1(!expandRx1)}
                                className="flex justify-between items-center py-2 px-4"
                            >
                                Modelos
                                {expandRx1 ? (
                                    <>
                                        {orderAndPatientData?.modObservationComment && (
                                            <>
                                                <span>
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.modObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span>
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.modObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span>
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
                                    <h2 className="font-bold text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="">
                                        {orderAndPatientData
                                            ?.modObservationComment?.message ||
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
                            className={`flex flex-col mx-28 mb-10 transition-transform rounded-xl ${
                                expandRx2
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx2(!expandRx2)}
                                className="flex justify-between items-center py-2 px-4"
                            >
                                Escáner Digital
                                {expandRx2 ? (
                                    <>
                                        {orderAndPatientData?.escObservationComment && (
                                            <>
                                                <span>
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.escObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span>
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.escObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span>
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
                            {expandRx2 && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="">
                                        {orderAndPatientData
                                            ?.escObservationComment?.message ||
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
                            className={`flex flex-col mx-28 mb-10 transition-transform rounded-xl ${
                                expandRx3
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx3(!expandRx3)}
                                className="flex justify-between items-center py-2 px-4"
                            >
                                Laboratorio
                                {expandRx3 ? (
                                    <>
                                        {orderAndPatientData?.labObservationComment && (
                                            <>
                                                <span>
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.labObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span>
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.labObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span>
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
                            {expandRx3 && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="">
                                        {orderAndPatientData
                                            ?.labObservationComment?.message ||
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
                            className={`flex flex-col mx-28 mb-10 transition-transform rounded-xl ${
                                expandRx4
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx4(!expandRx4)}
                                className="flex justify-between items-center py-2 px-4"
                            >
                                Radiología
                                {expandRx4 ? (
                                    <>
                                        {orderAndPatientData?.radObservationComment && (
                                            <>
                                                <span>
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.radObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span>
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.radObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span>
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
                            {expandRx4 && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="">
                                        {orderAndPatientData
                                            ?.radObservationComment?.message ||
                                            "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Despacho */}
                    {(orderAndPatientData?.desObservationComment ||
                        userRol.uid === "9RZ9uhaiwMC7VcTyIzhl") && (
                        <div
                            className={`flex flex-col mx-28 mb-10 transition-transform rounded-xl ${
                                expandRx5
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx5(!expandRx5)}
                                className="flex justify-between items-center py-2 px-4"
                            >
                                Despacho
                                {expandRx5 ? (
                                    <>
                                        {orderAndPatientData?.desObservationComment && (
                                            <>
                                                <span>
                                                    {`Usuario: ${getLastUserData(
                                                        orderAndPatientData
                                                            ?.desObservationComment
                                                            ?.userId,
                                                    )}`}
                                                </span>
                                                <span>
                                                    {`Fecha: ${
                                                        formatearFecha(
                                                            orderAndPatientData
                                                                ?.desObservationComment
                                                                ?.timestamp,
                                                        ).split(" ")[0]
                                                    }`}
                                                </span>
                                                <span>
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
                            {expandRx5 && (
                                <div className="flex flex-col p-4 space-y-2 text-white">
                                    <h2 className="font-bold text-xl">
                                        Observaciones
                                    </h2>

                                    <p className="">
                                        {orderAndPatientData
                                            ?.desObservationComment?.message ||
                                            "Sin comentarios"}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Rx2 */}
                    {/* <div
                            className={`flex flex-col mx-16 transition-transform rounded-xl ${
                                expandRx3
                                    ? "divide-y-2 divide-company-blue bg-gray-800 text-company-orange"
                                    : "bg-company-blue text-white"
                            }`}
                        >
                            <button
                                onClick={() => setExpandRx2(!expandRx3)}
                                className="flex justify-between items-center py-2 px-4"
                            >
                                Rx 2
                                {expandRx3 ? (
                                    <RiArrowUpSLine size={32} />
                                ) : (
                                    <RiArrowDownSLine size={32} />
                                )}
                            </button>
                            {expandRx3 && (
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
                        </div> */}
                </div>
            )}

            {/* {detailStep === 1 && (
                <div className="flex flex-col px-20 py-10 relative">
                    <div className="grid grid-cols-2 gap-4 ">
                        <div className="flex flex-col space-y-4 p-4">
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
                            {userRol.uid === "Ll6KGdzqdtmLLk0D5jhk" && (
                                <div className="pr-10 space-y-4 pb-10">
                                    <label className="text-company-orange">
                                        Enviar a:
                                    </label>
                                    <SelectComponent
                                        options={allAreas}
                                        selectChangeHandlerSentTo={(e) => {
                                            selectChangeHandlerSentTo(e.value);
                                            setAreaSelected(e);
                                        }}
                                        optionSelected={areaSelected}
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
                            <div className="flex flex-row pt-10 space-x-10">
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setDetailStep(
                                            (prevStep: number) => prevStep - 1,
                                        );
                                    }}
                                    className="flex items-center cursor-pointer text-company-blue"
                                >
                                    <BiChevronLeft size={32} />
                                    <span>Atrás</span>
                                </div>
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        router.replace(
                                            "/dashboard/orders-historial",
                                        );
                                    }}
                                    className="flex items-center cursor-pointer text-company-blue"
                                >
                                    <IoCloseSharp size={28} />
                                    <span>Cancelar</span>
                                </div>
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
            )} */}
        </div>
    );
};

export default OrderDetailsContent;
