"use client";
import { auth } from "@/shared/firebase/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";
import { VscMenu } from "react-icons/vsc";
import useAuth from "../firebase/auth";
import ImagesRequestIcon from "./icons/ImagesRequestIcon.jsx";
import OrderHistorialIcon from "./icons/OrderHistorialIcon.jsx";
import OrderIcon from "./icons/OrderIcon.jsx";
import Spinner from "./spinner/Spinner";

interface Props {
    // selectedMenuItem?: "create-order" | "orders-historial" | "images-query";
    selectedMenuItem?: string;
}

export default function DashboardHeader({ selectedMenuItem }: Props) {
    const logOut = () => signOut(auth);
    const { isActiveUser, userData, userRol, userCampus } = useAuth();
    const { name = "", lastName = "", urlPhoto = "" } = userData || {};

    const [orderIconColor, setOrderIconColor] = useState("white");
    const [orderHistorialIconColor, setOrderHistorialColor] = useState("white");
    const [imagesRequestIconColor, setImagesRequestIconColor] =
        useState("white");
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const [openLogOutMenu, setOpenLogOutMenu] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [menuOpen, setMenuOpen] = useState(false);

    const handleClickOutside = useCallback(
        (event: any) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpenProfileMenu(!openProfileMenu);
            }
        },
        [openProfileMenu],
    );

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    if (!userData || !userRol?.uid) {
        return (
            <nav className="flex bg-gray-700 bg-opacity-80 rounded-2xl px-4 lg:px-8 py-2.5 lg:py-0">
                <div className="relative flex flex-wrap lg:flex-nowrap justify-between items-center w-full">
                    <Spinner background="bg-transparent" screenH="min-h-36" />
                </div>
            </nav>
        );
    }

    return (
        <nav className="flex bg-gray-700 bg-opacity-80 rounded-2xl px-4 lg:px-8 py-2.5 lg:py-0">
            <div className="relative flex flex-wrap lg:flex-nowrap justify-between items-center w-full">
                <Link
                    href="/dashboard"
                    className="flex items-center justify-center w-40 sm:w-auto"
                >
                    <Image
                        src={"/assets/logo.png"}
                        width={0}
                        height={0}
                        sizes="200px"
                        alt={"logo"}
                        style={{ width: "100%", height: "auto" }}
                        placeholder="blur"
                        blurDataURL={"/assets/logo.png"}
                    />
                </Link>

                {/* Menú hamburguesa visible en pantallas pequeñas */}
                <div className="flex grow items-center justify-end lg:hidden">
                    <button
                        type="button"
                        className="inline-flex items-center p-2 text-sm text-gray-400 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {menuOpen ? (
                            <TfiClose size={32} />
                        ) : (
                            <VscMenu size={32} />
                        )}
                    </button>
                </div>

                {/* Menú para pantallas grandes */}
                <div
                    className={`justify-around items-center w-full lg:flex lg:w-2/3 lg:order-1 ${
                        menuOpen ? "space-y-2 mt-4" : "space-y-0 mt-0"
                    }  lg:space-y-0 lg:mt-0`}
                    id="mobile-menu"
                >
                    {(userRol?.uid === "Ll6KGdzqdtmLLk0D5jhk" ||
                        userRol?.uid === "ZWb0Zs42lnKOjetXH5lq") && (
                        <Link
                            href={isActiveUser ? "/dashboard/new-order" : ""}
                            onMouseEnter={() => setOrderIconColor("#E9A225")}
                            onMouseLeave={() => setOrderIconColor("white")}
                            className={` ${
                                menuOpen || selectedMenuItem === "create-order"
                                    ? "flex"
                                    : "hidden"
                            } flex-row lg:flex lg:flex-col lg:justify-center h-auto lg:h-36 items-center space-y-0 lg:space-y-2 space-x-2 lg:space-x-0 py-1 ${
                                selectedMenuItem === "create-order"
                                    ? "text-company-orange border-0 sm:border-b-2 border-company-orange"
                                    : "text-white hover:text-company-orange sm:hover:border-b-2 sm:hover:border-company-orange"
                            }`}
                        >
                            <OrderIcon
                                className="h-8 lg:h-auto"
                                color={
                                    selectedMenuItem === "create-order"
                                        ? "#E9A225"
                                        : orderIconColor
                                }
                            />
                            <span className="flex text-center">
                                Crear Nueva Orden
                            </span>
                        </Link>
                    )}
                    {userRol?.uid !== "" &&
                        userRol?.uid !== "ShHQKRuKJfxHcV70XSvC" && (
                            <Link
                                href={
                                    isActiveUser
                                        ? "/dashboard/orders-historial"
                                        : ""
                                }
                                onMouseEnter={() =>
                                    setOrderHistorialColor("#E9A225")
                                }
                                onMouseLeave={() =>
                                    setOrderHistorialColor("white")
                                }
                                className={`${
                                    menuOpen ||
                                    selectedMenuItem === "orders-historial"
                                        ? "flex"
                                        : "hidden"
                                } flex-row lg:flex lg:flex-col lg:justify-center h-auto lg:h-36 items-center space-y-0 lg:space-y-2 space-x-2 lg:space-x-0 py-1 px-1 lg:px-0 ${
                                    selectedMenuItem === "orders-historial"
                                        ? "text-company-orange border-0 sm:border-b-2 border-company-orange"
                                        : "text-white hover:text-company-orange sm:hover:border-b-2 sm:hover:border-company-orange"
                                }`}
                            >
                                <OrderHistorialIcon
                                    className="h-8 lg:h-auto"
                                    color={
                                        selectedMenuItem === "orders-historial"
                                            ? "#E9A225"
                                            : orderHistorialIconColor
                                    }
                                />
                                <span className="flex text-center">
                                    Historial de Ordenes
                                </span>
                            </Link>
                        )}
                    <Link
                        href={isActiveUser ? "/dashboard/images-query" : ""}
                        onMouseEnter={() =>
                            setImagesRequestIconColor("#E9A225")
                        }
                        onMouseLeave={() => setImagesRequestIconColor("white")}
                        className={`${
                            menuOpen || selectedMenuItem === "images-query"
                                ? "flex"
                                : "hidden"
                        } flex-row lg:flex lg:flex-col lg:justify-center h-auto lg:h-36 items-center space-y-0 lg:space-y-2 space-x-2 lg:space-x-0 py-1 px-1 lg:px-0 ${
                            selectedMenuItem === "images-query"
                                ? "text-company-orange border-0 sm:border-b-2 border-company-orange"
                                : "text-white hover:text-company-orange sm:hover:border-b-2 sm:hover:border-company-orange"
                        }`}
                    >
                        <ImagesRequestIcon
                            className="h-8 lg:h-auto"
                            color={
                                selectedMenuItem === "images-query"
                                    ? "#E9A225"
                                    : imagesRequestIconColor
                            }
                        />
                        <span className="flex text-center">
                            Consultar Imágenes
                        </span>
                    </Link>
                </div>

                {/* Dropdown Menu User */}
                <div className="relative grow flex lg:flex items-center justify-center lg:order-2 p-4 lg:p-0">
                    <div
                        onClick={() => setOpenProfileMenu(!openProfileMenu)}
                        className="flex flex-row lg:flex-col items-center space-y-0 lg:space-y-2 space-x-4 lg:space-x-0 text-white cursor-pointer"
                        // ref={wrapperRef}
                    >
                        <div className="relative flex w-10 h-10 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-gray-300">
                            <Image
                                src={
                                    urlPhoto
                                        ? urlPhoto
                                        : `https://ui-avatars.com/api/?name=${name}+${lastName}?size=150?bold=true`
                                }
                                alt="avatar"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                fill
                                className="rounded-full object-cover"
                                id="user-menu-button"
                            />
                        </div>
                        <div className="flex flex-row">
                            <div className="flex flex-col text-center w-full">
                                <span className="text-base sm:text-xl text-capitalize text-white">
                                    {name}
                                </span>
                                <span className="text-[13px] sm:text-sm text-capitalize text-company-blue text-nowrap">{`${userRol?.name} ${userCampus}`}</span>
                            </div>
                            <RiArrowDropDownLine
                                className={`w-full flex lg:hidden ease-in-out duration-700 ${
                                    openProfileMenu
                                        ? "rotate-180 text-company-blue"
                                        : "text-company-orange"
                                }`}
                                size={40}
                            />
                        </div>
                    </div>
                    {openProfileMenu && (
                        <div
                            className="z-50 absolute right-0 top-12 lg:top-32 my-4 text-base w-48 list-none bg-black bg-opacity-80 text-white divide-y divide-gray-100 rounded-lg shadow"
                            id="user-dropdown"
                            ref={wrapperRef}
                        >
                            {/* <div
                                onClick={() =>
                                    setOpenProfileMenu(!openProfileMenu)
                                }
                                className="px-4 py-3 cursor-pointer"
                            >
                                <span className="block text-sm dark:text-white">
                                    {name}
                                </span>
                                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                                    {`${userRol?.name} ${userCampus}`}
                                </span>
                            </div> */}
                            <ul
                                className="py-2"
                                aria-labelledby="user-menu-button"
                            >
                                <li>
                                    <Link
                                        href="/dashboard/profile"
                                        className="block px-4 py-2 text-sm hover:bg-gray-900 bg-opacity-80 dark:hover:bg-gray-600 dark:text-gray-200"
                                    >
                                        Mi Perfil
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/about"
                                        className="block px-4 py-2 text-sm hover:bg-gray-900 bg-opacity-80 dark:hover:bg-gray-600 dark:text-gray-200"
                                    >
                                        Acerca De
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard/protection-policy"
                                        className="block px-4 py-2 text-sm hover:bg-gray-900 bg-opacity-80 dark:hover:bg-gray-600 dark:text-gray-200"
                                    >
                                        Políticas de Privacidad
                                    </Link>
                                </li>
                                <li>
                                    <div
                                        // onClick={() => {
                                        //     setOpenLogOutMenu(!openLogOutMenu);
                                        // }}
                                        className="block border-t border-gray-500 px-4 py-2 text-sm hover:bg-gray-900 bg-opacity-80 dark:hover:bg-gray-600 dark:text-gray-200 cursor-pointer"
                                    >
                                        Cerrar Sesión
                                    </div>
                                </li>
                                {/* {openLogOutMenu && ( */}
                                <li>
                                    <div
                                        // href="/"
                                        className="flex flex-row w-full border-t border-gray-500 divide-x divide-gray-500"
                                    >
                                        <button
                                            className="flex w-full items-center justify-center px-4 py-2 text-sm hover:bg-gray-800 bg-opacity-80 dark:hover:bg-gray-600 dark:text-gray-200"
                                            type="button"
                                            onClick={() => {
                                                setOpenLogOutMenu(
                                                    !openLogOutMenu,
                                                );
                                                setOpenProfileMenu(
                                                    !openProfileMenu,
                                                );
                                                logOut();
                                            }}
                                        >
                                            <Link href="/sign-in">Sí</Link>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setOpenLogOutMenu(
                                                    !openLogOutMenu,
                                                );
                                                setOpenProfileMenu(
                                                    !openProfileMenu,
                                                );
                                            }}
                                            className="flex w-full items-center justify-center px-4 py-2 text-sm hover:bg-gray-800 bg-opacity-80 dark:hover:bg-gray-600 dark:text-gray-200"
                                        >
                                            No
                                        </button>
                                    </div>
                                </li>
                                {/* )} */}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
