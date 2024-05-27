"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoArrowBackCircleOutline, IoCheckmark, IoEye } from "react-icons/io5";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import useAuth from "../firebase/auth";
import SelectComponent from "./SelectComponent";
import InputFileUpload from "./UpLoadButton";
import {
    diagnosisMachineTwo,
    options,
    suppliers,
} from "./constants/stepByStepConstants";
import { getAllOrders, getAllPatients } from "../firebase/documents";
import { Order } from "../types/order";
import { Patient } from "../types/patient";

const OrderDetailsContent = ({ params }: { params: { slug: string } }) => {
    const { isActiveUser, userData } = useAuth();

    const router = useRouter();
    const [expandReceptionData, setExpandReceptionData] = useState(false);
    const [expandSpecialist, setExpandSpecialist] = useState(false);
    const [expandRx1, setExpandRx1] = useState(false);
    const [expandRx2, setExpandRx2] = useState(false);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState<string[]>([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

    const [ordersData, setOrdersData] = useState<any>();
    const [patientsData, setPatientsData] = useState<any>();

    const allDataOrders = ordersData?.flatMap((order: Order) => {
        const patient = patientsData?.find(
            (patient: Patient) => patient.uid === order.patientId,
        );

        if (patient) {
            const { id, name, lastName, phone, email } = patient;
            return { ...order, id, name, lastName, phone, email };
        }

        return [];
    });

    const patient = allDataOrders?.find((item: any) => item.uid === params.slug);

    const getOrders = useCallback(async () => {
        const allOrdersData = await getAllOrders();
        allOrdersData && setOrdersData(allOrdersData);
    }, []);

    const getPatients = useCallback(async () => {
        const allPatientsData = await getAllPatients();
        allPatientsData && setPatientsData(allPatientsData);
    }, []);

    useEffect(() => {
        getOrders();
        getPatients();
    }, [getOrders, getPatients]);

    const handleChecks = (
        option: string,
        selected: string[],
        setSelected: (e: any) => void,
    ) => {
        if (selected.includes(option)) {
            let selectedList = selected.filter((item) => item !== option);
            setSelected(selectedList);
        } else {
            setSelected([...selected, option]);
        }
    };

    return (
        <div className="mx-auto flex flex-col space-y-8 rounded-[2.5rem] bg-company-gray p-12 w-full max-w-[1440px]">
            <div className="flex items-center space-x-8">
                <Link href={"/dashboard/orders-historial"}>
                    <IoArrowBackCircleOutline
                        className="text-company-blue"
                        size={32}
                    />
                </Link>
                <h2 className="text text-company-orange text-xl">
                    {patient && `Orden #${patient?.uid} - ${patient?.name} ${patient?.lastName}`}
                </h2>
            </div>
            <div className="mx-16">
                <button
                    onClick={() => {
                        router.replace("/dashboard/new-order/preview-order");
                    }}
                    className="flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                >
                    <IoEye className="text-company-blue" size={24} />
                    <span>Previsualizar PDF</span>
                </button>
            </div>
            {userData && userData?.rol === "Profesional" && (
                <>
                    {/* Reception data */}
                    <div
                        className={`flex flex-col mx-16 transition-transform rounded-xl ${
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
                                <textarea
                                    id="Observations"
                                    name="observations"
                                    rows={4}
                                    cols={50}
                                    className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                    placeholder="Escribe aquí tus observaciones..."
                                    // onChange={(e) =>
                                    //     setObservationComment(e.target.value)
                                    // }
                                />
                            </div>
                        )}
                    </div>
                    {/* Especialist */}
                    <div
                        className={`flex flex-col mx-16 transition-transform rounded-xl ${
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
                                <textarea
                                    id="Observations"
                                    name="observations"
                                    rows={4}
                                    cols={50}
                                    className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                    placeholder="Escribe aquí tus observaciones..."
                                    // onChange={(e) =>
                                    //     setObservationComment(e.target.value)
                                    // }
                                />
                            </div>
                        )}
                    </div>
                    {/* Rx1 */}
                    <div
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
                                <textarea
                                    id="Observations"
                                    name="observations"
                                    rows={4}
                                    cols={50}
                                    className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                    placeholder="Escribe aquí tus observaciones..."
                                    // onChange={(e) =>
                                    //     setObservationComment(e.target.value)
                                    // }
                                />
                            </div>
                        )}
                    </div>
                    {/* Rx2 */}
                    <div
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
                                <textarea
                                    id="Observations"
                                    name="observations"
                                    rows={4}
                                    cols={50}
                                    className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                    placeholder="Escribe aquí tus observaciones..."
                                    // onChange={(e) =>
                                    //     setObservationComment(e.target.value)
                                    // }
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
            {userData && userData?.rol === "Recepción/Caja" && (
                <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                    <h3 className="text-company-orange text-xl font-bold">
                        Observaciones
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        <textarea
                            id="Observations"
                            name="observations"
                            rows={4}
                            cols={50}
                            className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                            placeholder="Escribe aquí tus observaciones..."
                            // onChange={(e) =>
                            //     setObservationComment(e.target.value)
                            // }
                        />
                    </div>
                </div>
            )}
            {userData && userData?.rol === "Modelos" && (
                <div className="flex flex-col mx-20">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl">
                            <h3 className="text-company-orange text-xl font-bold">
                                Diagnóstico
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {diagnosisMachineTwo.map((option, index) => {
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
                                })}
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl">
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
                                <SelectComponent options={options} />
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                            <h3 className="text-company-orange text-xl font-bold">
                                Observaciones
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                <textarea
                                    id="Observations"
                                    name="observations"
                                    rows={4}
                                    cols={50}
                                    className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                    placeholder="Escribe aquí tus observaciones..."
                                    // onChange={(e) =>
                                    //     setObservationComment(e.target.value)
                                    // }
                                />
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                            <h3 className="text-company-orange text-xl font-bold">
                                Impresión diagnostica
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                <textarea
                                    id="Observations"
                                    name="observations"
                                    rows={4}
                                    cols={50}
                                    className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                    placeholder="Escribe aquí tus observaciones..."
                                    // onChange={(e) =>
                                    //     setObservationComment(e.target.value)
                                    // }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {userData && userData?.rol === "Despachos" && (
                <div className="flex flex-col mx-20 pt-20">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                            <h3 className="text-company-orange text-xl font-bold">
                                Observaciones
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                <textarea
                                    id="Observations"
                                    name="observations"
                                    rows={4}
                                    cols={50}
                                    className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                    placeholder="Escribe aquí tus observaciones..."
                                    // onChange={(e) =>
                                    //     setObservationComment(e.target.value)
                                    // }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {userData && userData?.rol === "Despachos" && (
                <div className="flex flex-col mx-20">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl">
                            <h3 className="text-company-orange text-xl font-bold">
                                Diagnóstico
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {diagnosisMachineTwo.map((option, index) => {
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
                                })}
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl">
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
                        <div className="col-span-2 flex flex-col pb-5 space-y-4 w-48">
                            <InputFileUpload />
                        </div>
                        <div className="col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                            <h3 className="text-company-orange text-xl font-bold">
                                Observaciones
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                <textarea
                                    id="Observations"
                                    name="observations"
                                    rows={4}
                                    cols={50}
                                    className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent"
                                    placeholder="Escribe aquí tus observaciones..."
                                    // onChange={(e) =>
                                    //     setObservationComment(e.target.value)
                                    // }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetailsContent;
