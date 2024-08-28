"use client";
import { auth } from "@/shared/firebase/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoAlertCircleSharp } from "react-icons/io5";
import useAuth from "../firebase/auth";
import ImagesRequestIcon from "./icons/ImagesRequestIcon.jsx";
import OrderHistorialIcon from "./icons/OrderHistorialIcon.jsx";
import OrderIcon from "./icons/OrderIcon.jsx";

interface Props {
    // selectedMenuItem?: "create-order" | "orders-historial" | "images-query";
    selectedMenuItem?: string;
}

export default function DashboardHeader({ selectedMenuItem }: Props) {
    const logOut = () => signOut(auth);
    const { isActiveUser, userData, userRol, userCampus, user } = useAuth();
    const { name, lastName, urlPhoto } = userData;

    const [orderIconColor, setOrderIconColor] = useState("white");
    const [orderHistorialIconColor, setOrderHistorialColor] = useState("white");
    const [imagesRequestIconColor, setImagesRequestIconColor] =
        useState("white");
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const [openLogOutMenu, setOpenLogOutMenu] = useState(false);

    return (
        <div className="relative rounded-2xl shadow-md h-24 sm:h-36 bg-gray-700 px-2 sm:px-8 bg-opacity-80 flex justify-between items-center space-x-2">
            <Link
                href="/dashboard"
                className="flex items-center justify-center w-20 h-20 sm:w-auto sm:h-auto"
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

            <>
                {(userRol?.uid === "Ll6KGdzqdtmLLk0D5jhk" ||
                    userRol?.uid === "ZWb0Zs42lnKOjetXH5lq") && (
                    <Link
                        href={isActiveUser ? "/dashboard/new-order" : ""}
                        onMouseEnter={() => setOrderIconColor("#E9A225")}
                        onMouseLeave={() => setOrderIconColor("white")}
                        className={`flex flex-col justify-center h-24 sm:h-36 items-center space-y-2 ${
                            selectedMenuItem === "create-order"
                                ? "text-company-orange border-b-2 border-company-orange"
                                : "text-white hover:text-company-orange hover:border-b-2 hover:border-company-orange"
                        }`}
                    >
                        <OrderIcon
                            className="h-8 sm:h-auto"
                            color={
                                selectedMenuItem === "create-order"
                                    ? "#E9A225"
                                    : orderIconColor
                            }
                        />
                        <span className="hidden sm:flex">
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
                            onMouseLeave={() => setOrderHistorialColor("white")}
                            className={`flex flex-col justify-center h-24 sm:h-36 items-center space-y-2 ${
                                selectedMenuItem === "orders-historial"
                                    ? "text-company-orange border-b-2 border-company-orange"
                                    : "text-white hover:text-company-orange hover:border-b-2 hover:border-company-orange"
                            }`}
                        >
                            <OrderHistorialIcon
                                className="h-8 sm:h-auto"
                                color={
                                    selectedMenuItem === "orders-historial"
                                        ? "#E9A225"
                                        : orderHistorialIconColor
                                }
                            />
                            <span className="hidden sm:flex">
                                Historial de Ordenes
                            </span>
                        </Link>
                    )}

                <Link
                    href={isActiveUser ? "/dashboard/images-query" : ""}
                    onMouseEnter={() => setImagesRequestIconColor("#E9A225")}
                    onMouseLeave={() => setImagesRequestIconColor("white")}
                    className={`flex flex-col justify-center h-24 sm:h-36 items-center space-y-2 ${
                        selectedMenuItem === "images-query"
                            ? "text-company-orange border-b-2 border-company-orange"
                            : "text-white hover:text-company-orange hover:border-b-2 hover:border-company-orange"
                    }`}
                >
                    <ImagesRequestIcon
                        className="h-8 sm:h-auto"
                        color={
                            selectedMenuItem === "images-query"
                                ? "#E9A225"
                                : imagesRequestIconColor
                        }
                    />
                    <span className="hidden sm:flex">Consultar Imágenes</span>
                </Link>
            </>

            <Link
                href={""}
                onClick={() => setOpenProfileMenu(!openProfileMenu)}
                className="flex flex-col items-center space-y-2 text-white"
            >
                <div className="relative hidden sm:flex w-10 h-10 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-gray-300">
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
                    />
                </div>
                <div className="flex flex-col text-center">
                    <span className="text-sm sm:text-xl text-capitalize">
                        {name}
                    </span>
                    <span className="text-[10px] sm:text-sm text-capitalize">{`${userRol?.name} ${userCampus}`}</span>
                </div>
            </Link>
            {openProfileMenu && (
                <div className="absolute flex flex-col divide-y-2 shadow-xl right-8 top-32 rounded-2xl bg-black bg-opacity-80 text-white text-sm">
                    {isActiveUser && (
                        <Link
                            href="/dashboard/profile"
                            className="p-4 hover:bg-gray-900 bg-opacity-80 rounded-t-2xl"
                        >
                            Mi Perfil
                        </Link>
                    )}
                    <Link
                        href="/dashboard/about"
                        className={`p-4 hover:bg-gray-900 bg-opacity-80 ${
                            !isActiveUser && "rounded-t-2xl"
                        }`}
                    >
                        Acerca De
                    </Link>
                    <Link
                        href="/dashboard/protection-policy"
                        className="p-4 hover:bg-gray-900 bg-opacity-80"
                    >
                        Políticas de Privacidad
                    </Link>
                    <Link
                        onClick={() => {
                            setOpenLogOutMenu(!openLogOutMenu);
                            setOpenProfileMenu(!openProfileMenu);
                        }}
                        href=""
                        className="p-4 hover:bg-gray-900 bg-opacity-80 rounded-b-2xl"
                    >
                        Cerra Sesión
                    </Link>
                </div>
            )}

            {openLogOutMenu && (
                <div className="absolute flex flex-col divide-y-2 shadow-xl right-8 top-32 rounded-2xl bg-black bg-opacity-80 text-white text-sm">
                    <div className="flex flex-col justify-center items-center px-10 text-white p-5 text-center w-56">
                        <IoAlertCircleSharp
                            className="text-company-orange mb-5"
                            size={30}
                        />
                        <p>¿Seguro que deseas cerrar sesión?</p>
                    </div>
                    <div className="flex flex-row divide-x">
                        <div className="flex flex-1 justify-center items-center ">
                            <Link
                                onClick={() => {
                                    setOpenLogOutMenu(!openLogOutMenu);
                                    logOut();
                                }}
                                href="/"
                                className="p-4 hover:bg-gray-900 bg-opacity-80"
                            >
                                Sí
                            </Link>
                        </div>
                        <div className="flex flex-1 justify-center items-center ">
                            <Link
                                onClick={() =>
                                    setOpenLogOutMenu(!openLogOutMenu)
                                }
                                href=""
                                className="p-4 hover:bg-gray-900 bg-opacity-80"
                            >
                                No
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
