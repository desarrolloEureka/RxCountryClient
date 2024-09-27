"use client";
import { initialHelperText } from "@/app/component/constants/formConstants";
import DashboardHeader from "@/app/component/DashboardHeader";
import LightIcon from "@/app/component/icons/LightIcon";
import Spinner from "@/app/component/spinner/Spinner";
import DoctorVector from "@/app/component/vectors/DoctorVector";
import _ from "lodash";
import Link from "next/link";
import { Suspense } from "react";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import {
    IoIosArrowBack,
    IoIosArrowForward,
    IoIosEye,
    IoIosMore,
    IoMdSearch,
} from "react-icons/io";
import { IoAlertCircleSharp } from "react-icons/io5";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { LuSettings2 } from "react-icons/lu";
import { MdClose, MdPictureAsPdf } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";
import Datepicker from "react-tailwindcss-datepicker";
import Swal from "sweetalert2";
import OrderHistorialHook from "./hook/OrderHistorialHook";

const OrderHistorialPage = () => {
    const {
        userArea,
        getAreaName,
        router,
        showFilter,
        setShowFilter,
        showHelp,
        setShowHelp,
        setHelperText,
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
        orderList,
        ordersByRol,
        formatearFecha,
        handleSearchInputChange,
        filteredOrders,
        helperText,
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
        itemsPerPage,
        totalItems,
        setItemsPerPage,
        ordersData,
        setCurrentPage,
        setStatusOpenOrder,
        getOrderStatus,
        getLastUserData,
        user,
    } = OrderHistorialHook();

    const modalLastUpdate = (item: any) => {
        const swalWithCustomClass = Swal.mixin({
            customClass: {
                title: "text-company-orange",
            },
        });
        swalWithCustomClass.fire({
            position: "center",
            title: "Ultimo Comentario",
            // html: `<div style="display: flex; flex-direction: column; align-items: start;">
            // <p>Fecha: ${
            //     item.updateLog.at(-1).lastUpdate
            //         ? formatearFecha(item.updateLog.at(-1).lastUpdate)
            //         : "Sin Registro"
            // }</p><br/>
            // <p>Usuario: ${
            //     item.updateLog.at(-1).lastUserId
            //         ? getLastUserData(item.updateLog.at(-1).lastUserId)
            //         : "No Registrado"
            // }</p><br/>
            // <p>Enviado al área de: ${
            //     item.sendTo ? getAreaName(item.sendTo) : "No Registrado"
            // }</p><br/>
            // <p>Comentario: ${
            //     item.updateLog.at(-1).lastComment
            //         ? item.updateLog.at(-1).lastComment
            //         : "Sin Comentario"
            // }</p>
            //     </div>`,
            html: `<div style="display: flex; flex-direction: column; align-items: start;">
                        <p>Comentario: ${
                            item.updateLog.at(-1).lastComment
                                ? item.updateLog.at(-1).lastComment
                                : "Sin Comentario"
                        }</p> 
                    </div>`,
            background: "#404040",
            color: "white",
            confirmButtonColor: "#228cf0",
        });
    };

    if (!user) {
        return <Spinner />;
    }

    if (!ordersByRol || !userRol?.uid) {
        return (
            <main className="relative min-h-screen w-full bg-gray-image bg-fixed bg-cover">
                <div className="bg-black bg-opacity-60 flex flex-col min-h-screen w-full py-16 px-5 sm:p-16 space-y-16">
                    <DashboardHeader selectedMenuItem="orders-historial" />
                    <div className="rounded-xl lg:rounded-3xl shadow-lg bg-company-gray w-full max-w-screen mx-auto min-h-96">
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
            <div className="bg-black bg-opacity-60 flex flex-col min-h-screen w-full py-16 px-5 lg:p-16">
                <DashboardHeader selectedMenuItem="orders-historial" />
                <div className="rounded-xl lg:rounded-3xl shadow-lg mt-16 bg-company-gray w-full max-w-screen mx-auto">
                    <div className="flex justify-end items-center p-4 lg:p-8">
                        <div
                            className={`grid ${
                                userRol?.uid &&
                                userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq"
                                    ? userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl"
                                        ? "grid-cols-3"
                                        : "grid-cols-2 gap-x-10 lg:gap-52 xl:gap-80"
                                    : "grid-cols-1 gap-x-10 lg:gap-52 xl:gap-80"
                            } flex-1`}
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
                                            className={`${
                                                userRol?.uid !==
                                                "9RZ9uhaiwMC7VcTyIzhl"
                                                    ? "text-base"
                                                    : "text-xs"
                                            } lg:text-2xl ${
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
                                className={`col flex flex-col cursor-pointer ${
                                    userRol?.uid &&
                                    userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" &&
                                    userRol?.uid !== "9RZ9uhaiwMC7VcTyIzhl"
                                        ? "items-start"
                                        : "items-start sm:items-center"
                                }`}
                            >
                                <h3
                                    className={`${
                                        userRol?.uid !== "9RZ9uhaiwMC7VcTyIzhl"
                                            ? "text-base"
                                            : "text-xs"
                                    } lg:text-2xl ${
                                        selectedOrder === "send"
                                            ? "text-company-orange"
                                            : " text-gray-400"
                                    }`}
                                >
                                    {userRol?.uid !== "9RZ9uhaiwMC7VcTyIzhl"
                                        ? "Ordenes Enviadas"
                                        : "Ordenes Finalizadas"}
                                </h3>
                            </div>

                            {userRol?.uid &&
                                userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl" && (
                                    <div
                                        onClick={() => {
                                            userRol?.uid &&
                                                userRol?.uid !==
                                                    "ZWb0Zs42lnKOjetXH5lq" &&
                                                setSelectedOrder("reassigned");
                                            setCurrentPage(1);
                                        }}
                                        className={`col flex flex-col cursor-pointer items-start`}
                                    >
                                        <h3
                                            className={`${
                                                userRol?.uid !==
                                                "9RZ9uhaiwMC7VcTyIzhl"
                                                    ? "text-base"
                                                    : "text-xs"
                                            } lg:text-2xl ${
                                                selectedOrder === "reassigned"
                                                    ? "text-company-orange"
                                                    : " text-gray-400"
                                            }`}
                                        >
                                            Ordenes Reenviadas
                                        </h3>
                                    </div>
                                )}
                        </div>
                        <div className="flex flex-col items-center space-y-2 text-white text-xs sm:text-base">
                            <button
                                onClick={() => setShowHelp(true)}
                                className="rounded-full w-5 h-5 lg:w-8 lg:h-8 flex justify-center items-center shadow-lg bg-white"
                            >
                                <LightIcon
                                    className="h-4 lg:h-auto"
                                    color="#5696D3"
                                />
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-8 items-center justify-between w-full mx-auto max-w-screen py-4 lg:px-16 lg:py-4">
                        <div className="relative col flex flex-col space-y-2 mx-4 lg:m-0">
                            <label
                                htmlFor="search"
                                className="text-white text-sm w-1/2"
                            >
                                Buscar Ordenes por Paciente
                            </label>
                            <input
                                id="search"
                                type="search"
                                placeholder="Ej. Hernandez Rodriguez"
                                className="bg-white rounded-full shadow-lg h-10 pl-4 pr-12 text-black"
                                onChange={handleSearchInputChange}
                            />
                            <IoMdSearch className="absolute right-4 bottom-3 text-2xl text-company-blue cursor-pointer" />
                            <span
                                onClick={() => {
                                    _.isEmpty(filteredOrders) &&
                                        (setShowHelp(true),
                                        setHelperText(
                                            "No hay datos para mostrar",
                                        ));
                                }}
                                className="text-[10px] absolute right-3 -bottom-1.5 text-2xl text-company-blue cursor-pointer"
                            >
                                Buscar
                            </span>
                        </div>
                        <div className="relative flex flex-col lg:flex-row items-center justify-center h-full space-y-4 lg:space-y-0 space-x-0 lg:space-x-8 w-full">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className="rounded-full w-10 h-10 flex justify-center items-center shadow-lg bg-company-blue text-white"
                            >
                                <LuSettings2 size={24} />
                            </button>
                            <div className="relative flex flex-col space-y-2 w-full lg:w-2/3 px-4">
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
                            <div className="flex flex-row sm:flex-col justify-start sm:justify-center items-center border-t-2 border-company-orange sm:border-0 w-full sm:w-auto px-4 pt-5 sm:p-0">
                                <span className="text-[#158eff] text-center font-bold">
                                    Lista de Resultados:&nbsp;
                                </span>
                                <span className="text-white">
                                    {Number(filteredOrders?.length)}
                                    &nbsp;de&nbsp;
                                    {/* {Number(ordersData?.length | 0)} */}
                                    {Number(orderList?.length)}
                                </span>
                            </div>
                            {showFilter && (
                                <div className="absolute top-7 left-4 bg-white shadow-xl rounded-2xl p-4 w-72 z-50">
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

                    <div className="scroll-container">
                        <div className="flex flex-col divide-y overflow-x-auto custom-scrollbar pb-3 mb-5">
                            {filteredOrders.length > 0 ? (
                                <>
                                    <div className="flex flex-row min-w-max items-center text-company-orange py-4 px-12 space-x-2">
                                        <div className="text-center text-nowrap w-20">
                                            <span># Orden</span>
                                        </div>
                                        <div className="text-start text-nowrap w-44 pl-5">
                                            <span>Nombres</span>
                                        </div>
                                        <div className="text-start text-nowrap w-44 pl-5">
                                            <span>Apellidos</span>
                                        </div>
                                        <div className="text-start text-nowrap w-28 pl-5">
                                            <span>Estado</span>
                                        </div>
                                        <div className="text-start text-nowrap w-20">
                                            <span>Tipo Doc.</span>
                                        </div>
                                        <div className="text-start text-nowrap w-28 pl-5">
                                            <span>Cédula</span>
                                        </div>
                                        <div className="text-center text-nowrap w-48">
                                            <span>Fecha</span>
                                        </div>
                                        <div className="text-start text-nowrap w-52 pl-5">
                                            <span>Correo</span>
                                        </div>
                                        <div className="text-start text-nowrap w-36 pl-5">
                                            <span>Teléfono</span>
                                        </div>
                                        <div className="text-start text-nowrap w-36 pl-5">
                                            <span>Ultimo Usuario</span>
                                        </div>
                                        <div className="text-start text-nowrap w-48">
                                            <span>Fecha de Actualización</span>
                                        </div>
                                        <div className="text-start text-nowrap w-28">
                                            <span>Enviado a:</span>
                                        </div>
                                        <div className="text-start text-nowrap w-24">
                                            <span>Comentarios</span>
                                        </div>
                                        <div className="text-center text-nowrap w-40">
                                            <span>Acciones</span>
                                        </div>
                                    </div>
                                    <div className="scroll-arrow flex lg:hidden border-none">
                                        <LiaLongArrowAltRightSolid />
                                    </div>
                                    {filteredOrders?.map(
                                        (item: any, index: number) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className={`flex flex-row min-w-max border-t items-center ${
                                                        index === 0
                                                            ? "bg-gray-700"
                                                            : ""
                                                    } text-white py-4 hover:bg-gray-700 px-12 space-x-2`}
                                                >
                                                    <div className="text-nowrap text-center w-20">
                                                        <p className="truncate">{`#${item.uid}`}</p>
                                                    </div>
                                                    <div className="text-nowrap text-start w-44 pl-5">
                                                        <p className="truncate">
                                                            {item.name}
                                                        </p>
                                                    </div>
                                                    <div className="text-nowrap text-start w-44 pl-5">
                                                        <p className="truncate">
                                                            {item.lastName}
                                                        </p>
                                                    </div>
                                                    <div className="text-nowrap text-start w-28 pl-5">
                                                        <p className="truncate">
                                                            {getOrderStatus(
                                                                item,
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="text-nowrap text-start w-20 pl-5">
                                                        <p className="truncate">
                                                            {item.idType}
                                                        </p>
                                                    </div>
                                                    <div className="text-nowrap text-start w-28 pl-2">
                                                        <p className="truncate">
                                                            {item.id}
                                                        </p>
                                                    </div>
                                                    <div className="text-center w-48">
                                                        <p className="truncate">
                                                            {formatearFecha(
                                                                item.timestamp,
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="text-nowrap text-start w-52">
                                                        <p className="truncate">
                                                            {item.email}
                                                        </p>
                                                    </div>
                                                    <div className="text-nowrap text-start w-36">
                                                        <p className="truncate">
                                                            {"+" +
                                                                item.phone.substring(
                                                                    0,
                                                                    2,
                                                                ) +
                                                                " " +
                                                                item.phone.substring(
                                                                    2,
                                                                )}
                                                        </p>
                                                    </div>
                                                    <div className="text-nowrap text-start w-36 pl-5">
                                                        <p className="truncate">
                                                            {item.updateLog.at(
                                                                -1,
                                                            ).lastUserId
                                                                ? getLastUserData(
                                                                      item.updateLog.at(
                                                                          -1,
                                                                      )
                                                                          .lastUserId,
                                                                  )
                                                                : "No Registrado"}
                                                        </p>
                                                    </div>
                                                    <div className="text-nowrap text-start w-48 pl-1">
                                                        <p className="truncate">
                                                            {item.updateLog.at(
                                                                -1,
                                                            ).lastUpdate
                                                                ? formatearFecha(
                                                                      item.updateLog.at(
                                                                          -1,
                                                                      )
                                                                          .lastUpdate,
                                                                  )
                                                                : "Sin Registro"}
                                                        </p>
                                                    </div>
                                                    <div className="text-nowrap text-start w-28">
                                                        <p className="truncate">
                                                            {item.sendTo
                                                                ? getAreaName(
                                                                      item.sendTo,
                                                                  )
                                                                : "No Registrado"}
                                                        </p>
                                                    </div>
                                                    <div className="flex justify-center text-nowrap text-company-blue w-24">
                                                        <button
                                                            onClick={() => {
                                                                modalLastUpdate(
                                                                    item,
                                                                );
                                                            }}
                                                        >
                                                            <IoIosMore
                                                                size={24}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div className="flex justify-between text-nowrap text-company-blue w-40 px-5">
                                                        {/* <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <IoIosNotifications size={24} />
                                            </button> */}
                                                        {((userArea ===
                                                            item.sendTo &&
                                                            item.status !==
                                                                "finalizada") ||
                                                            userRol?.uid ===
                                                                "ZWb0Zs42lnKOjetXH5lq" ||
                                                            userRol?.uid ===
                                                                "Ll6KGdzqdtmLLk0D5jhk") && (
                                                            <button
                                                                onClick={(
                                                                    e,
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    userRol?.uid !==
                                                                        item
                                                                            .modifiedBy
                                                                            .userRolId &&
                                                                    userRol?.uid !==
                                                                        "ZWb0Zs42lnKOjetXH5lq"
                                                                        ? setStatusOpenOrder(
                                                                              item.uid,
                                                                              //   item.timestamp,
                                                                          ).then(
                                                                              () => {
                                                                                  router.push(
                                                                                      `/dashboard/orders-historial/edit-order/${item.uid}`,
                                                                                  );
                                                                              },
                                                                          )
                                                                        : router.push(
                                                                              `/dashboard/orders-historial/edit-order/${item.uid}`,
                                                                          );
                                                                }}
                                                            >
                                                                <RiEditBoxFill
                                                                    size={24}
                                                                />
                                                            </button>
                                                        )}
                                                        <Link
                                                            href={`/dashboard/preview-order/${item.uid}`}
                                                            rel="noopener noreferrer"
                                                            target="_blank"
                                                        >
                                                            <MdPictureAsPdf
                                                                size={24}
                                                            />
                                                        </Link>
                                                        <button
                                                            // className="px-2"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.push(
                                                                    selectedOrder ===
                                                                        "send"
                                                                        ? `/dashboard/orders-historial/details/${item.uid}/?from=send`
                                                                        : `/dashboard/orders-historial/details/${item.uid}/?from=received`,
                                                                );
                                                            }}
                                                        >
                                                            <IoIosEye
                                                                size={24}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        },
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center justify-center bg-black bg-opacity-30 min-w-max w-full p-10 text-company-blue">
                                    <span>No hay datos para mostrar</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 lg:px-16 lg:py-4 border-t-2 border-company-blue">
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
                            <div className="flex items-center text-white justify-between space-x-2 w-52 text-sm lg:text-base">
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

                                <div className="flex items-center w-24 justify-around">
                                    {currentPage > 1 &&
                                        currentPage <= totalPages && (
                                            <button
                                                className={`lg:p-2 ${
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
                                    <span className="w-16 py-2 text-center text-nowrap">
                                        {currentPage} / {totalPages}
                                    </span>
                                    {currentPage < totalPages && (
                                        <button
                                            className={`lg:p-2 ${
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
                    <div className="fixed lg:absolute top-[25%] sm:top-[22rem] right-[15%] sm:right-[5.5rem] 2xl:right-64 bg-white p-2 rounded-xl">
                        <div className="flex justify-end items-center">
                            <button
                                type="button"
                                onClick={() => setShowHelp(false)}
                            >
                                <MdClose color="gray" size={24} />
                            </button>
                        </div>
                        <div className="flex items-center space-x-2 text-black pr-6 pb-5 text-justify">
                            <IoAlertCircleSharp
                                className="text-company-orange sm:mx-4"
                                size={40}
                            />
                            <p className="w-52 sm:w-64 text-xs sm:text-base">
                                {helperText || initialHelperText}
                            </p>
                        </div>
                    </div>
                    <div className="fixed transition-transform right-16 bottom-8">
                        <DoctorVector className="w-48 sm:w-full" width="100%" />
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
