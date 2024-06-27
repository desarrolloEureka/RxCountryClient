import { titles, widthSlider } from "@/app/component/constants/formConstants";
import { dataAllOptions } from "@/app/data/documentsData";
import { dataPatientObject } from "@/app/data/patientData";
import useAuth from "@/app/firebase/auth";
import {
    getAllAreasOptions,
    getAllCampusOptions,
    getAllDiagnosesOptions,
    getAllDiagnosticianOptions,
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
import { uploadFileImage } from "@/app/firebase/files";
import useDebounce from "@/app/hook/useDebounce";
import { DiagnosesSelector } from "@/app/types/diagnoses";
import { DiagnosticianSelector } from "@/app/types/diagnostician";
import {
    datePickerProps,
    EditedOrderStatusByRol,
    updateOrderProps,
} from "@/app/types/order";
import { DataPatientObject } from "@/app/types/patient";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

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

    const { campus, area, uid } = userData;

    const currentDate = moment().format();

    const [showHelp, setShowHelp] = useState(false);

    const [formStep, setFormStep] = useState(0);

    //*Aquí para cambiar de vista de edición
    const [isEdit, setIsEdit] = useState(true);

    const [isDataSelected, setIsDataSelected] = useState(false);

    // const [isLoaded, setIisLoaded] = useState(false);

    const [selectedOptions, setSelectedOptions] = useState<any>();

    const [optionsData, setOptionsData] = useState<any>(dataAllOptions);

    const [ordersData, setOrdersData] = useState<any>();

    const [patientData, setPatientData] = useState(dataPatientObject);

    const [currentOrderId, setCurrentOrderId] = useState<number>(1);

    const [sentToArea, setSentToArea] = useState<string>("");

    const [diagnoses, setDiagnoses] = useState<string>("");

    const [diagnostician, setDiagnostician] = useState<string>("");

    // const [error, setError] = useState(false);

    const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);

    const [allDiagnoses, setAllDiagnoses] = useState<DiagnosesSelector[]>([]);

    const [allDiagnostician, setAllDiagnostician] = useState<
        DiagnosticianSelector[]
    >([]);

    const [allCampus, setAllCampus] = useState<CampusSelector[]>([]);

    const [allPatients, setAllPatients] = useState<any>();

    const [showSave, setShowSave] = useState<boolean>(false);

    const [fileName, setFileName] = useState("SUBIR ARCHIVO");

    const [files, setFiles] = useState<any[]>([]);

    const [selectedDiagnosisTwo, setSelectedDiagnosisTwo] = useState<string[]>(
        [],
    );

    const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

    const [value, setValue] = useState<datePickerProps>({
        startDate: null,
        endDate: null,
    });

    const [suggestions, setSuggestions] = useState<DataPatientObject[]>([]);

    // const [patientExist, setPatientExist] = useState(false);

    const oldDataOrder = ordersData?.find((order: any) => order.uid === slug);

    const oldPatientData = allPatients?.find(
        (patient: DataPatientObject) => patient.uid === oldDataOrder.patientId,
    );

    const reference = "serviceOrders";
    const patientRef = "patients";

    const areasByCampus = () => {
        const filteredIdAreas = allCampus?.find(
            (item) => item.value === campus,
        )?.areas;

        const areasOmitted: string[] = [
            "qxdH34kAupnAPSuVIIvn",
            "Wxdi41YreLGK0UiL2YQU",
            area,
        ];

        const availableAreasIds = filteredIdAreas?.filter(
            (item) => !areasOmitted?.includes(item),
        );

        const result = allAreas?.filter((area) =>
            availableAreasIds?.includes(area.value),
        );
        return result;
    };

    const changeHandler = (e: any) => {
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

    const selectChangeHandlerSentTo = (value: any) => {
        setSentToArea(value);
    };

    const selectChangeHandlerDiagnoses = (value: any) => {
        setDiagnoses(value);
    };

    const selectChangeHandlerDiagnostician = (value: any) => {
        setDiagnostician(value);
    };

    const selectChangeHandlerIdType = (e: any) => {
        setPatientData({ ...patientData, ["idType"]: e?.target.value });
    };

    const idChangeHandler = (id: string) => {
        const patient = suggestions?.find(
            (patient: DataPatientObject) => patient.id === id,
        );

        // patient && (setPatientData({ ...patient }), setPatientExist(true));
        patient && setPatientData({ ...patient });
        setSuggestions([]);
    };

    const dateChangeHandler = (e: any) => {
        setValue(e);
        // const dateFormat = moment(e.target.value).format("YYYY-MM-DD");
        const dateFormat = value ? e.startDate : "";
        setPatientData({
            ...patientData,
            ["birthDate"]: dateFormat,
            ["age"]: dateFormat ? `${calculateAge(dateFormat)}` : "",
        });
    };

    const phoneChangeHandler = (e: any) => {
        setPatientData({ ...patientData, ["phone"]: e });
    };

    const handleClose = () => {
        // setPatientData(dataPatientObject);
        // setError(false);
    };

    const handleChecks = (
        option: string,
        selected: string[],
        setSelected: (e: any) => void,
    ) => {
        if (selected?.includes(option)) {
            let selectedList = selected.filter((item) => item !== option);
            setSelected(selectedList);
        } else {
            setSelected([...selected, option]);
        }
    };

    const handleFileChange = (e: any) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setFiles([...e.target.files]);
        } else {
            setFileName("SUBIR ARCHIVO");
            setFiles([]);
        }
    };

    const confirmAlert = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Se guardó correctamente en la información del paciente ${patientData.name} ${patientData.lastName}`,
            showConfirmButton: false,
            timer: 1500,
            width: "900",
            background: "#404040",
            color: "#e9a225",
        });
    };

    const confirmAlertTwo = () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Guardando...`,
            showConfirmButton: false,
            timer: 1500,
            background: "#404040",
            color: "#e9a225",
        });
    };

    const newDataOrder = useMemo(() => {
        const editedOrderStatusByRol: EditedOrderStatusByRol = {
            //Profesional
            ZWb0Zs42lnKOjetXH5lq: "enviada",
            //Recepción
            Ll6KGdzqdtmLLk0D5jhk: "asignada",
            //Modelos
            g9xGywTJG7WSJ5o1bTsH: "asignada",
            //Laboratorio
            chbFffCzpRibjYRyoWIx: "asignada",
            //Radiología
            V5iMSnSlSYsiSDFs4UpI: "asignada",
            //Escáner Digitalasignada
            VEGkDuMXs2mCGxXUPCWI: "asignada",
            //Despacho
            "9RZ9uhaiwMC7VcTyIzhl": "finalizada",
        };

        const orderImagesUrl: string[] = [];
        let newData = {};

        const data = {
            ...selectedOptions,
            ...oldDataOrder,
            uid: oldDataOrder?.uid,
            patientId: oldDataOrder?.patientId,
            status: editedOrderStatusByRol[userRol?.uid!],
            // status: oldDataOrder.status ? oldDataOrder.status : "enviada",
            // sendTo: sentToArea ? sentToArea : oldDataOrder.sendTo,
            assignedCampus: campus ? campus : "",
            timestamp: oldDataOrder?.timestamp,
            sendTo: sentToArea
                ? sentToArea
                : userRol?.uid === "VEGkDuMXs2mCGxXUPCWI" ||
                  userRol?.uid === "g9xGywTJG7WSJ5o1bTsH"
                ? "0OaigBxmSmUa90dvawB1"
                : oldDataOrder?.sendTo,
            // : userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl"
            // ? ""
            isActive: true,
            isDeleted: false,
            modifiedBy: {
                userRolId: userRol?.uid,
                userId: userData?.uid,
            },
            // orderImagesUrl: oldDataOrder?.orderImagesUrl
            //     ? [...oldDataOrder?.orderImagesUrl, ...orderImagesUrl]
            //     : orderImagesUrl,
            diagnoses: diagnoses
                ? diagnoses
                : oldDataOrder?.diagnoses
                ? oldDataOrder?.diagnoses
                : "",
            diagnostician: diagnostician
                ? diagnostician
                : oldDataOrder?.diagnostician
                ? oldDataOrder?.diagnostician
                : "",
            updateLog: oldDataOrder?.updateLog
                ? [
                      ...oldDataOrder?.updateLog,
                      {
                          lastUserId: userData?.uid,
                          lastUpdate: currentDate,
                          lastComment:
                              userRol?.uid === "ZWb0Zs42lnKOjetXH5lq"
                                  ? selectedOptions?.observationComment?.message
                                  : selectedOptions?.[
                                        userRol?.name
                                            .substring(0, 3)
                                            .toLocaleLowerCase() +
                                            "ObservationComment"
                                    ]?.message,
                      },
                  ]
                : [
                      {
                          lastUserId: userData?.uid,
                          lastUpdate: currentDate,
                          lastComment:
                              userRol?.uid === "ZWb0Zs42lnKOjetXH5lq"
                                  ? selectedOptions?.observationComment?.message
                                  : selectedOptions?.[
                                        userRol?.name
                                            .substring(0, 3)
                                            .toLocaleLowerCase() +
                                            "ObservationComment"
                                    ]?.message,
                      },
                  ],
        };

        if (files && sentToArea) {
            for (const record of files) {
                const urlName = record.name.split(".")[0];
                uploadFileImage({
                    folder: oldDataOrder.patientId,
                    fileName: urlName.split(" ").join("_"),
                    file: record,
                    reference,
                })
                    .then((res: string) => {
                        // orderImagesUrl.push(res);
                        data.orderImagesUrl = data?.orderImagesUrl
                            ? [...data?.orderImagesUrl, res]
                            : [res];
                        console.log("Dentro del File", data);
                    })
                    .catch((err: any) => {
                        console.log(err);
                    });
            }
        }

        // newData = { ...data };

        console.log("Antes de return", data);

        return data;
    }, [
        campus,
        currentDate,
        diagnoses,
        diagnostician,
        files,
        oldDataOrder,
        selectedOptions,
        sentToArea,
        userData?.uid,
        userRol?.name,
        userRol?.uid,
    ]);

    /**
     * Returns an array of property names that are unique to each object.
     * @param obj1 The first object.
     * @param obj2 The second object.
     * @returns An object with properties that are unique for each object.
     */
    const updateOrder = ({ obj1, obj2 }: updateOrderProps) => {
        // Get the union of keys from both objects
        const keys = _.union(Object.keys(obj1), Object.keys(obj2));

        // Find keys where the values are different
        const changedKeys = keys.filter(
            (key) => !_.isEqual(obj1[key], obj2[key]),
        );

        // Create an object with unique keys which will be saved
        const objectOmittedProp = _.pick(obj2, changedKeys);

        //Verify that the property has data
        const objectOmittedPropIsEmpty = _.omitBy(objectOmittedProp, _.isEmpty);

        //Ignores the property and returns the object
        return _.omit(objectOmittedPropIsEmpty, "status");
    };

    const updateOrderData = useDebounce({
        callback: async ({ obj1, obj2 }) => {
            const orderRef = "serviceOrders";
            const dataUpdated = updateOrder({ obj1, obj2 });
            // console.log(dataUpdated);
            // await updateDocumentsByIdF(obj2?.uid, dataUpdated, orderRef);
        },
        wait: 600,
    });

    const handleSendForm = async (e?: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Editó");
        // setIisLoaded(true);
        await uploadHandle().then(() => {
            setFormStep((prevStep: number) => prevStep + 1);
        });
        // handleClose();
    };

    const uploadHandle = async () => {
        const documentEditOrderRef: any = getDocumentRef(
            reference,
            oldDataOrder.uid,
        );

        await updateDocumentsByIdFb(
            oldPatientData.uid,
            patientData,
            patientRef,
        ).then(async () => {
            console.log("Antes de guardar", newDataOrder);

            await saveOneDocumentFb(documentEditOrderRef, newDataOrder).then(
                (res) => {
                    setCurrentOrderId(parseInt(res.id));
                    setShowSave(false);
                    confirmAlert();
                },
            );
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

    const getDiagnoses = useCallback(async () => {
        const allDiagnosesData = await getAllDiagnosesOptions();
        allDiagnosesData && setAllDiagnoses(allDiagnosesData);
    }, []);

    const getDiagnostician = useCallback(async () => {
        const allDiagnosticianData = await getAllDiagnosticianOptions();
        allDiagnosticianData && setAllDiagnostician(allDiagnosticianData);
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
        getDiagnoses();
        getDiagnostician();
    }, [
        getOptions,
        getOrders,
        getAreas,
        getCampus,
        getPatients,
        getDiagnoses,
        getDiagnostician,
    ]);

    useEffect(() => {
        if (isEdit && oldPatientData) {
            setPatientData(oldPatientData);
        }
    }, [isEdit, oldPatientData]);

    useEffect(() => {
        saveNewPatientData();
    }, [saveNewPatientData]);

    useEffect(() => {
        if (patientData?.birthDate) {
            setValue({
                startDate: patientData?.birthDate,
                endDate: patientData?.birthDate,
            });
        }
    }, [patientData?.birthDate]);

    useEffect(() => {
        if (
            oldDataOrder?.sendTo === area &&
            newDataOrder &&
            oldDataOrder &&
            !_.isEqual(oldDataOrder, newDataOrder)
        ) {
            updateOrderData({
                obj1: oldDataOrder,
                obj2: newDataOrder,
            });
        }
    }, [area, newDataOrder, oldDataOrder, updateOrderData]);

    return {
        router,
        value,
        area,
        uid,
        showSave,
        showHelp,
        allAreas: _.sortBy(areasByCampus(), (obj) =>
            obj.label.toLocaleLowerCase(),
        ),
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
        selectedDiagnosisTwo,
        setSelectedDiagnosisTwo,
        selectedSuppliers,
        setSelectedSuppliers,
        changeHandler,
        selectChangeHandlerIdType,
        dateChangeHandler,
        phoneChangeHandler,
        setSelectedOptions,
        handleSendForm,
        selectChangeHandlerSentTo,
        handleChecks,
        fileName,
        handleFileChange,
        allDiagnoses: _.sortBy(allDiagnoses, (obj) =>
            obj.label.toLocaleLowerCase(),
        ),
        allDiagnostician: _.sortBy(allDiagnostician, (obj) => obj.label),
        selectChangeHandlerDiagnoses,
        selectChangeHandlerDiagnostician,
        handleInputChange,
        suggestions,
        idChangeHandler,
    };
};

export default EditOrderHook;
