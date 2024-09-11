import useAuth from "@/app/firebase/auth";
import {
    getAllAreasOptions,
    getAllFunctionaries,
    getAllOrders,
    getAllPatients,
    getAllProfessionals,
} from "@/app/firebase/documents";
import { AreasSelector } from "@/app/types/areas";
import { Order } from "@/app/types/order";
import { Patient } from "@/app/types/patient";
import { DataProfessionalObject } from "@/app/types/professionals";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Props = {
    // setDataSelected: (e: any) => void;
    slug: string;
};

const DetailsHook = ({ slug }: Props) => {
    const router = useRouter();

    const { userRol, userData, user } = useAuth();

    const { area = "" } = userData || {};

    const searchParams = useSearchParams();

    const fromDetails = searchParams.get("from");

    const [expandReceptionData, setExpandReceptionData] = useState(false);
    const [expandSpecialist, setExpandSpecialist] = useState(false);
    const [expandRx1, setExpandRx1] = useState(false);
    const [expandRx2, setExpandRx2] = useState(false);
    const [expandRx3, setExpandRx3] = useState(false);
    const [expandRx4, setExpandRx4] = useState(false);
    const [expandRx5, setExpandRx5] = useState(false);
    const [expandRx6, setExpandRx6] = useState(false);
    const [expandRx7, setExpandRx7] = useState(false);
    const [detailStep, setDetailStep] = useState(0);

    const [ordersData, setOrdersData] = useState<any>();
    const [patientsData, setPatientsData] = useState<any>();
    const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);

    const [areaSelected, setAreaSelected] = useState<any>();

    const [functionaryData, setFunctionaryData] = useState<any>();
    const [professionalsData, setProfessionalsData] = useState<any>();

    const formatearFecha = (fechaISO: string): string => {
        return moment(fechaISO).format("DD/MM/YYYY HH:mm:ss");
    };

    const getLastUserData = (id: string) => {
        const functionary: DataProfessionalObject = functionaryData?.find(
            (functionary: DataProfessionalObject) => functionary.uid === id,
        );

        const professional: DataProfessionalObject = professionalsData?.find(
            (professional: DataProfessionalObject) => professional.uid === id,
        );
        const result = functionary || professional;

        return result.name;
    };

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

    const areasSelected: string[] = allAreas
        .filter((area) => orderAndPatientData?.areaList?.includes(area.value))
        .map((area) => area.label);

    const getOrders = useCallback(async () => {
        const allOrdersData = await getAllOrders();
        allOrdersData && setOrdersData(allOrdersData);
    }, []);

    const getPatients = useCallback(async () => {
        const allPatientsData = await getAllPatients();
        allPatientsData && setPatientsData(allPatientsData);
    }, []);

    const getFunctionary = useCallback(async () => {
        const allFunctionaryData = await getAllFunctionaries();
        allFunctionaryData && setFunctionaryData(allFunctionaryData);
    }, []);

    const getProfessionals = useCallback(async () => {
        const allProfessionalsData = await getAllProfessionals();
        allProfessionalsData && setProfessionalsData(allProfessionalsData);
    }, []);

    const getAreas = useCallback(async () => {
        const allAreasData = await getAllAreasOptions();
        allAreasData && setAllAreas(allAreasData);
    }, []);

    useEffect(() => {
        getOrders();
        getAreas();
        getPatients();
        getFunctionary();
        getProfessionals();
    }, [getAreas, getFunctionary, getOrders, getPatients, getProfessionals]);

    useEffect(() => {
        const allowedRoles: string[] = [
            "wGU4GU8oDosW4ayQtxqT",
            "g9xGywTJG7WSJ5o1bTsH",
            "chbFffCzpRibjYRyoWIx",
            "c24R4P0VcQmQT0VT6nfo",
            "ZWb0Zs42lnKOjetXH5lq",
            "1cxJ0a8uCX7OTesEHT2G",
            "9RZ9uhaiwMC7VcTyIzhl",
            "FHSly0jguw1lwYSj8EHV",
            "Ll6KGdzqdtmLLk0D5jhk",
            "V5iMSnSlSYsiSDFs4UpI",
            "VEGkDuMXs2mCGxXUPCWI",
        ];

        const userRoleId = localStorage.getItem("userRoleId") ?? "";

        if (userData && !allowedRoles.includes(userRoleId as string)) {
            router.push("/dashboard");
            return;
        }

        if (!user && !userRoleId) {
            router.push("/sign-in");
            return;
        }
    }, [router, user, userData]);

    return {
        fromDetails,
        userRol,
        area,
        areasSelected,
        expandReceptionData,
        setExpandReceptionData,
        expandSpecialist,
        setExpandSpecialist,
        expandRx1,
        setExpandRx1,
        expandRx2,
        setExpandRx2,
        expandRx3,
        setExpandRx3,
        expandRx4,
        setExpandRx4,
        expandRx5,
        setExpandRx5,
        expandRx6,
        setExpandRx6,
        expandRx7,
        setExpandRx7,
        orderAndPatientData,
        detailStep,
        setDetailStep,
        areaSelected,
        setAreaSelected,
        formatearFecha,
        getLastUserData,
        user,
    };
};

export default DetailsHook;
