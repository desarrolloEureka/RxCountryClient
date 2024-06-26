"use client";
import DashboardHeader from "@/app/component/DashboardHeader";
import LightIcon from "@/app/component/icons/LightIcon";
import Spinner from "@/app/component/spinner/Spinner";
import DoctorVector from "@/app/component/vectors/DoctorVector";
import Link from "next/link";
import { Suspense } from "react";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import {
    IoIosArrowBack,
    IoIosArrowForward,
    IoIosEye,
    IoIosNotifications,
    IoMdSearch,
} from "react-icons/io";
import { IoAlertCircleSharp } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { MdClose, MdPictureAsPdf } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { RiEditBoxFill } from "react-icons/ri";
import Datepicker from "react-tailwindcss-datepicker";
import OrderHistorialHook from "./hook/OrderHistorialHook";
import Swal from "sweetalert2";

const OrderHistorialPage = () => {
    const {
        userArea,
        router,
        showFilter,
        setShowFilter,
        showHelp,
        setShowHelp,
        selectedOrder,
        setSelectedOrder,
        userRol,
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
        allDataOrders,
        ordersByRol,
        formatearFecha,
        handleSearchInputChange,
        filteredOrders,
        showPdf,
        setShowPdf,
        orderId,
        setOrderId,
        downloadCSV,
        value,
        handleValueChange,
        // backToOrder,
        handlePreviousPage,
        handleNextPage,
        currentPage,
        totalPages,
        setItemsPerPage,
        ordersData,
        setCurrentPage,
        setStatusOpenOrder,
        getOrderStatus,
        getLastUserData,
    } = OrderHistorialHook();

    const modalLastUpdate = (item: any) => {
        const swalWithCustomClass = Swal.mixin({
            customClass: {
                // confirmButton:
                //     "bg-company-blue text-white px-3 py-2 rounded-xl",
                title: "text-company-orange",
            },
            // buttonsStyling: false,
        });
        swalWithCustomClass.fire({
            position: "center",
            title: "Ultima Actualización",
            html: `Fecha: ${
                item.updateLog.at(-1).lastUpdate
                    ? formatearFecha(item.updateLog.at(-1).lastUpdate)
                    : "Sin Registro"
            }<br/><br/> Usuario: ${
                item.updateLog.at(-1).lastUserId
                    ? getLastUserData(item.updateLog.at(-1).lastUserId)
                    : "No Registrado"
            }<br/><br/> Comentario: ${
                item.updateLog.at(-1).lastComment
                    ? item.updateLog.at(-1).lastComment
                    : "Sin Comentario"
            }`,
            background: "#404040",
            color: "white",
            confirmButtonColor: "#228cf0",
        });
    };

    if (!ordersByRol) {
        return (
            <main className="relative min-h-screen w-full bg-gray-image bg-fixed bg-cover">
                <div className="bg-black bg-opacity-60 flex flex-col min-h-screen w-full p-16 space-y-16">
                    <DashboardHeader selectedMenuItem="orders-historial" />
                    <div className="rounded-3xl shadow-lg bg-company-gray w-full max-w-[1440px] mx-auto">
                        <Spinner
                            background="bg-transparent"
                            screenH="min-h-96"
                        />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="relative min-h-screen w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 flex flex-col min-h-screen w-full p-16 space-y-16">
                <DashboardHeader selectedMenuItem="orders-historial" />
                <div className="rounded-3xl shadow-lg bg-company-gray w-full max-w-[1440px] mx-auto">
                    <div className="flex justify-end items-center p-8">
                        <div
                            className={`grid ${
                                userRol?.uid &&
                                userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq"
                                    ? "grid-cols-2"
                                    : "grid-cols-1"
                            } flex-1 gap-52 xl:gap-80 `}
                        >
                            {userRol?.uid &&
                                userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" && (
                                    <div
                                        onClick={() => {
                                            setSelectedOrder("received");
                                            setCurrentPage(1);
                                        }}
                                        className="col flex flex-col cursor-pointer items-end"
                                    >
                                        <h3
                                            className={`text-2xl ${
                                                selectedOrder === "received"
                                                    ? "text-company-orange"
                                                    : " text-gray-400"
                                            }`}
                                        >
                                            Ordenes Recibidas
                                        </h3>
                                    </div>
                                )}

                            <div
                                onClick={() => {
                                    userRol?.uid &&
                                        userRol?.uid !==
                                            "ZWb0Zs42lnKOjetXH5lq" &&
                                        setSelectedOrder("send");
                                    setCurrentPage(1);
                                }}
                                className={`col flex flex-col ${
                                    userRol?.uid &&
                                    userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq"
                                        ? "cursor-pointer items-start"
                                        : "items-center"
                                }`}
                            >
                                <h3
                                    className={`text-2xl ${
                                        selectedOrder === "send"
                                            ? "text-company-orange"
                                            : " text-gray-400"
                                    }`}
                                >
                                    Ordenes Enviadas
                                </h3>
                            </div>
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
                    <div
                        className={`flex flex-row bg-white ${
                            selectedOrder === "send" && "justify-end"
                        }  bg-opacity-25 w-full h-[0.1rem]`}
                    >
                        <div
                            className={`col h-[0.2rem] ${
                                userRol?.uid &&
                                userRol?.uid === "Ll6KGdzqdtmLLk0D5jhk"
                                    ? "w-1/2"
                                    : "w-full"
                            } bg-company-orange ${
                                selectedOrder === "received"
                                    ? "rounded-r-full"
                                    : "rounded-l-full"
                            }`}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-8 items-center justify-between w-full mx-auto max-w-[1280px] py-4">
                        <div className="relative col flex flex-col space-y-2">
                            <label
                                htmlFor="search"
                                className="text-white text-sm"
                            >
                                Buscar Ordenes por Paciente
                            </label>
                            <input
                                id="search"
                                type="search"
                                placeholder="Ej. Hernandez Rodriguez"
                                className="bg-white rounded-full shadow-lg h-10 pl-4 pr-10 text-black"
                                onChange={handleSearchInputChange}
                            />
                            <IoMdSearch className="absolute right-3 bottom-2 text-2xl text-company-blue" />
                        </div>
                        <div className="relative flex items-end h-full space-x-8 w-full">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="rounded-full w-10 h-10 flex justify-center items-center shadow-lg bg-company-blue text-white"
                            >
                                <LuSettings2 size={24} />
                            </button>

                            <div className="relative col flex flex-col space-y-2 w-full">
                                <label
                                    htmlFor="data-picker"
                                    className="text-white text-sm"
                                >
                                    Rango de fecha:
                                </label>

                                <Datepicker
                                    inputId="data-picker"
                                    inputName="data-picker"
                                    inputClassName="bg-white rounded-xl w-full shadow-lg h-10 px-4 text-black"
                                    onChange={handleValueChange}
                                    value={value}
                                    primaryColor={"amber"}
                                    separator={"al"}
                                    displayFormat={"DD/MM/YYYY"}
                                    readOnly={true}
                                    i18n={"es"}
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

                    <div className="flex flex-col divide-y overflow-x-auto custom-scrollbar pb-3 mb-5">
                        <div className="grid grid-cols-11 min-w-max items-center text-company-orange py-4 px-12">
                            <div className="col text-center text-nowrap w-48">
                                <span>Detalle</span>
                            </div>
                            <div className="col text-center text-nowrap w-48">
                                <span># Orden</span>
                            </div>
                            <div className="col text-center text-nowrap w-48">
                                <span>Fecha</span>
                            </div>
                            <div className="col text-center text-nowrap w-48">
                                <span>Estado</span>
                            </div>
                            <div className="col text-center text-nowrap w-48">
                                <span>Tipo Doc.</span>
                            </div>
                            <div className="col text-center text-nowrap w-48">
                                <span>Cédula</span>
                            </div>
                            <div className="col text-center text-nowrap w-48">
                                <span>Nombres</span>
                            </div>
                            <div className="col text-center text-nowrap w-48">
                                <span>Apellidos</span>
                            </div>
                            <div className="col text-center text-nowrap w-52">
                                <span>Correo</span>
                            </div>
                            <div className="col text-center text-nowrap w-48">
                                <span>Teléfono</span>
                            </div>
                            <div className="col text-center text-nowrap w-48">
                                <span>Ultima Actualización</span>
                            </div>
                        </div>
                        {filteredOrders?.map((item: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="grid grid-cols-11 min-w-max border-t items-center text-white py-4 hover:bg-gray-700 px-12"
                                >
                                    <div className="col flex justify-between text-nowrap text-company-blue w-48 px-5">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            <IoIosNotifications size={24} />
                                        </button>
                                        {userArea === item.sendTo && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    userRol?.uid !==
                                                    item.modifiedBy.userRolId
                                                        ? setStatusOpenOrder(
                                                              item.uid,
                                                              //   item.timestamp,
                                                          ).then(() => {
                                                              router.push(
                                                                  `/dashboard/orders-historial/edit-order/${item.uid}`,
                                                              );
                                                          })
                                                        : router.push(
                                                              `/dashboard/orders-historial/edit-order/${item.uid}`,
                                                          );
                                                }}
                                            >
                                                <RiEditBoxFill size={24} />
                                            </button>
                                        )}
                                        <Link
                                            href="/dashboard/preview-order"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <button type="button">
                                                <MdPictureAsPdf size={24} />
                                            </button>
                                        </Link>
                                        <button
                                            // className="px-2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                (item.status === "enviada" ||
                                                    // item.status ===
                                                    //     "atendida" ||
                                                    item.status ===
                                                        "asignada") &&
                                                userRol?.uid !==
                                                    item.modifiedBy.userRolId
                                                    ? setStatusOpenOrder(
                                                          item.uid,
                                                          //   item.timestamp,
                                                      ).then(() => {
                                                          router.push(
                                                              `/dashboard/orders-historial/details/${item.uid}`,
                                                          );
                                                      })
                                                    : router.push(
                                                          `/dashboard/orders-historial/details/${item.uid}`,
                                                      );
                                            }}
                                        >
                                            <IoIosEye size={24} />
                                        </button>
                                    </div>
                                    <div className="text-nowrap text-center w-48">
                                        <p className="truncate">{`#${item.uid}`}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="truncate">
                                            {formatearFecha(item.timestamp)}
                                        </p>
                                    </div>
                                    <div className="text-nowrap text-center w-48">
                                        <p className="truncate">
                                            {getOrderStatus(item)}
                                        </p>
                                    </div>
                                    <div className="text-nowrap text-center w-48">
                                        <p className="truncate">
                                            {item.idType}
                                        </p>
                                    </div>
                                    <div className="text-nowrap text-center w-48">
                                        <p className="truncate">{item.id}</p>
                                    </div>
                                    <div className="text-nowrap text-center w-48">
                                        <p className="truncate">{item.name}</p>
                                    </div>
                                    <div className="text-nowrap text-center w-48">
                                        <p className="truncate">
                                            {item.lastName}
                                        </p>
                                    </div>
                                    <div className="text-nowrap text-center w-52">
                                        <p className="truncate">{item.email}</p>
                                    </div>
                                    <div className="text-nowrap text-center w-48">
                                        <p className="truncate">
                                            {"+" +
                                                item.phone.substring(0, 2) +
                                                " " +
                                                item.phone.substring(2)}
                                        </p>
                                    </div>
                                    <div className="col flex justify-center text-nowrap text-company-blue w-48 px-5">
                                        <button
                                            onClick={() => {
                                                modalLastUpdate(item);
                                            }}
                                        >
                                            <IoIosMore size={24} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        {/* {Array.from({
                                    length: 3,
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
                                                    <IoIosNotifications
                                                        size={24}
                                                    />
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
                                })} */}
                    </div>

                    <div className="flex items-center px-16 py-4 border-t-2 border-company-blue">
                        <button
                            onClick={() =>
                                downloadCSV(filteredOrders, "Pacientes")
                            }
                            className="flex flex-col items-center text-white w-20 text-[9px]"
                        >
                            <BsFileEarmarkExcelFill
                                className="text-company-blue"
                                size={32}
                            />
                            <span>Descargar Excel</span>
                        </button>

                        {totalPages > 0 && (
                            <div className="flex items-center text-white justify-end w-full">
                                <select
                                    id="pagination"
                                    name="pagination"
                                    className="rounded-xl h-8 bg-transparent border-company-blue border text-white px-2"
                                    onChange={(e) => {
                                        setItemsPerPage(
                                            parseInt(e.target.value),
                                        );
                                        setCurrentPage(1);
                                    }}
                                    defaultValue={ordersData.length}
                                >
                                    {Array.from(
                                        {
                                            length: 6,
                                        },
                                        (_, i) => 5 + i * 5,
                                    ).map((item: number, index: number) => {
                                        return (
                                            <option
                                                key={index}
                                                value={item}
                                                className="bg-black/80 text-company-orange"
                                            >
                                                {item}
                                            </option>
                                        );
                                    })}
                                    <option
                                        value={ordersData.length}
                                        className="bg-black/80 text-company-orange"
                                    >
                                        Todos
                                    </option>
                                </select>

                                <div className="flex items-center w-40 justify-end space-x-3">
                                    {currentPage > 1 &&
                                        currentPage <= totalPages && (
                                            <button
                                                className={`px-2 py-2 ${
                                                    currentPage === 1
                                                        ? "cursor-not-allowed opacity-50"
                                                        : "hover:text-company-blue hover:bg-gray-700 rounded-full text-white"
                                                }`}
                                                onClick={handlePreviousPage}
                                                disabled={currentPage === 1}
                                            >
                                                <IoIosArrowBack size={24} />
                                            </button>
                                        )}
                                    <span className="px-0">
                                        {currentPage} / {totalPages}
                                    </span>
                                    {currentPage < totalPages && (
                                        <button
                                            className={`px-2 py-2 ${
                                                currentPage === totalPages
                                                    ? "cursor-not-allowed opacity-50"
                                                    : "hover:text-company-blue hover:bg-gray-700 rounded-full text-white"
                                            }`}
                                            onClick={handleNextPage}
                                            disabled={
                                                currentPage === totalPages
                                            }
                                        >
                                            <IoIosArrowForward size={24} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
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

export default function Page() {
    return (
        <Suspense fallback={<Spinner background="bg-gray-image" />}>
            <OrderHistorialPage />
        </Suspense>
    );
}

// export default OrderHistorialPage;
