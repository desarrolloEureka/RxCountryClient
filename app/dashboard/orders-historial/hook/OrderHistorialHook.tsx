"use client";
import useAuth from "@/app/firebase/auth";
import { getAllOrders, getAllPatients } from "@/app/firebase/documents";
import { Order, OrdersByRol } from "@/app/types/order";
import { DataPatientObject } from "@/app/types/patient";
import _ from "lodash";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

const OrderHistorialHook = () => {
    const { isActiveUser, userData, userRol } = useAuth();

    const { campus } = userData;

    const searchParams = useSearchParams();

    const fromEdit = searchParams.get("to");

    const router = useRouter();

    const [showFilter, setShowFilter] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showPdf, setShowPdf] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState("send");
    const [search, setSearch] = useState("");
    const [orderId, setOrderId] = useState<any>();
    const [filter, setFilter] = useState<any>("timestamp");

    // filters
    const [orderMinorMajor, setOrderMinorMajor] = useState(false);
    const [nameAZ, setNameAZ] = useState(false);
    const [dateMinorMajor, setDateMinorMajor] = useState(false);
    const [dateMajorMinor, setDateMajorMinor] = useState(false);
    const [all, setAll] = useState(false);

    const [ordersData, setOrdersData] = useState<any>();
    const [patientsData, setPatientsData] = useState<any>();

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [value, setValue] = useState({
        startDate: null,
        endDate: null,
    });

    const handleValueChange = (newValue: any) => {
        setValue(newValue);
    };

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
                    order.status === "creada" || order.status === "enviada",
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

    const backToOrder = () => {
        setShowPdf(false);
    };

    // const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setStartDate(e.target.value);
    // };

    // const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setEndDate(e.target.value);
    // };

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
    };

    const formatearFecha = (fechaISO: string): string => {
        return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
    };

    let filteredOrders: any[] = orderList?.filter((order: any) => {
        const itemDate = moment(order.timestamp);
        const start = value.startDate ? moment(value.startDate) : null;
        const end = value.endDate ? moment(value.endDate) : null;

        const isWithinDateRange =
            (!start || itemDate.isSameOrAfter(start, "day")) &&
            (!end || itemDate.isSameOrBefore(end, "day"));

        const matchesSearchTerm =
            order.id.toLowerCase().includes(search.toLowerCase()) ||
            order.name.toLowerCase().includes(search.toLowerCase()) ||
            order.lastName.toLowerCase().includes(search.toLowerCase()) ||
            order.uid.toLowerCase().includes(search.toLowerCase());

        return isWithinDateRange && matchesSearchTerm;
    });

    filteredOrders = _.sortBy(filteredOrders, filter).reverse();

    if (orderMinorMajor) {
        filteredOrders = _.sortBy(filteredOrders, (obj) =>
            parseInt(obj.uid, 10),
        );
    }

    if (nameAZ) {
        filteredOrders = _.sortBy(filteredOrders, (obj) => obj.name);
    }

    if (dateMinorMajor) {
        filteredOrders = _.sortBy(filteredOrders, (obj) => obj.timestamp);
    }
    if (dateMajorMinor) {
        filteredOrders = _.sortBy(
            filteredOrders,
            (obj) => obj.timestamp,
        ).reverse();
    }

    const downloadCSV = (array: any[], tableTitle: string) => {
        const link = document.createElement("a");
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = `${tableTitle}.csv`;

        // Codificar el contenido del CSV
        const encodedCSV = encodeURIComponent(csv);

        // Crear el enlace de descarga con la cadena codificada
        const dataURI = `data:text/csv;charset=utf-8,${encodedCSV}`;

        link.setAttribute("href", dataURI);
        link.setAttribute("download", filename);
        link.click();
    };

    const convertArrayOfObjectsToCSV = (array: object[]): string => {
        let result: string;

        const columnDelimiter = ",";
        const lineDelimiter = "\n";
        const keys = Object.keys(array[0]);

        result = "";
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach((item: any) => {
            let ctr = 0;
            keys.forEach((key: string) => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];

                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
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
        if (userRol === "Recepción" && !searchParams.has("to")) {
            setSelectedOrder("received");
        }
    }, [userRol, searchParams]);

    useEffect(() => {
        if (searchParams.has("to") && fromEdit === "send") {
            setSelectedOrder(fromEdit);
        }
    }, [fromEdit, searchParams]);

    // useEffect(() => {
    //     if (search.length > 0) {
    //         console.log(search);
    //         setSuggestionsOrders(filteredOrders);
    //     }
    // }, [filteredOrders, orderList, search]);

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
        handleSearchInputChange,
        // handleStartDateChange,
        // handleEndDateChange,
        // startDate,
        // endDate,
        filteredOrders,
        showPdf,
        setShowPdf,
        orderId,
        setOrderId,
        downloadCSV,
        value,
        handleValueChange,
        backToOrder,
    };
};

export default OrderHistorialHook;
