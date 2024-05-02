"use client";
import useAuth from "@/app/firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const OrderHistorialHook = () => {
    const { isActiveUser, userData } = useAuth();

    const router = useRouter();
    const [showFilter, setShowFilter] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState("received");

    //*Aquí para cambiar de vista de especialista a recepcionista
    const [userRol, setUserRol] = useState(userData?.rol);

    // filters
    const [orderMinorMajor, setOrderMinorMajor] = useState(false);
    const [nameAZ, setNameAZ] = useState(false);
    const [dateMinorMajor, setDateMinorMajor] = useState(false);
    const [dateMajorMinor, setDateMajorMinor] = useState(false);
    const [all, setAll] = useState(false);

    return {
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
    };
};

export default OrderHistorialHook;
