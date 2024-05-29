import { titles, widthSlider } from "@/app/component/constants/formConstants";
import { dataAllOptions } from "@/app/data/documentsData";
import { dataPatientObject } from "@/app/data/patientData";
import useAuth from "@/app/firebase/auth";
import {
    getAllAreasOptions,
    getAllOptions,
    getAllOrders,
    getDocumentRef,
    saveOneDocumentFb,
} from "@/app/firebase/documents";
import { AreasSelector } from "@/app/types/areas";
import { EditedOrderStatusByRol } from "@/app/types/order";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

type Props = {
    // setDataSelected: (e: any) => void;
    slug: string;
};

const calculateAge = (birthDate: Date | string): number => {
    const today = new Date();
    const birthDay = new Date(birthDate);
    let age = today.getFullYear() - birthDay.getFullYear();
    const monthsDiff = today.getMonth() - birthDay.getMonth();
    const daysDiff: number = today.getDate() - birthDay.getDate();

    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff <= 0)) {
        age--;
    }

    if (age < 0) {
        age = 0;
    }

    return age;
};

const EditOrderHook = ({ slug }: Props) => {
    const { userRol, userData } = useAuth();

    const { campus, rol } = userData;

    const [showHelp, setShowHelp] = useState(false);

    const [formStep, setFormStep] = useState(1);

    //*Aquí para cambiar de vista de edición
    const [isEdit, setIsEdit] = useState(true);

    const [isDataSelected, setIsDataSelected] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState<any>();

    const [optionsData, setOptionsData] = useState<any>(dataAllOptions);

    const [ordersData, setOrdersData] = useState<any>();

    const [patientData, setPatientData] = useState(dataPatientObject);

    const [currentOrder, setCurrentOrder] = useState<number>(1);

    const [sentToArea, setSentToArea] = useState<string>("");

    const [error, setError] = useState(false);

    const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);

    const oldData = ordersData?.find((order: any) => order.uid === slug);

    const changeHandler = (e: any) => {
        setPatientData({ ...patientData, [e.target.name]: e.target.value });
    };

    const selectChangeHandlerSentTo = (e: any) => {
        setSentToArea(e?.value);
    };

    const selectChangeHandlerIdType = (e: any) => {
        setPatientData({ ...patientData, ["idType"]: e?.target.value });
    };

    const dateChangeHandler = (e: any) => {
        const dateFormat = moment(e.target.value).format("YYYY-MM-DD");
        setPatientData({
            ...patientData,
            [e.target.name]: dateFormat,
            ["age"]: `${calculateAge(dateFormat)}`,
        });
    };

    const phoneChangeHandler = (e: any) => {
        setPatientData({ ...patientData, ["phone"]: e });
    };

    const handleClose = () => {
        setPatientData(dataPatientObject);
        setError(false);
    };

    const editedOrderStatusByRol: EditedOrderStatusByRol = {
        Profesional: "enviada",
        Recepción: "leída",
    };

    const handleSendForm = async (e?: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Editó");
        await uploadHandle();
        handleClose();
    };

    const uploadHandle = async () => {
        const reference = "serviceOrders";

        const documentEditOrderRef: any = getDocumentRef(
            reference,
            oldData.uid,
        );

        await saveOneDocumentFb(documentEditOrderRef, {
            ...selectedOptions,
            uid: documentEditOrderRef.id,
            patientId: oldData.patientId,
            status: editedOrderStatusByRol[userRol],
            sendTo: sentToArea,
            isActive: true,
            isDeleted: false,
            modifiedBy: userRol,
            assignedCampus: rol === "Funcionario" ? campus : "",
        }).then((res) => {
            setCurrentOrder(parseInt(res.id));
        });
    };

    const getOptions = useCallback(async () => {
        const allOptionsData = await getAllOptions("rxCountryFront");
        allOptionsData && setOptionsData(allOptionsData);
    }, []);

    const getOrders = useCallback(async () => {
        const allOrdersData = await getAllOrders();
        allOrdersData && setOrdersData(allOrdersData);
    }, []);

    const getAreas = useCallback(async () => {
        const allAreasData = await getAllAreasOptions();
        allAreasData && setAllAreas(allAreasData);
    }, []);

    useEffect(() => {
        getOptions();
        getOrders();
        getAreas();
    }, [getOptions, getOrders, getAreas]);

    return {
        showHelp,
        allAreas,
        setShowHelp,
        formStep,
        setFormStep,
        userRol,
        isEdit,
        oldData,
        setIsEdit,
        isDataSelected,
        setIsDataSelected,
        widthSlider,
        optionsData,
        patientData,
        titles,
        currentOrder,
        changeHandler,
        selectChangeHandlerIdType,
        dateChangeHandler,
        phoneChangeHandler,
        setSelectedOptions,
        handleSendForm,
        selectChangeHandlerSentTo,
    };
};

export default EditOrderHook;
