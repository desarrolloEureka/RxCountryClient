import { widthSlider, titles } from "@/app/component/constants/formConstants";
import { dataAllOptions } from "@/app/data/documentsData";
import { dataPatientObject } from "@/app/data/patientData";
import useAuth from "@/app/firebase/auth";
import {
    getAllOptions,
    getAllOrders,
    getDocumentRef,
    getReference,
    saveOneDocumentFb,
} from "@/app/firebase/documents";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

type Props = {
    // setDataSelected: (e: any) => void;
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

const NewOrderHook = (props?: Props) => {
    const { isActiveUser, userData } = useAuth();

    const { rol } = userData;

    const [showHelp, setShowHelp] = useState(false);
    const [formStep, setFormStep] = useState(0);

    //*Aquí para cambiar de vista de especialista a recepcionista
    // const [userRol, setUserRol] = useState(userData?.rol);

    //*Aquí para cambiar de vista de edición
    const [isEdit, setIsEdit] = useState(false);

    const [isDataSelected, setIsDataSelected] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState<any>();

    const [optionsData, setOptionsData] = useState<any>(dataAllOptions);

    const [ordersData, setOrdersData] = useState<any>();

    const [patientData, setPatientData] = useState(dataPatientObject);

    const [currentOrder, setCurrentOrder] = useState<number>(1);

    const [sentToArea, setSentToArea] = useState<string>("");

    const [error, setError] = useState(false);

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

    const patientVal =
        patientData.idType &&
        patientData.id &&
        patientData.name &&
        patientData.lastName &&
        patientData.email &&
        patientData.phone;

    const handleSendForm = async (e?: any) => {
        if (patientVal) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Entró");
            await uploadHandle();
            handleClose();
        } else {
            e.preventDefault();
            e.stopPropagation();
            setError(true);
            console.log("Falló");
        }
    };

    const uploadHandle = async () => {
        const patientRef = "patients";
        const newOrderRef = "serviceOrders";
        const oldOrderId =
            ordersData.length > 0
                ? ordersData?.map((order: any) => order.uid).at(-1)
                : "0";
        const count = parseInt(oldOrderId);
        const orderId = `${count + 1}`;

        const documentPatientRef: any = getReference(patientRef);
        const documentNewOrderRef: any = getDocumentRef(newOrderRef, orderId);

        await saveOneDocumentFb(documentPatientRef, {
            ...patientData,
            uid: documentPatientRef.id,
            serviceOrders: [documentNewOrderRef.id],
            // serviceOrders: [...patientData.serviceOrders, documentNewOrderRef.id],
        }).then(async () => {
            await saveOneDocumentFb(documentNewOrderRef, {
                ...selectedOptions,
                uid: documentNewOrderRef.id,
                patientId: documentPatientRef.id,
                status: "creada",
                sendTo: sentToArea,
                isActive: true,
                isDeleted: false,
            }).then((res) => {
                setCurrentOrder(parseInt(res.id));
            });
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

    useEffect(() => {
        getOptions();
        getOrders();
    }, [getOptions, getOrders]);

    return {
        showHelp,
        setShowHelp,
        formStep,
        setFormStep,
        userRol: rol,
        // setUserRol,
        isEdit,
        setIsEdit,
        isDataSelected,
        setIsDataSelected,
        widthSlider,
        optionsData,
        patientData,
        titles,
        patientVal,
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

export default NewOrderHook;
