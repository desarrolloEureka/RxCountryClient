"use client";
import { auth } from "@/shared/firebase/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoAlertCircleSharp } from "react-icons/io5";
import ImagesRequestIcon from "./icons/ImagesRequestIcon.jsx";
import OrderHistorialIcon from "./icons/OrderHistorialIcon.jsx";
import OrderIcon from "./icons/OrderIcon.jsx";
import useAuth from "../firebase/auth";
import { urlFile } from "../firebase/files";

interface Props {
    selectedMenuItem?: "create-order" | "orders-historial" | "images-query";
}

export default function DashboardHeader({ selectedMenuItem }: Props) {
    const logOut = () => signOut(auth);
    const { isActiveUser, userData } = useAuth();
    const [urlPhoto, setUrlPhoto] = useState<any>();

    // const getUrlPhoto = () => {
    //     if (userData) {
    //         urlFile({
    //             folder: userData?.uid,
    //             fileName: userData?.urlPhoto,
    //             reference: "professionals",
    //         })
    //             .then((res: string) => {
    //                 setUrlPhoto(res);
    //             })
    //             .catch(() => {
    //                 setUrlPhoto("");
    //             });
    //     }
    //     return urlPhoto;
    // };

    // const photoUrl = getUrlPhoto();

    const [orderIconColor, setOrderIconColor] = useState("white");
    const [orderHistorialIconColor, setOrderHistorialColor] = useState("white");
    const [imagesRequestIconColor, setImagesRequestIconColor] =
        useState("white");
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const [openLogOutMenu, setOpenLogOutMenu] = useState(false);
    return (
        <div className="relative rounded-2xl shadow-md h-36 bg-gray-700 px-8 bg-opacity-80 flex justify-between items-center">
            <Link href="/dashboard">
                <Image
                    src={"/assets/logo.png"}
                    width={0}
                    height={0}
                    sizes="200px"
                    style={{ width: "100%", height: "auto" }}
                    alt={"logo"}
                    placeholder="blur"
                    blurDataURL={"/assets/logo.png"}
                />
            </Link>

            <>
                <Link
                    href={isActiveUser ? "/dashboard/new-order" : ""}
                    onMouseEnter={() => setOrderIconColor("#E9A225")}
                    onMouseLeave={() => setOrderIconColor("white")}
                    className={`flex flex-col justify-center h-36 items-center space-y-2 ${
                        selectedMenuItem === "create-order"
                            ? "text-company-orange border-b-2 border-company-orange"
                            : "text-white hover:text-company-orange hover:border-b-2 hover:border-company-orange"
                    }`}
                >
                    <OrderIcon
                        color={
                            selectedMenuItem === "create-order"
                                ? "#E9A225"
                                : orderIconColor
                        }
                    />
                    <span>Crear Nueva Orden</span>
                </Link>
                <Link
                    href={isActiveUser ? "/dashboard/orders-historial" : ""}
                    onMouseEnter={() => setOrderHistorialColor("#E9A225")}
                    onMouseLeave={() => setOrderHistorialColor("white")}
                    className={`flex flex-col justify-center h-36 items-center space-y-2 ${
                        selectedMenuItem === "orders-historial"
                            ? "text-company-orange border-b-2 border-company-orange"
                            : "text-white hover:text-company-orange hover:border-b-2 hover:border-company-orange"
                    }`}
                >
                    <OrderHistorialIcon
                        color={
                            selectedMenuItem === "orders-historial"
                                ? "#E9A225"
                                : orderHistorialIconColor
                        }
                    />
                    <span>Historial de Ordenes</span>
                </Link>
                <Link
                    href={isActiveUser ? "/dashboard/images-query" : ""}
                    onMouseEnter={() => setImagesRequestIconColor("#E9A225")}
                    onMouseLeave={() => setImagesRequestIconColor("white")}
                    className={`flex flex-col justify-center h-36 items-center space-y-2 ${
                        selectedMenuItem === "images-query"
                            ? "text-company-orange border-b-2 border-company-orange"
                            : "text-white hover:text-company-orange hover:border-b-2 hover:border-company-orange"
                    }`}
                >
                    <ImagesRequestIcon
                        color={
                            selectedMenuItem === "images-query"
                                ? "#E9A225"
                                : imagesRequestIconColor
                        }
                    />
                    <span>Consultar Imágenes</span>
                </Link>
            </>

            <Link
                href={""}
                onClick={() => setOpenProfileMenu(!openProfileMenu)}
                className="flex flex-col items-center space-y-2 text-white"
            >
                <Image
                    src={"https://via.placeholder.com/512"}
                    width={0}
                    height={0}
                    sizes="100px"
                    style={{ width: "80%", height: "30" }}
                    alt="avatar"
                    className="rounded-full shadow-sm"
                />
                <div className="flex flex-col text-center">
                    <span className="text-xl">{userData?.name}</span>
                    <span className="text-sm">{userData?.rol}</span>
                </div>
            </Link>
            {openProfileMenu && (
                <div className="absolute flex flex-col divide-y-2 shadow-xl right-8 top-32 rounded-2xl bg-black bg-opacity-80 text-white text-sm">
                    <Link
                        href="/dashboard/profile"
                        className="p-4 hover:bg-gray-900 bg-opacity-80 rounded-t-2xl"
                    >
                        Mi Perfil
                    </Link>
                    <Link
                        href="/dashboard/about"
                        className="p-4 hover:bg-gray-900 bg-opacity-80"
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
