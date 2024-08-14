"use client";
import { getAllOrders, getAllPatients } from "@/app/firebase/documents";
import { Order } from "@/app/types/order";
import { Patient } from "@/app/types/patient";
import React, { useCallback, useEffect, useRef, useState } from "react";

type Props = {
    slug: string;
};

const ImagesDetailsHook = ({ slug }: Props) => {
    const linkRef = useRef<HTMLAnchorElement>(null);

    const [ordersData, setOrdersData] = useState<any>();
    const [patientsData, setPatientsData] = useState<any>();

    const allDataOrders = ordersData?.flatMap((order: Order) => {
        const patient = patientsData?.find(
            (patient: Patient) => patient.uid === order.patientId,
        );

        if (patient) {
            const { id, name, lastName, phone, email, age } = patient;
            return { ...order, id, name, lastName, phone, email, age };
        }

        return [];
    });

    const orderAndPatientData = allDataOrders?.find(
        (item: any) => item.uid === slug,
    );

    const downloadImage = async (e: any) => {
        e.preventDefault();

        try {
            const src = linkRef.current?.href;

            if (src) {
                const imageBlob = await (await fetch(src)).blob();
                if (linkRef.current) {
                    linkRef.current.href = URL.createObjectURL(imageBlob);
                    linkRef.current.download = "randomImage";
                    linkRef.current.click();
                }
            } else {
                console.error("La URL de la imagen no es válida");
            }
        } catch (error) {
            console.error("Error al descargar la imagen: ", error);
        }
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
        // getFunctionary();
        // getProfessionals();
    }, [getOrders, getPatients]);

    return {
        orderAndPatientData,
        downloadImage,
        linkRef,
    };
};

export default ImagesDetailsHook;
