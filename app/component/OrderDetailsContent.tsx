"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoArrowBackCircleOutline, IoCheckmark, IoEye } from "react-icons/io5";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import useAuth from "../firebase/auth";
import SelectComponent from "./SelectComponent";
import InputFileUpload from "./UpLoadButton";

const OrderDetailsContent = () => {
    const { isActiveUser, userData } = useAuth();

    const router = useRouter();
    const [expandReceptionData, setExpandReceptionData] = useState(false);
    const [expandSpecialist, setExpandSpecialist] = useState(false);
    const [expandRx1, setExpandRx1] = useState(false);
    const [expandRx2, setExpandRx2] = useState(false);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState<string[]>([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

    //*Aquí para cambiar de vista a recepcionista
    // const [user, setUser] = useState<string>(`${userData?.rol}`); // user:"Modelos", "Despachos", "Profesional", "Recepción/Caja", "Despachos"

    const suppliers = ["Invisalign", "T-Brux", "Planeación Virtual"];

    const diagnosis = ["Steiner", "Inferior", "Lorem Ipsum"];

    const options: { value: string; label: string }[] = [
        { value: "modelsScanner", label: "Modelos/Escáner" },
        { value: "radiologyTomography", label: "Radiología/Tomografía" },
        { value: "diagnóstico ", label: "Diagnóstico" },
        { value: "despacho ", label: "Despacho" },
    ];

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
                    Orden #123456 - Jhon Doe
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
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nam pretium velit ut
                                    efficitur elementum. Cras ac sapien
                                    hendrerit, consequat enim ac, faucibus
                                    tellus. Sed a sagittis lorem. Donec eget
                                    elit a leo ullamcorper accumsan ac sit amet
                                    metus. Suspendisse at ligula malesuada,
                                    euismod elit sed, ultricies leo. Aliquam
                                    tempus dictum ante, eu tincidunt urna
                                    aliquam id. Mauris vulputate ex id felis
                                    euismod, non pretium lorem faucibus. Morbi
                                    sed iaculis lectus. Duis vulputate, mi quis
                                    laoreet suscipit, nisi enim maximus ante,
                                    nec dignissim diam ex id nunc. Maecenas
                                    sagittis metus libero, ut vehicula velit
                                    rutrum nec. Vivamus at rutrum lacus, in
                                    sagittis augue. Phasellus a sem convallis,
                                    fringilla metus viverra, commodo est.
                                    Pellentesque elementum posuere quam sit amet
                                    sodales. Ut ac scelerisque ex. Donec et
                                    massa nunc. Pellentesque ligula lorem,
                                    sodales in bibendum eget, pellentesque nec
                                    metus.
                                </p>
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
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nam pretium velit ut
                                    efficitur elementum. Cras ac sapien
                                    hendrerit, consequat enim ac, faucibus
                                    tellus. Sed a sagittis lorem. Donec eget
                                    elit a leo ullamcorper accumsan ac sit amet
                                    metus. Suspendisse at ligula malesuada,
                                    euismod elit sed, ultricies leo. Aliquam
                                    tempus dictum ante, eu tincidunt urna
                                    aliquam id. Mauris vulputate ex id felis
                                    euismod, non pretium lorem faucibus. Morbi
                                    sed iaculis lectus. Duis vulputate, mi quis
                                    laoreet suscipit, nisi enim maximus ante,
                                    nec dignissim diam ex id nunc. Maecenas
                                    sagittis metus libero, ut vehicula velit
                                    rutrum nec. Vivamus at rutrum lacus, in
                                    sagittis augue. Phasellus a sem convallis,
                                    fringilla metus viverra, commodo est.
                                    Pellentesque elementum posuere quam sit amet
                                    sodales. Ut ac scelerisque ex. Donec et
                                    massa nunc. Pellentesque ligula lorem,
                                    sodales in bibendum eget, pellentesque nec
                                    metus.
                                </p>
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
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nam pretium velit ut
                                    efficitur elementum. Cras ac sapien
                                    hendrerit, consequat enim ac, faucibus
                                    tellus. Sed a sagittis lorem. Donec eget
                                    elit a leo ullamcorper accumsan ac sit amet
                                    metus. Suspendisse at ligula malesuada,
                                    euismod elit sed, ultricies leo. Aliquam
                                    tempus dictum ante, eu tincidunt urna
                                    aliquam id. Mauris vulputate ex id felis
                                    euismod, non pretium lorem faucibus. Morbi
                                    sed iaculis lectus. Duis vulputate, mi quis
                                    laoreet suscipit, nisi enim maximus ante,
                                    nec dignissim diam ex id nunc. Maecenas
                                    sagittis metus libero, ut vehicula velit
                                    rutrum nec. Vivamus at rutrum lacus, in
                                    sagittis augue. Phasellus a sem convallis,
                                    fringilla metus viverra, commodo est.
                                    Pellentesque elementum posuere quam sit amet
                                    sodales. Ut ac scelerisque ex. Donec et
                                    massa nunc. Pellentesque ligula lorem,
                                    sodales in bibendum eget, pellentesque nec
                                    metus.
                                </p>
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
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nam pretium velit ut
                                    efficitur elementum. Cras ac sapien
                                    hendrerit, consequat enim ac, faucibus
                                    tellus. Sed a sagittis lorem. Donec eget
                                    elit a leo ullamcorper accumsan ac sit amet
                                    metus. Suspendisse at ligula malesuada,
                                    euismod elit sed, ultricies leo. Aliquam
                                    tempus dictum ante, eu tincidunt urna
                                    aliquam id. Mauris vulputate ex id felis
                                    euismod, non pretium lorem faucibus. Morbi
                                    sed iaculis lectus. Duis vulputate, mi quis
                                    laoreet suscipit, nisi enim maximus ante,
                                    nec dignissim diam ex id nunc. Maecenas
                                    sagittis metus libero, ut vehicula velit
                                    rutrum nec. Vivamus at rutrum lacus, in
                                    sagittis augue. Phasellus a sem convallis,
                                    fringilla metus viverra, commodo est.
                                    Pellentesque elementum posuere quam sit amet
                                    sodales. Ut ac scelerisque ex. Donec et
                                    massa nunc. Pellentesque ligula lorem,
                                    sodales in bibendum eget, pellentesque nec
                                    metus.
                                </p>
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
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Repudiandae praesentium ullam pariatur qui
                            blanditiis unde sunt a tempora iure cumque corrupti,
                            maiores beatae explicabo dolores nisi. Error a nam
                            possimus.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Repudiandae praesentium ullam pariatur qui
                            blanditiis unde sunt a tempora iure cumque corrupti,
                            maiores beatae explicabo dolores nisi. Error a nam
                            possimus.
                        </p>
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
                                {diagnosis.map((option, index) => {
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
                                <p className="text-white text-justify">
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Repudiandae praesentium
                                    ullam pariatur qui blanditiis unde sunt a
                                    tempora iure cumque corrupti, maiores beatae
                                    explicabo dolores nisi. Error a nam
                                    possimus.
                                </p>
                                <p className="text-white text-justify">
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Repudiandae praesentium
                                    ullam pariatur qui blanditiis unde sunt a
                                    tempora iure cumque corrupti, maiores beatae
                                    explicabo dolores nisi. Error a nam
                                    possimus.
                                </p>
                            </div>
                        </div>
                        <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                            <h3 className="text-company-orange text-xl font-bold">
                                Impresión diagnostica
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Repudiandae praesentium
                                    ullam pariatur qui blanditiis unde sunt a
                                    tempora iure cumque corrupti, maiores beatae
                                    explicabo dolores nisi. Error a nam
                                    possimus.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Repudiandae praesentium
                                    ullam pariatur qui blanditiis unde sunt a
                                    tempora iure cumque corrupti, maiores beatae
                                    explicabo dolores nisi. Error a nam
                                    possimus.
                                </p>
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
                                <p className="text-white text-justify">
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Repudiandae praesentium
                                    ullam pariatur qui blanditiis unde sunt a
                                    tempora iure cumque corrupti, maiores beatae
                                    explicabo dolores nisi. Error a nam
                                    possimus.
                                </p>
                                <p className="text-white text-justify">
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Repudiandae praesentium
                                    ullam pariatur qui blanditiis unde sunt a
                                    tempora iure cumque corrupti, maiores beatae
                                    explicabo dolores nisi. Error a nam
                                    possimus.
                                </p>
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
                                {diagnosis.map((option, index) => {
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
                                <p className="text-white text-justify">
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Repudiandae praesentium
                                    ullam pariatur qui blanditiis unde sunt a
                                    tempora iure cumque corrupti, maiores beatae
                                    explicabo dolores nisi. Error a nam
                                    possimus.
                                </p>
                                <p className="text-white text-justify">
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Repudiandae praesentium
                                    ullam pariatur qui blanditiis unde sunt a
                                    tempora iure cumque corrupti, maiores beatae
                                    explicabo dolores nisi. Error a nam
                                    possimus.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetailsContent;
