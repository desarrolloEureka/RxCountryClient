import { dataAllOptions } from "@/app/data/documentsData";
import useAuth from "@/app/firebase/auth";
import {
    getAllOptions,
    getAllOrders,
    getAllPatients,
    getAllProfessionals,
} from "@/app/firebase/documents";
import { Order } from "@/app/types/order";
import { Patient } from "@/app/types/patient";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Props = {
    slug: string;
};

const PreviewOrderHook = ({ slug }: Props) => {
    const router = useRouter();
    const { user } = useAuth();
    const [ordersData, setOrdersData] = useState<any>();
    const [patientsData, setPatientsData] = useState<any>();
    const [professionalsData, setProfessionalsData] = useState<any>();
    const [optionsData, setOptionsData] = useState<any>(dataAllOptions);

    const formatearFecha = (fechaISO: string): string => {
        return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
    };

    const quadrant = (inicio: number) =>
        Array.from({ length: 8 }, (_, i) => inicio * 10 + 1 + i);

    const allDataOrders = ordersData?.flatMap((order: Order) => {
        const patient = patientsData?.find(
            (patient: Patient) => patient.uid === order.patientId,
        );

        let dataProfessional: any = {};

        if (order.createdBy?.userRol === "ZWb0Zs42lnKOjetXH5lq") {
            const professionalFound = professionalsData.find(
                (profe: any) => profe.uid === order.createdBy?.userId,
            );
            const dataSelected = _.pick(professionalFound, [
                "phone",
                "address",
            ]);
            dataProfessional = dataSelected;
        }

        if (patient) {
            const {
                id,
                idType,
                name,
                lastName,
                phone,
                email,
                age,
                birthDate,
                address,
            } = patient;

            return {
                ...order,
                professionalAddress: dataProfessional.address,
                professionalPhone: dataProfessional.phone,
                id,
                idType,
                name,
                lastName,
                phone,
                email,
                age,
                birthDate,
                address,
            };
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

    const getProfessionals = useCallback(async () => {
        const allProfessionalsData = await getAllProfessionals();
        allProfessionalsData && setProfessionalsData(allProfessionalsData);
    }, []);

    const getOptions = useCallback(async () => {
        const allOptionsData = await getAllOptions("rxCountryFront");
        allOptionsData && setOptionsData(allOptionsData);
    }, []);

    useEffect(() => {
        const userRoleId = localStorage.getItem("userRoleId") ?? "";

        if (!user && !userRoleId) {
            router.push("/sign-in");
            return;
        }
    }, [router, user]);

    useEffect(() => {
        getOrders();
        getOptions();
        getPatients();
        getProfessionals();
    }, [getOptions, getOrders, getPatients, getProfessionals]);

    return {
        orderData: orderAndPatientData,
        formatearFecha,
        quadrant,
        optionsData,
    };
};

export default PreviewOrderHook;
