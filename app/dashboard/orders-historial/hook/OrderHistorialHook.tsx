"use client";
import useAuth from "@/app/firebase/auth";
import { getAllOrders, getAllPatients } from "@/app/firebase/documents";
import { Order, OrdersByRol } from "@/app/types/order";
import { DataPatientObject } from "@/app/types/patient";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, ChangeEvent } from "react";

const OrderHistorialHook = () => {
    const { isActiveUser, userData, userRol } = useAuth();

    const { campus } = userData;

    const router = useRouter();
    const [showFilter, setShowFilter] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showPdf, setShowPdf] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState("send");
    const [search, setSearch] = useState("");
    const [orderId, setOrderId] = useState<any>();

    // filters
    const [orderMinorMajor, setOrderMinorMajor] = useState(false);
    const [nameAZ, setNameAZ] = useState(false);
    const [dateMinorMajor, setDateMinorMajor] = useState(false);
    const [dateMajorMinor, setDateMajorMinor] = useState(false);
    const [all, setAll] = useState(false);
    const [ordersData, setOrdersData] = useState<any>();
    const [patientsData, setPatientsData] = useState<any>();
    const [suggestionsOrders, setSuggestionsOrders] = useState<any[]>([]);

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

    const ordersByRol: OrdersByRol = {
        Profesional: {
            received: allDataOrders?.filter(
                (order: any) => order.status === "enviada",
            ),
            send: allDataOrders?.filter(
                (order: any) =>
                    // order.modifiedBy === userRol &&
                    (order.status === "creada" || order.status === "enviada"),
            ),
        },
        Recepción: {
            received: allDataOrders?.filter(
                (order: any) =>
                    order.status === "enviada" || order.status === "creada",
            ),
            send: allDataOrders?.filter(
                (order: any) =>
                    order.modifiedBy === userRol &&
                    order.assignedCampus === campus &&
                    (order.status === "leída" || order.status === "creada"),
            ),
        },
    };

    const orderList = ordersByRol[userRol]?.[selectedOrder];

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        if (value.length > 0) {
            const filteredOrders = orderList?.filter(
                (order: any) =>
                    order.id.includes(value) ||
                    order.name.includes(value) ||
                    order.lastName.includes(value),
            );
            setSuggestionsOrders(filteredOrders);
        } else {
            setSuggestionsOrders(orderList);
        }
    };

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

    useEffect(() => {
        if (userRol === "Recepción") {
            setSelectedOrder("received");
        }
    }, [userRol]);

    // useEffect(() => {
    //     if (search.length < 0) {
    //     }
    //     setSuggestionsOrders(orderList);
    // }, [orderList, search]);

    return {
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
        suggestionsOrders,
        handleSearchInputChange,
        showPdf,
        setShowPdf,
        orderId,
        setOrderId,
    };
};

export default OrderHistorialHook;
