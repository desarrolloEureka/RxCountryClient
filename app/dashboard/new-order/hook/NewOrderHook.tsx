import { titles, widthSlider } from "@/app/component/constants/formConstants";
import { dataAllOptions } from "@/app/data/documentsData";
import { dataPatientObject } from "@/app/data/patientData";
import useAuth from "@/app/firebase/auth";
import {
    getAllAreasOptions,
    getAllCampusOptions,
    getAllOptions,
    getAllOrders,
    getAllPatients,
    getDocumentRef,
    getReference,
    saveOneDocumentFb,
    updateDocumentsByIdFb,
} from "@/app/firebase/documents";
import { addPatient } from "@/app/firebase/user";
import { AreasSelector } from "@/app/types/areas";
import { CampusSelector } from "@/app/types/campus";
import { DataPatientObject } from "@/app/types/patient";
import _ from "lodash";
import moment from "moment";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

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
    const { isActiveUser, userData, accessTokenUser, userRol } = useAuth();

    const { campus, rol } = userData;

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [showHelp, setShowHelp] = useState(false);

    const [formStep, setFormStep] = useState(0);

    //*Aquí para cambiar de vista de edición
    const [isEdit, setIsEdit] = useState(false);

    const [isDataSelected, setIsDataSelected] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState<any>();

    const [optionsData, setOptionsData] = useState<any>(dataAllOptions);

    const [ordersData, setOrdersData] = useState<any>();

    const [patientData, setPatientData] = useState(dataPatientObject);

    const [currentOrderId, setCurrentOrderId] = useState<number>(1);

    const [sentToArea, setSentToArea] = useState<string>("");

    const [error, setError] = useState(false);

    const [suggestions, setSuggestions] = useState<DataPatientObject[]>([]);

    const [allPatients, setAllPatients] = useState<any>();

    const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);

    const [allCampus, setAllCampus] = useState<CampusSelector[]>([]);

    const [patientExist, setPatientExist] = useState(false);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPatientData({ ...patientData, [e.target.name]: e.target.value });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPatientData({ ...patientData, [e.target.name]: value });
        if (value.length > 0) {
            const filteredPatients = allPatients?.filter(
                (patient: DataPatientObject) => patient.id.includes(value),
            );
            setSuggestions(filteredPatients);
        } else {
            setSuggestions([]);
        }
    };

    const areasByCampus = () => {
        const filteredIdAreas = allCampus?.find(
            (item) => item.value === campus,
        )?.areas;

        const result = allAreas?.filter((area) =>
            filteredIdAreas?.includes(area.value),
        );
        return result;
    };

    const selectChangeHandlerSentTo = (e: any) => {
        setSentToArea(e?.value);
    };

    const selectChangeHandlerIdType = (e: ChangeEvent<HTMLSelectElement>) => {
        setPatientData({ ...patientData, ["idType"]: e.target.value });
    };

    const idChangeHandler = (id: string) => {
        const patient = suggestions?.find(
            (patient: DataPatientObject) => patient.id === id,
        );

        patient && (setPatientData({ ...patient }), setPatientExist(true));
        setSuggestions([]);
    };

    const dateChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const dateFormat = moment(e.target.value).format("YYYY-MM-DD");
        setPatientData({
            ...patientData,
            [e.target.name]: dateFormat,
            ["age"]: `${calculateAge(dateFormat)}`,
        });
    };

    const phoneChangeHandler = (phone: string) => {
        setPatientData({ ...patientData, ["phone"]: phone });
    };

    const handleClose = () => {
        setPatientData(dataPatientObject);
        setError(false);
        setSuggestions([]);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            wrapperRef.current &&
            !wrapperRef.current.contains(event.target as Node)
        ) {
            setSuggestions([]);
        }
    };

    const patientVal =
        patientData.idType &&
        patientData.id &&
        patientData.name &&
        patientData.lastName &&
        patientData.email &&
        patientData.phone !== "57" &&
        patientData.phone !== "" &&
        patientData.phone.length > 11;

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

        const documentNewOrderRef: any = getDocumentRef(newOrderRef, orderId);

        if (patientExist) {
            const documentPatientRef: any = getDocumentRef(
                patientRef,
                patientData.uid,
            );
            // Si el paciente existe actualiza la información del paciente
            await updateDocumentsByIdFb(
                documentPatientRef.id,
                {
                    ...patientData,
                    serviceOrders: patientData.serviceOrders
                        ? [...patientData.serviceOrders, documentNewOrderRef.id]
                        : [documentNewOrderRef.id],
                },
                patientRef,
            ).then(async () => {
                // Se crea una nueva orden de servicio
                await saveOneDocumentFb(documentNewOrderRef, {
                    ...selectedOptions,
                    uid: documentNewOrderRef.id,
                    patientId: documentPatientRef.id,
                    status: "creada",
                    sendTo: sentToArea,
                    isActive: true,
                    isDeleted: false,
                    modifiedBy: userRol,
                }).then((res) => {
                    setCurrentOrderId(parseInt(res.id));
                });
            });
        } else {
            const documentPatientRef: any = getReference(patientRef);
            // Si el paciente es nuevo se crea en Auth de firebase
            await addPatient({
                email: patientData.email,
                password: patientData.id,
                accessTokenUser,
                uid: documentPatientRef.id,
            }).then(async (res: any) => {
                const patientId = res.data.userId;
                // Guarda la información del nuevo paciente
                await saveOneDocumentFb(documentPatientRef, {
                    ...patientData,
                    uid: patientId,
                    serviceOrders: [documentNewOrderRef.id],
                }).then(async () => {
                    // Se crea la nueva orden de servicio
                    await saveOneDocumentFb(documentNewOrderRef, {
                        ...selectedOptions,
                        uid: documentNewOrderRef.id,
                        patientId: documentPatientRef.id,
                        status: "creada",
                        sendTo: sentToArea,
                        isActive: true,
                        isDeleted: false,
                        modifiedBy: userRol,
                        assignedCampus: rol === "Funcionario" ? campus : "",
                    }).then((res) => {
                        setCurrentOrderId(parseInt(res.id));
                    });
                });
            });
        }
    };

    const getOptions = useCallback(async () => {
        const allOptionsData = await getAllOptions("rxCountryFront");
        allOptionsData && setOptionsData(allOptionsData);
    }, []);

    const getOrders = useCallback(async () => {
        const allOrdersData = await getAllOrders();
        allOrdersData && setOrdersData(allOrdersData);
    }, []);

    const getPatients = useCallback(async () => {
        const allPatientsData = await getAllPatients();
        allPatientsData && setAllPatients(allPatientsData);
    }, []);

    const getAreas = useCallback(async () => {
        const allAreasData = await getAllAreasOptions();
        allAreasData && setAllAreas(allAreasData);
    }, []);

    const getCampus = useCallback(async () => {
        const allCampusData = await getAllCampusOptions();
        allCampusData && setAllCampus(allCampusData);
    }, []);

    useEffect(() => {
        getOptions();
        getOrders();
        getPatients();
        getAreas();
        getCampus();
    }, [getOptions, getOrders, getPatients, getAreas, getCampus]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return {
        showHelp,
        allAreas: _.sortBy(areasByCampus(), "label"),
        setShowHelp,
        formStep,
        setFormStep,
        userRol,
        isEdit,
        setIsEdit,
        isDataSelected,
        setIsDataSelected,
        widthSlider,
        optionsData,
        patientData,
        titles,
        patientVal,
        currentOrderId,
        suggestions,
        wrapperRef,
        handleClose,
        changeHandler,
        idChangeHandler,
        handleInputChange,
        selectChangeHandlerIdType,
        dateChangeHandler,
        phoneChangeHandler,
        setSelectedOptions,
        handleSendForm,
        selectChangeHandlerSentTo,
    };
};

export default NewOrderHook;
