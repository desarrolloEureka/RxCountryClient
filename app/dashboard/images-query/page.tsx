"use client";
import DashboardHeader from "@/app/component/DashboardHeader";
import LightIcon from "@/app/component/icons/LightIcon";
import DoctorVector from "@/app/component/vectors/DoctorVector";
import Link from "next/link";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import {
    IoIosArrowBack,
    IoIosArrowForward,
    IoIosMore,
    IoMdSearch,
} from "react-icons/io";
import { IoAlertCircleSharp, IoEye } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { MdClose, MdPictureAsPdf } from "react-icons/md";
import Datepicker from "react-tailwindcss-datepicker";
import Swal from "sweetalert2";
import ImagesQueryHook from "./hook/ImagesQueryHook";

const ImageQueryPage = () => {
    const {
        handleSearchInputChange,
        handleValueChange,
        value,
        router,
        showFilter,
        setShowFilter,
        showHelp,
        setShowHelp,
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
        downloadCSV,
        filteredOrders,
        handlePreviousPage,
        handleNextPage,
        currentPage,
        totalPages,
        setItemsPerPage,
        ordersData,
        setCurrentPage,
        formatearFecha,
        getLastUserData,
        getOrderStatus,
    } = ImagesQueryHook();

    const modalLastUpdate = (item: any) => {
        const swalWithCustomClass = Swal.mixin({
            customClass: {
                title: "text-company-orange",
            },
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

    return (
        <main className="relative min-h-screen w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 flex flex-col min-h-screen w-full p-16 space-y-16">
                <DashboardHeader selectedMenuItem="images-query" />
                <div className="rounded-3xl shadow-lg bg-company-gray w-full max-w-screen mx-auto">
                    <div className="flex justify-end items-center border-b-2 border-company-orange p-8">
                        <div className="flex flex-1 justify-center">
                            <h3 className="text-2xl text-company-orange">
                                Consulta de imágenes por paciente
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
                    <div className="grid grid-cols-2 gap-8 items-center justify-between w-full mx-auto max-w-[1280px] p-4">
                        <div className="relative col flex flex-col space-y-2">
                            <label
                                htmlFor="search"
                                className="text-white text-sm"
                            >
                                Buscar imágenes por paciente
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
                                className="rounded-full w-24 h-10 flex justify-center items-center shadow-lg bg-company-blue text-white"
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
                                            todos
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
                                    <div className="col flex justify-between text-nowrap text-company-blue w-48 px-14">
                                        <Link
                                            href={`/dashboard/images-query/details/${item.uid}`}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <IoEye size={24} />
                                        </Link>
                                        <Link
                                            href={`/dashboard/preview-order/${item.uid}`}
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            <MdPictureAsPdf size={24} />
                                        </Link>
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
                                            {/* {getOrderStatus(item)} */}
                                            {item.status}
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

export default ImageQueryPage;
