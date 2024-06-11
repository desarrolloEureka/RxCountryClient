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
    saveOneDocumentFb,
    updateDocumentsByIdFb,
} from "@/app/firebase/documents";
import { AreasSelector } from "@/app/types/areas";
import { CampusSelector } from "@/app/types/campus";
// import { EditedOrderStatusByRol } from "@/app/types/order";
import { DataPatientObject } from "@/app/types/patient";
import _ from "lodash";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

    const router = useRouter();

    const { campus } = userData;

    const currentDate = moment().format();

    const [showHelp, setShowHelp] = useState(false);

    const [formStep, setFormStep] = useState(0);

    //*Aquí para cambiar de vista de edición
    const [isEdit, setIsEdit] = useState(true);

    const [isDataSelected, setIsDataSelected] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState<any>();

    const [optionsData, setOptionsData] = useState<any>(dataAllOptions);

    const [ordersData, setOrdersData] = useState<any>();

    const [patientData, setPatientData] = useState(dataPatientObject);

    const [currentOrderId, setCurrentOrderId] = useState<number>(1);

    const [sentToArea, setSentToArea] = useState<string>("");

    const [error, setError] = useState(false);

    const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);

    const [allCampus, setAllCampus] = useState<CampusSelector[]>([]);

    const [allPatients, setAllPatients] = useState<any>();

    const [showSave, setShowSave] = useState<boolean>(false);

    const oldDataOrder = ordersData?.find((order: any) => order.uid === slug);

    const oldPatientData = allPatients?.find(
        (patient: DataPatientObject) => patient.uid === oldDataOrder.patientId,
    );

    const changeHandler = (e: any) => {
        setPatientData({ ...patientData, [e.target.name]: e.target.value });
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

    // const isNewPatientData = (): boolean => {
    //     setShowSave(
    //         (patientData &&
    //             oldPatientData &&
    //             !_.isEqual(patientData, oldPatientData)) ||
    //             false,
    //     );
    //     return showSave;
    // };

    const selectChangeHandlerSentTo = (value: any) => {
        setSentToArea(value);
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

    // const editedOrderStatusByRol: EditedOrderStatusByRol = {
    //     ZWb0Zs42lnKOjetXH5lq: "enviada",
    //     Ll6KGdzqdtmLLk0D5jhk: "leída",
    // };

    const handleSendForm = async (e?: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Editó");
        await uploadHandle();
        // handleClose();
    };

    const uploadHandle = async () => {
        const reference = "serviceOrders";
        const patientRef = "patients";

        const documentEditOrderRef: any = getDocumentRef(
            reference,
            oldDataOrder.uid,
        );

        // console.log({
        //     ...selectedOptions,
        //     uid: documentEditOrderRef.id,
        //     patientId: oldData.patientId,
        //     status: editedOrderStatusByRol[userRol],
        //     sendTo: oldData.sendTo || sentToArea,
        //     isActive: true,
        //     isDeleted: false,
        //     modifiedBy: userRol,
        //     assignedCampus: rol === "Funcionario" ? campus : "",
        // });

        await updateDocumentsByIdFb(
            oldPatientData.uid,
            patientData,
            patientRef,
        ).then(async () => {
            await saveOneDocumentFb(documentEditOrderRef, {
                ...selectedOptions,
                ...oldDataOrder,
                uid: documentEditOrderRef.id,
                patientId: oldDataOrder.patientId,
                // status: editedOrderStatusByRol[userRol?.uid!],
                status: "enviada",
                sendTo: sentToArea ? sentToArea : oldDataOrder.sendTo,
                isActive: true,
                isDeleted: false,
                modifiedBy: {
                    userRolId: userRol?.uid,
                    userId: userData?.uid,
                },
                assignedCampus: campus ? campus : "",
                timestamp: oldDataOrder.timestamp,
                updateLog: [
                    {
                        lastUserId: userData?.uid,
                        lastUpdate: currentDate,
                        lastComment: selectedOptions.observationComment,
                    },
                ],
            }).then((res) => {
                setCurrentOrderId(parseInt(res.id));
                setShowSave(false);
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

    const getAreas = useCallback(async () => {
        const allAreasData = await getAllAreasOptions();
        allAreasData && setAllAreas(allAreasData);
    }, []);

    const getCampus = useCallback(async () => {
        const allCampusData = await getAllCampusOptions();
        allCampusData && setAllCampus(allCampusData);
    }, []);

    const getPatients = useCallback(async () => {
        const allPatientsData = await getAllPatients();
        allPatientsData && setAllPatients(allPatientsData);
    }, []);

    const saveNewPatientData = useCallback(() => {
        patientData &&
            oldPatientData &&
            setShowSave(!_.isEqual(patientData, oldPatientData));
    }, [patientData, oldPatientData]);

    useEffect(() => {
        getOptions();
        getOrders();
        getAreas();
        getCampus();
        getPatients();
    }, [getOptions, getOrders, getAreas, getCampus, getPatients]);

    useEffect(() => {
        if (isEdit && oldPatientData) {
            setPatientData(oldPatientData);
        }
    }, [isEdit, oldPatientData]);

    useEffect(() => {
        saveNewPatientData();
    }, [saveNewPatientData]);

    return {
        router,
        showSave,
        showHelp,
        allAreas: _.sortBy(areasByCampus(), "label"),
        setShowHelp,
        formStep,
        setFormStep,
        userRol,
        isEdit,
        oldData: oldDataOrder,
        setIsEdit,
        isDataSelected,
        setIsDataSelected,
        widthSlider,
        optionsData,
        patientData,
        titles,
        currentOrderId,
        changeHandler,
        selectChangeHandlerIdType,
        dateChangeHandler,
        phoneChangeHandler,
        setSelectedOptions,
        handleSendForm,
        selectChangeHandlerSentTo,
        // isNewPatientData,
    };
};

export default EditOrderHook;
