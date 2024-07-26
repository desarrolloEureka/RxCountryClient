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
import { uploadFileImage, uploadFilePDF } from "@/app/firebase/files";
import useDebounce from "@/app/hook/useDebounce";
import { DiagnosesSelector } from "@/app/types/diagnoses";
import { DiagnosticianSelector } from "@/app/types/diagnostician";
import {
    datePickerProps,
    EditedOrderStatusByRol,
    updateOrderProps,
} from "@/app/types/order";
import { DataPatientObject } from "@/app/types/patient";
import { handleSendFinishedOrder } from "@/lib/brevo/handlers/actions";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
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

    const [isOrderIncomplete, setIsOrderIncomplete] = useState<boolean>(false);

    const [selectedOptions, setSelectedOptions] = useState<any>();

    const [optionsData, setOptionsData] = useState<any>(dataAllOptions);

    const [ordersData, setOrdersData] = useState<any>();

    const [patientData, setPatientData] = useState(dataPatientObject);

    const [oldPatientData, setOldPatientData] = useState(dataPatientObject);

    const [currentOrderId, setCurrentOrderId] = useState<number>(1);

    const [sentToArea, setSentToArea] = useState<string>("");

    const [areaList, setAreaList] = useState<string[]>([]);

    const [diagnoses, setDiagnoses] = useState<string>("");

    const [diagnostician, setDiagnostician] = useState<string>("");

    const [uploadUrl, setUploadUrl] = useState<string>("");

    const [urlWeTransfer, setUrlWeTransfer] = useState<string>("");

    const [urlDropbox, setUrlDropbox] = useState<string>("");

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

    const [errorImg, setErrorImg] = useState<string | null>(null);

    const [files, setFiles] = useState<File[]>([]);

    const [selectedDiagnosisTwo, setSelectedDiagnosisTwo] = useState<string[]>(
        [],
    );

    const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

    const [value, setValue] = useState<datePickerProps>({
        startDate: null,
        endDate: null,
    });

    const [suggestions, setSuggestions] = useState<DataPatientObject[]>([]);

    const oldDataOrder = ordersData?.find((order: any) => order.uid === slug);

    // const [patientExist, setPatientExist] = useState(false);

    const reference = "serviceOrders";
    const patientRef = "patients";

    const areasByCampus = () => {
        const filteredIdAreas = allCampus?.find(
            (item) => item.value === campus,
        )?.areas;

        const completedAreas = (): string[] => {
            let result: string[] = [];
            if (
                oldDataOrder?.completedAreas &&
                !_.isEmpty(oldDataOrder?.completedAreas) &&
                area &&
                area !== "" &&
                userRol?.uid !== "9RZ9uhaiwMC7VcTyIzhl"
            ) {
                const areasCompleted = oldDataOrder?.completedAreas as string[];
                result = [
                    "qxdH34kAupnAPSuVIIvn",
                    "Wxdi41YreLGK0UiL2YQU",
                    area,
                    ...areasCompleted,
                ];
                return result;
            }
            result = ["qxdH34kAupnAPSuVIIvn", "Wxdi41YreLGK0UiL2YQU", area];
            return result;
        };

        const areasOmitted: string[] = completedAreas();

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

    const handleInputUrl = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        userRol?.uid !== "VEGkDuMXs2mCGxXUPCWI" // Rol de Escáner Modelos Digital
            ? setUrlWeTransfer(value)
            : setUploadUrl(value);
    };

    const handleInputUrlDropbox = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUrlDropbox(value);
    };

    const selectChangeHandlerSentTo = (value: any) => {
        setSentToArea(value);
    };

    const handleAreaList = (value: { label: string; value: string }[]) => {
        const list: string[] = value.map(
            (item: { value: string; label: string }) => item.value,
        );
        setAreaList(list);
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

    const MAX_FILE_SIZES = {
        image: 3000000,
        pdf: 10000000,
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const uploadFiles = e.target.files;

        if (!uploadFiles || uploadFiles.length === 0) {
            resetFileInput();
            return;
        }

        const validatedFiles: File[] = [];
        const errors: string[] = [];

        Array.from(uploadFiles).forEach((file) => {
            const fileType = file.type.split("/");
            if (
                userRol?.uid === "V5iMSnSlSYsiSDFs4UpI" ||
                userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl"
            ) {
                handleUserRoleFile(file, fileType, validatedFiles, errors);
            } else if (userRol?.uid === "wGU4GU8oDosW4ayQtxqT") {
                handleDefaultUserPDF(file, fileType, validatedFiles, errors);
            } else {
                handleDefaultUserFile(file, fileType, validatedFiles, errors);
            }
        });

        if (errors.length > 0) {
            setErrorImg(errors.join("; "));
            resetFileInput();
        } else {
            setErrorImg(null);
            setFileName(validatedFiles.map((file) => file.name).join(", "));
            setFiles(validatedFiles);
        }
    };

    const handleUserRoleFile = (
        file: File,
        fileType: string[],
        validatedFiles: File[],
        errors: string[],
    ) => {
        if (fileType[0] === "image") {
            validateFileSize(
                file,
                MAX_FILE_SIZES.image,
                validatedFiles,
                errors,
            );
        } else if (fileType[1] === "pdf") {
            validateFileSize(file, MAX_FILE_SIZES.pdf, validatedFiles, errors);
        } else {
            errors.push(`${file.name}: Solo se permite imágenes o PDF`);
        }
    };

    const handleDefaultUserFile = (
        file: File,
        fileType: string[],
        validatedFiles: File[],
        errors: string[],
    ) => {
        if (fileType[0] === "image") {
            validateFileSize(
                file,
                MAX_FILE_SIZES.image,
                validatedFiles,
                errors,
            );
        } else {
            errors.push(`${file.name}: Solo se permite imágenes`);
        }
    };

    const handleDefaultUserPDF = (
        file: File,
        fileType: string[],
        validatedFiles: File[],
        errors: string[],
    ) => {
        if (fileType[1] === "pdf") {
            validateFileSize(file, MAX_FILE_SIZES.pdf, validatedFiles, errors);
        } else {
            setErrorImg("Solo se permite PDF");
            resetFileInput();
        }
    };

    const validateFileSize = (
        file: File,
        maxSize: number,
        validatedFiles: File[],
        errors: string[],
    ) => {
        if (file.size > maxSize) {
            const sizeInMb = maxSize / 1000000;
            errors.push(`${file.name}: El tamaño máximo es ${sizeInMb} MB`);
        } else {
            validatedFiles.push(file);
        }
    };

    const resetFileInput = () => {
        setFileName("SUBIR ARCHIVO");
        setFiles([]);
    };

    const handleCheckOrderIncomplete = (e: any) => {
        const value = e.target.checked;
        setIsOrderIncomplete(value);
    };

    const confirmAlert = () => {
        Swal.fire({
            position: "center",
            icon: "success",
            title: `Se guardó correctamente en la información del paciente ${patientData.name} ${patientData.lastName}`,
            width: "900",
            confirmButtonColor: "#1f2937",
            background: "#404040",
            color: "#e9a225",
        }).then(async (result) => {
            if (result.isConfirmed) {
                setFormStep((prevStep: number) => prevStep + 1);
                setOldPatientData(patientData);
                setPatientData(patientData);
            }
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

    const editedOrderStatusByRol: EditedOrderStatusByRol = {
        //Profesional
        ZWb0Zs42lnKOjetXH5lq: "enviada",
        //Recepción
        Ll6KGdzqdtmLLk0D5jhk: "asignada",
        //Modelos
        g9xGywTJG7WSJ5o1bTsH: "asignada",
        //Fotografía
        c24R4P0VcQmQT0VT6nfo: "asignada",
        //Laboratorio
        chbFffCzpRibjYRyoWIx: "asignada",
        //Radiología
        V5iMSnSlSYsiSDFs4UpI: "asignada",
        //Diagnostico
        wGU4GU8oDosW4ayQtxqT: "asignada",
        //Escáner Digital
        VEGkDuMXs2mCGxXUPCWI: "asignada",
        //Despacho
        "9RZ9uhaiwMC7VcTyIzhl": isOrderIncomplete ? "reasignada" : "finalizada",
    };

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

    const getOrdersUrls = async (): Promise<{
        images: string[];
        pdf: string[];
    }> => {
        const urlFiles: {
            images: string[];
            pdf: string[];
        } = {
            images: [],
            pdf: [],
        };
        for (const record of files) {
            const urlName = record.name.split(".")[0];
            const fileType = record.type.split("/");
            if (fileType[0] === "image") {
                await uploadFileImage({
                    folder: oldDataOrder.patientId,
                    fileName: urlName.split(" ").join("_"),
                    file: record,
                    reference,
                })
                    .then((res: string) => {
                        urlFiles.images.push(res);
                    })
                    .catch((err: any) => {
                        console.log(err);
                    });
            } else if (fileType[1] === "pdf") {
                await uploadFilePDF({
                    folder: oldDataOrder.patientId,
                    fileName: urlName.split(" ").join("_"),
                    file: record,
                    reference,
                })
                    .then((res: string) => {
                        urlFiles.pdf.push(res);
                    })
                    .catch((err: any) => {
                        console.log(err);
                    });
            }
        }
        return urlFiles;
    };

    const handleSendForm = async (e?: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Editó");
        // setIisLoaded(true);
        await uploadHandle();
        // handleClose();
    };

    const uploadHandle = async () => {
        const documentEditOrderRef: any = getDocumentRef(
            reference,
            oldDataOrder.uid,
        );

        const imagesUrls = await getOrdersUrls();

        const newOrderData = {
            ...selectedOptions,
            ...oldDataOrder,
            uid: oldDataOrder?.uid,
            patientId: oldDataOrder?.patientId,
            status: editedOrderStatusByRol[userRol?.uid!],
            assignedCampus: campus ? campus : "",
            completedAreas:
                userRol?.uid !== "Ll6KGdzqdtmLLk0D5jhk" &&
                userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq"
                    ? oldDataOrder?.completedAreas &&
                      !_.isEmpty(oldDataOrder?.completedAreas)
                        ? oldDataOrder?.completedAreas.includes(area)
                            ? oldDataOrder?.completedAreas
                            : [...oldDataOrder?.completedAreas, area]
                        : [area]
                    : [],
            areaList:
                oldDataOrder?.areaList && !_.isEmpty(oldDataOrder?.areaList)
                    ? oldDataOrder?.areaList
                    : areaList,
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
            orderImagesUrl: oldDataOrder?.orderImagesUrl
                ? [...oldDataOrder?.orderImagesUrl, ...imagesUrls.images]
                : imagesUrls.images,
            orderPDFUrl: oldDataOrder?.orderPDFUrl
                ? [...oldDataOrder?.orderPDFUrl, ...imagesUrls.pdf]
                : imagesUrls.pdf,
            urlDropbox: urlDropbox
                ? urlDropbox
                : oldDataOrder?.urlDropbox
                ? oldDataOrder?.urlDropbox
                : "",
            urlWeTransfer: urlWeTransfer
                ? urlWeTransfer
                : oldDataOrder?.urlWeTransfer
                ? oldDataOrder?.urlWeTransfer
                : "",
            fileLocation: uploadUrl
                ? uploadUrl
                : oldDataOrder?.fileLocation
                ? oldDataOrder?.fileLocation
                : "",
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

        console.log(newOrderData, area);

        // const patientAndOrderData = {
        //     ...newOrderData,
        //     name: patientData.name,
        //     lastName: patientData.lastName,
        //     email: patientData.email,
        //     orderDate: moment(newOrderData.timestamp).format(
        //         "DD/MM/YYYY HH:mm:ss",
        //     ),
        // };

        // await updateDocumentsByIdFb(
        //     oldPatientData.uid,
        //     patientData,
        //     patientRef,
        // ).then(async () => {
        //     await saveOneDocumentFb(documentEditOrderRef, newOrderData).then(
        //         async (res) => {
        //             !isOrderIncomplete &&
        //                 userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl" &&
        //                 (await handleSendFinishedOrder(patientAndOrderData));
        //             setCurrentOrderId(parseInt(res.id));
        //             setShowSave(false);
        //             confirmAlert();
        //         },
        //     );
        // });
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

    const getData = useCallback(() => {
        if (isEdit) {
            const oldData = allPatients?.find(
                (patient: DataPatientObject) =>
                    patient.uid === oldDataOrder?.patientId,
            );
            oldData && (setOldPatientData(oldData), setPatientData(oldData));
        }
    }, [allPatients, isEdit, oldDataOrder?.patientId]);

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
        getData();
    }, [getData]);

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

    // useEffect(() => {
    //     if (
    //         oldDataOrder?.sendTo === area &&
    //         newDataOrder &&
    //         oldDataOrder &&
    //         !_.isEqual(oldDataOrder, newDataOrder)
    //     ) {
    //         updateOrderData({
    //             obj1: oldDataOrder,
    //             obj2: newDataOrder,
    //         });
    //     }
    // }, [area, newDataOrder, oldDataOrder, updateOrderData]);

    return {
        router,
        value,
        area,
        uidUser: uid,
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
        isOrderIncomplete,
        handleCheckOrderIncomplete,
        handleAreaList,
        areaList,
        errorImg,
        handleInputUrl,
        urlWeTransfer,
        uploadUrl,
        urlDropbox,
        handleInputUrlDropbox,
    };
};

export default EditOrderHook;
