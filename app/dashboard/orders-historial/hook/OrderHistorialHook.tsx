"use client";
import useAuth from "@/app/firebase/auth";
import { getAllOrders, getAllPatients } from "@/app/firebase/documents";
import { Order } from "@/app/types/order";
import { DataPatientObject } from "@/app/types/patient";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const OrderHistorialHook = () => {
    const { isActiveUser, userData } = useAuth();

    const { rol } = userData;

    const router = useRouter();
    const [showFilter, setShowFilter] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState("received");

    //*Aquí para cambiar de vista de especialista a recepcionista
    // const [userRol, setUserRol] = useState(userData && userData.rol);

    // filters
    const [orderMinorMajor, setOrderMinorMajor] = useState(false);
    const [nameAZ, setNameAZ] = useState(false);
    const [dateMinorMajor, setDateMinorMajor] = useState(false);
    const [dateMajorMinor, setDateMajorMinor] = useState(false);
    const [all, setAll] = useState(false);
    const [ordersData, setOrdersData] = useState<any>();
    const [patientsData, setPatientsData] = useState<any>();

    const allDataOrders = ordersData?.flatMap((order: Order) => {
        const patient = patientsData?.find(
            (patient: DataPatientObject) => patient.uid === order.patientId,
        );

        if (patient) {
            const { id, name, lastName, phone, email, idType } = patient;
            return { ...order, id, name, lastName, phone, email, idType };
        }

        return [];
    });

    const formatearFecha = (fechaISO: string): string => {
        return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
    };

    const getOrders = useCallback(async () => {
        const allOrdersData = await getAllOrders();
        allOrdersData && setOrdersData(allOrdersData);
    }, []);

    const getPatients = useCallback(async () => {
        const allPatientsData = await getAllPatients();
        allPatientsData && setPatientsData(allPatientsData);
    }, []);

    useEffect(() => {
        getOrders();
        getPatients();
    }, [getOrders, getPatients]);

    return {
        router,
        showFilter,
        setShowFilter,
        showHelp,
        setShowHelp,
        selectedOrder,
        setSelectedOrder,
        userRol: rol,
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
        formatearFecha,
    };
};

export default OrderHistorialHook;
