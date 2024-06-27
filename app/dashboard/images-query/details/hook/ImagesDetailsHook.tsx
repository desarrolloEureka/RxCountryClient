"use client";
import { getAllOrders, getAllPatients } from "@/app/firebase/documents";
import { Order } from "@/app/types/order";
import { Patient } from "@/app/types/patient";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
    slug: string;
};

const ImagesDetailsHook = ({ slug }: Props) => {
    const [ordersData, setOrdersData] = useState<any>();
    const [patientsData, setPatientsData] = useState<any>();

    const allDataOrders = ordersData?.flatMap((order: Order) => {
        const patient = patientsData?.find(
            (patient: Patient) => patient.uid === order.patientId,
        );

        if (patient) {
            const { id, name, lastName, phone, email } = patient;
            return { ...order, id, name, lastName, phone, email };
        }

        return [];
    });

    const orderAndPatientData = allDataOrders?.find(
        (item: any) => item.uid === slug,
    );

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
        // getFunctionary();
        // getProfessionals();
    }, [getOrders, getPatients]);

    return {
        orderAndPatientData,
    };
};

export default ImagesDetailsHook;
