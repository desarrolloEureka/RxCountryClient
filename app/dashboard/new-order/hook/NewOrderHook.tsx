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
import { datePickerProps, EditedOrderStatusByRol } from "@/app/types/order";
import { DataPatientObject } from "@/app/types/patient";
import { handleSendNewOrderEmail } from "@/lib/brevo/handlers/actions";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

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

const saveAlert = async (callbackFc: () => Promise<void>, router: any) => {
    Swal.fire({
        position: "center",
        title: `Guardando...`,
        text: "Por favor espera",
        allowOutsideClick: false,
        background: "#404040",
        color: "#e9a225",
        didOpen: () => {
            Swal.showLoading();
        },
    });

    try {
        await callbackFc();

        Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "La orden se guardo con éxito",
            background: "#404040",
            color: "#e9a225",
            showConfirmButton: false,
            timer: 1500,
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error",
            background: "#404040",
            color: "#e9a225",
            confirmButtonColor: "#1f2937",
            confirmButtonText: "Regresar",
        }).then((result) => {
            if (result.isConfirmed) {
                router.push("/dashboard/new-order/");
            }
        });
    }
};

type Props = {};

const NewOrderHook = (props?: Props) => {
    const { isActiveUser, userData, accessTokenUser, userRol, user } =
        useAuth();

    const { campus = "", uid = "", area = "" } = userData || {};

    const router = useRouter();

    const currentDate = moment().format();

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

    const [areaList, setAreaList] = useState<string[]>([]);

    const [error, setError] = useState(false);

    const [suggestions, setSuggestions] = useState<DataPatientObject[]>([]);

    const [allPatients, setAllPatients] = useState<any>();

    const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);

    const [allCampus, setAllCampus] = useState<CampusSelector[]>([]);

    const [patientExist, setPatientExist] = useState(false);

    const [value, setValue] = useState<datePickerProps>({
        startDate: null,
        endDate: null,
    });

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

    const selectChangeHandlerSentTo = (value: any) => {
        setSentToArea(value);
    };

    const handleAreaList = (value: { label: string; value: string }[]) => {
        const list: string[] = value.map(
            (item: { value: string; label: string }) => item.value,
        );
        setAreaList(list);
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

    const dateChangeHandler = (e: any) => {
        setValue(e);
        const dateFormat = value ? e.startDate : "";
        setPatientData({
            ...patientData,
            ["birthDate"]: dateFormat,
            ["age"]: dateFormat ? `${calculateAge(dateFormat)}` : "",
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

    const editedOrderStatusByRol: EditedOrderStatusByRol = {
        ZWb0Zs42lnKOjetXH5lq: "enviada",
        Ll6KGdzqdtmLLk0D5jhk: "asignada",
    };

    const patientVal =
        patientData.idType &&
        patientData.id &&
        patientData.name &&
        patientData.lastName &&
        patientData.age &&
        patientData.birthDate &&
        patientData.email &&
        patientData.phone !== "57" &&
        patientData.phone !== "" &&
        patientData.phone.length > 11;

    const confirmSaveAlert = () => {
        Swal.fire({
            title: "¿Confirma el envío de la orden?",
            text: "Verifique la información de la orden, después de enviado no podrá hacer cambios.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1f2937",
            // cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, enviar!",
            cancelButtonText: "¡No, verificar!",
            background: "#404040",
            color: "#e9a225",
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log("Entró");

                saveAlert(uploadHandle, router).then(() => {
                    // setFormStep((prevStep: number) => prevStep + 1);
                    router.push("/dashboard/orders-historial/");
                });

                handleClose();
            }
        });
    };

    const handleSendForm = async (e?: any) => {
        if (patientVal) {
            e.preventDefault();
            e.stopPropagation();
            confirmSaveAlert();
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
        const oldOrderId = ordersData.reduce((maxId: any, order: any) => {
            const orderId = parseInt(order.uid, 10);
            return orderId > maxId ? orderId : maxId;
        }, 0);

        const orderId = (oldOrderId + 1).toString();

        const documentNewOrderRef: any = getDocumentRef(newOrderRef, orderId);

        const newOrderData = {
            ...selectedOptions,
            uid: documentNewOrderRef.id,
            status: editedOrderStatusByRol[userRol?.uid!],
            sendTo: sentToArea || "qxdH34kAupnAPSuVIIvn",
            areaList,
            isActive: true,
            isDeleted: false,
            modifiedBy: {
                userRolId: userRol?.uid,
                userId: userData?.uid,
            },
            createdBy: {
                userRol: userRol?.uid,
                userId: userData?.uid,
            },
            assignedCampus: campus ? campus : "",
            timestamp: currentDate,
            updateLog: [
                {
                    lastUserId: userData?.uid,
                    lastUpdate: currentDate,
                    lastComment:
                        userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq"
                            ? selectedOptions[
                                  userRol?.name
                                      .substring(0, 3)
                                      .toLocaleLowerCase() +
                                      "ObservationComment"
                              ].message
                            : selectedOptions.observationComment.message,
                },
            ],
        };

        const patientAndOrderData = {
            ...newOrderData,
            name: patientData.name,
            lastName: patientData.lastName,
            email: patientData.email,
            orderDate: moment(newOrderData.timestamp).format(
                "DD/MM/YYYY HH:mm:ss",
            ),
        };

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
                        ? patientData.serviceOrders.includes(
                              documentNewOrderRef.id,
                          )
                            ? patientData.serviceOrders
                            : [
                                  ...patientData.serviceOrders,
                                  documentNewOrderRef.id,
                              ]
                        : [documentNewOrderRef.id],
                },
                patientRef,
            ).then(async () => {
                // Se crea una nueva orden de servicio y la guarda

                await saveOneDocumentFb(documentNewOrderRef, {
                    ...newOrderData,
                    patientId: documentPatientRef.id,
                }).then(async (res) => {
                    // Envía la notificación al correo del paciente

                    await handleSendNewOrderEmail(patientAndOrderData);

                    setCurrentOrderId(parseInt(res.id));
                });
            });
        } else {
            const documentPatientRef: any = getReference(patientRef);

            // Si el paciente es nuevo se crea en Auth de firebase

            await addPatient({
                email: patientData.email,
                password: "Dmsdemo123",
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
                    // Se crea la nueva orden de servicio y la guarda

                    await saveOneDocumentFb(documentNewOrderRef, {
                        ...newOrderData,
                        patientId: documentPatientRef.id,
                    }).then(async (res) => {
                        // Envía la notificación al correo del paciente

                        await handleSendNewOrderEmail(patientAndOrderData);

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

    useEffect(() => {
        if (patientData?.birthDate) {
            setValue({
                startDate: patientData?.birthDate,
                endDate: patientData?.birthDate,
            });
        }
    }, [patientData?.birthDate]);

    // useEffect(() => {
    //     userData?.rol !== "ZWb0Zs42lnKOjetXH5lq" &&
    //         userData?.rol !== "Ll6KGdzqdtmLLk0D5jhk" &&
    //         router.push("/dashboard");
    // }, [router, userData]);

    useEffect(() => {
        const allowedRoles: string[] = [
            "ZWb0Zs42lnKOjetXH5lq",
            "Ll6KGdzqdtmLLk0D5jhk",
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
        userData,
        value,
        showHelp,
        uidUser: uid,
        allAreas: _.sortBy(areasByCampus(), (obj) =>
            obj.label.toLocaleLowerCase(),
        ),
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
        handleAreaList,
        areaList,
        user,
    };
};

export default NewOrderHook;
