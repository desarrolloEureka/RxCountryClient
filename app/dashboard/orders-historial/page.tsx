"use client";
import DashboardHeader from "@/app/component/DashboardHeader";
import LightIcon from "@/app/component/icons/LightIcon";
import DoctorVector from "@/app/component/vectors/DoctorVector";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import {
    IoIosArrowBack,
    IoIosArrowForward,
    IoIosNotifications,
    IoMdSearch,
} from "react-icons/io";
import { IoAlertCircleSharp } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { MdClose, MdPictureAsPdf } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import OrderHistorialHook from "./hook/OrderHistorialHook";

const OrderHistorialPage = () => {
    const {
        userData,
        router,
        showFilter,
        setShowFilter,
        showHelp,
        setShowHelp,
        selectedOrder,
        setSelectedOrder,
        userRol,
        setUserRol,
        orderMinorMajor,
        setOrderMinorMajor,
        nameAZ,
        setNameAZ,
        dateMinorMajor,
        setDateMinorMajor,
        dateMajorMinor,
        setDateMajorMinor,
        all,
        setAll,
    } = OrderHistorialHook();

    return (
        <main className="relative min-h-screen w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 flex flex-col min-h-screen w-full p-16 space-y-16">
                <DashboardHeader selectedMenuItem="orders-historial" />
                <div className="rounded-3xl shadow-lg bg-company-gray w-full max-w-[1440px] mx-auto">
                    <div className="flex justify-end items-center border-b-2 border-company-orange p-8">
                        {/* //todo: Se muestra dependiendo del usuario */}
                        <div
                            className={`grid ${
                                userRol === "Profesional"
                                    ? "grid-cols-1"
                                    : "grid-cols-2"
                            } flex-1 gap-52 xl:gap-80 `}
                        >
                            <div
                                onClick={() => {
                                    setSelectedOrder("received");
                                }}
                                className={`col flex flex-col ${
                                    userRol !== "Profesional" &&
                                    "cursor-pointer"
                                } items-end`}
                            >
                                <h3
                                    className={`text-2xl ${
                                        selectedOrder === "received"
                                            ? "text-company-orange"
                                            : " text-gray-400"
                                    }`}
                                >
                                    Ordenes recibidas
                                </h3>
                            </div>
                            {/* //todo: Se muestra dependiendo del usuario */}
                            {userRol !== "Profesional" && (
                                <div
                                    onClick={() => {
                                        setSelectedOrder("send");
                                    }}
                                    className="col flex flex-col cursor-pointer"
                                >
                                    <h3
                                        className={`text-2xl ${
                                            selectedOrder === "send"
                                                ? "text-company-orange"
                                                : " text-gray-400"
                                        }`}
                                    >
                                        Ordenes enviadas
                                    </h3>
                                </div>
                            )}
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
                    <div className="grid grid-cols-2 gap-8 items-center justify-between w-full mx-auto max-w-[1280px] py-4">
                        <div className="relative col flex flex-col space-y-2">
                            <label
                                htmlFor="search"
                                className="text-white text-sm"
                            >
                                Buscar imágenes por paciente
                            </label>
                            <input
                                type="search"
                                placeholder="Ej. Hernandez Rodriguez"
                                className="bg-white rounded-full shadow-lg h-10 pl-4 pr-10 text-black"
                            />
                            <IoMdSearch className="absolute right-3 bottom-2 text-2xl text-company-blue" />
                        </div>
                        <div className="relative flex items-end h-full space-x-8 w-full">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="rounded-full w-24 h-10 flex justify-center items-center shadow-lg bg-company-blue text-white"
                            >
                                <LuSettings2 size={24} />
                            </button>
                            <div className="relative col flex flex-col space-y-2 w-full">
                                <label
                                    htmlFor="search"
                                    className="text-white text-sm"
                                >
                                    Desde:
                                </label>
                                <input
                                    type="date"
                                    className="bg-white rounded-xl shadow-lg h-10 px-4 text-black"
                                />
                            </div>
                            <div className="relative col flex flex-col space-y-2 w-full">
                                <label
                                    htmlFor="search"
                                    className="text-white text-sm"
                                >
                                    Hasta:
                                </label>
                                <input
                                    type="date"
                                    className="bg-white rounded-xl shadow-lg h-10 px-4 text-black"
                                />
                            </div>
                            {showFilter && (
                                <div className="absolute top-7 left-4 bg-white shadow-xl rounded-2xl p-4 w-72">
                                    <div className="flex justify-between items-ce">
                                        <h2 className="text-xl text-company-blue font-bold">
                                            Filtrar por
                                        </h2>
                                        <button
                                            onClick={() => setShowFilter(false)}
                                            className="text-gray-400"
                                        >
                                            <MdClose size={28} />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap mt-4">
                                        <button
                                            onClick={() =>
                                                setOrderMinorMajor(
                                                    !orderMinorMajor,
                                                )
                                            }
                                            className={`flex flex-wrap m-2 justify-center items-center text-center py-2 w-28 text-[9px] rounded-xl border border-company-blue shadow-md ${
                                                orderMinorMajor
                                                    ? "bg-company-blue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                        >
                                            Ordenar de menor a mayor
                                        </button>
                                        <button
                                            onClick={() => setNameAZ(!nameAZ)}
                                            className={`flex flex-wrap m-2 justify-center items-center text-center py-2 w-28 text-[9px] rounded-xl border border-company-blue shadow-md ${
                                                nameAZ
                                                    ? "bg-company-blue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                        >
                                            Nombre A-Z
                                        </button>
                                        <button
                                            onClick={() =>
                                                setDateMinorMajor(
                                                    !dateMinorMajor,
                                                )
                                            }
                                            className={`flex flex-wrap m-2 justify-center items-center text-center py-2 w-28 text-[9px] rounded-xl border border-company-blue shadow-md ${
                                                dateMinorMajor
                                                    ? "bg-company-blue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                        >
                                            Fecha de menor a mayor
                                        </button>
                                        <button
                                            onClick={() =>
                                                setDateMajorMinor(
                                                    !dateMajorMinor,
                                                )
                                            }
                                            className={`flex flex-wrap m-2 justify-center items-center text-center py-2 w-28 text-[9px] rounded-xl border border-company-blue shadow-md ${
                                                dateMajorMinor
                                                    ? "bg-company-blue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                        >
                                            Fecha de mayor a menor
                                        </button>
                                        <button
                                            onClick={() => {
                                                setOrderMinorMajor(!all);
                                                setNameAZ(!all);
                                                setDateMinorMajor(!all);
                                                setDateMajorMinor(!all);
                                                setAll(!all);
                                            }}
                                            className={`flex flex-wrap m-2 justify-center items-center text-center py-2 w-28 text-[9px] rounded-xl border border-company-blue shadow-md ${
                                                all
                                                    ? "bg-company-blue text-white"
                                                    : "bg-white text-black"
                                            }`}
                                        >
                                            Todos
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col divide-y">
                        <div className="grid grid-cols-12 items-center text-company-orange py-4">
                            <div className="col-span-2 flex flex-col text-center">
                                <span>Detalle</span>
                            </div>
                            <div className="col">
                                <span># Orden</span>
                            </div>
                            <div className="col">
                                <span>Fecha</span>
                            </div>
                            <div className="col">
                                <span>Estado</span>
                            </div>
                            <div className="col">
                                <span>Cédula</span>
                            </div>
                            <div className="col">
                                <span>Nombre</span>
                            </div>
                            <div className="col">
                                <span>Apellido</span>
                            </div>
                            <div className="col-span-2">
                                <span>Correo</span>
                            </div>
                            <div className="col">
                                <span>Teléfono</span>
                            </div>
                        </div>
                        {Array.from({
                            length: selectedOrder === "send" ? 3 : 10,
                        }).map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => {
                                        router.push(
                                            "/dashboard/orders-historial/details/hola",
                                        );
                                    }}
                                    className="grid grid-cols-12 cursor-pointer items-center text-white py-4 hover:bg-gray-700"
                                >
                                    <div className="col-span-2 flex justify-between text-center text-company-blue px-16">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <IoIosNotifications size={24} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                router.push(
                                                    "/dashboard/new-order",
                                                );
                                                e.stopPropagation();
                                            }}
                                        >
                                            <RiEditBoxFill size={24} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                router.replace(
                                                    "/dashboard/new-order/preview-order",
                                                );
                                                e.stopPropagation();
                                            }}
                                        >
                                            <MdPictureAsPdf size={24} />
                                        </button>
                                    </div>
                                    <div className="col">
                                        <span>#123456</span>
                                    </div>
                                    <div className="col">
                                        <span>06/03/2024</span>
                                    </div>
                                    <div className="col">
                                        <span>Diagnóstico</span>
                                    </div>
                                    <div className="col">
                                        <span>12345644</span>
                                    </div>
                                    <div className="col">
                                        <span>Jhon</span>
                                    </div>
                                    <div className="col">
                                        <span>Doe</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span>demo@example.com</span>
                                    </div>
                                    <div className="col">
                                        <span>3216549870</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex tiems-center px-16 py-4 border-t-2 border-company-blue">
                        <button className="flex flex-col items-center text-white w-20 text-[9px]">
                            <BsFileEarmarkExcelFill
                                className="text-company-blue"
                                size={32}
                            />
                            <span>Descargar Excel</span>
                        </button>
                        <div className="flex items-center text-white justify-end w-full">
                            <button>
                                <IoIosArrowBack size={24} />
                            </button>
                            <span className="mx-4">Pag 1/1</span>
                            <button>
                                <IoIosArrowForward size={24} />
                            </button>
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

export default OrderHistorialPage;
