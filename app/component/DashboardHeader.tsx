"use client";
import Image from "next/image";
import Link from "next/link";
import OrderIcon from "./icons/OrderIcon.jsx";
import OrderHistorialIcon from "./icons/OrderHistorialIcon.jsx";
import ImagesRequestIcon from "./icons/ImagesRequestIcon.jsx";
import { useState } from "react";

interface Props {
    selectedMenuItem?: "create-order" | "orders-historial" | "images-query";
}

export default function DashboardHeader({ selectedMenuItem }: Props) {
    const [orderIconColor, setOrderIconColor] = useState("white");
    const [orderHistorialIconColor, setOrderHistorialColor] = useState("white");
    const [imagesRequestIconColor, setImagesRequestIconColor] =
        useState("white");
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    return (
        <div className="relative rounded-2xl shadow-md bg-gray-700 px-8 bg-opacity-80 flex justify-between items-center">
            <Link href="/dashboard">
                <Image
                    src="/assets/logo.png"
                    width={150}
                    height={50}
                    alt="Logo"
                />
            </Link>
            <Link
                href={"/dashboard/new-order"}
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
                <span>Crear orden nueva</span>
            </Link>
            <Link
                href={"/dashboard/orders-historial"}
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
                <span>Historial de ordenes</span>
            </Link>
            <Link
                href={"/dashboard/images-query"}
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
                <span>Consultar Image</span>
            </Link>
            <Link
                href={""}
                onClick={() => setOpenProfileMenu(!openProfileMenu)}
                className="flex flex-col items-center space-y-2 text-white"
            >
                <Image
                    src="https://via.placeholder.com/512"
                    width={48}
                    height={48}
                    alt="avatar"
                    className="rounded-full shadow-sm"
                />
                <div className="flex flex-col text-center">
                    <span className="text-xl">Hola Fabian</span>
                    <span className="text-sm">Rol especialista</span>
                </div>
            </Link>
            {openProfileMenu && (
                <div className="absolute flex flex-col divide-y-2 shadow-xl right-8 top-32 rounded-2xl bg-black bg-opacity-80 text-white text-sm">
                    <Link
                        href="/dashboard/profile"
                        className="p-4 hover:bg-gray-900 bg-opacity-80 rounded-t-2xl"
                    >
                        Mi perfil
                    </Link>
                    <Link
                        href="/dashboard/about"
                        className="p-4 hover:bg-gray-900 bg-opacity-80"
                    >
                        Acerca de
                    </Link>
                    <Link
                        href="/dashboard/protection-policy"
                        className="p-4 hover:bg-gray-900 bg-opacity-80"
                    >
                        Políticas de privacidad
                    </Link>
                    <Link
                        href="/"
                        className="p-4 hover:bg-gray-900 bg-opacity-80 rounded-b-2xl"
                    >
                        Cerra sesión
                    </Link>
                </div>
            )}
        </div>
    );
}
