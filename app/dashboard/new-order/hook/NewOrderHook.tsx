import { titles, widthSlider } from "@/app/component/constants/formConstants";
import { dataAllOptions } from "@/app/data/documentsData";
import { dataPatientObject } from "@/app/data/patientData";
import useAuth from "@/app/firebase/auth";
import {
    checkIfEmailExists,
    checkIfUserProfessionalExists,
    getAllAreasOptions,
    getAllCampusOptions,
    getAllDocumentsFb,
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
import {
    handleSendNewOrderEmail,
    handleSendWelcomeEmail,
} from "@/lib/brevo/handlers/actions";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { checkIfUserExists } from "@/app/firebase/documents";


const calculateAge = (birthDate: Date | string): number => {
    // Convierte el birthDate a un objeto de tipo moment
    const birthDay = moment(birthDate);
    const today = moment(); // Fecha actual

    // Calcula la diferencia en años
    let age = today.diff(birthDay, "years");

    // Verifica si la fecha de cumpleaños ya ocurrió este año
    if (today.isBefore(birthDay.add(age, "years"))) {
        age--;
    }

    // Si la edad es negativa, ajustarla a 0
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

const emailFoundAlert = () => {
    Swal.fire({
        icon: "error",
        title: "Error Email",
        text: "¡Este correo ya existe!",
        background: "#404040",
        color: "#e9a225",
        confirmButtonColor: "#1f2937",
        confirmButtonText: "Ok",
    });
};

const incompleteDataAlert = () => {
    Swal.fire({
        icon: "warning",
        title: "¡Error!",
        text: "¡Falta llenar datos requeridos o hay datos incompletos, verifique antes de guardar! - Correo o Fecha Nacimiento.",
        background: "#404040",
        color: "#e9a225",
        confirmButtonColor: "#1f2937",
        confirmButtonText: "Ok",
    });
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
    
    const [isVerificated, setIsVerificated] = useState(false);

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

    const [emailFound, setEmailFound] = useState<any>();

    const [value, setValue] = useState<datePickerProps>({
        startDate: null,
        endDate: null,
    });

    const [emailLocked, setEmailLocked] = useState(false);
    const lockEmail = (locked: boolean) => setEmailLocked(locked);

    const [professionals, setProfessionals] = useState<any[]>([]);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPatientData({ ...patientData, [e.target.name]: e.target.value });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPatientData({ ...patientData, [e.target.name]: value });
        if (value.length > 0) {
            const filteredPatients = allPatients?.filter(
                (patient: DataPatientObject) => String(patient?.id ?? '').includes(String(value ?? '')),
            );
            setSuggestions(filteredPatients);
        } else {
            setSuggestions([]);
        }
    };


    const validateid = async (id:any) => {
        const exists = await checkIfUserExists(id);
        console.log("validateid", exists);
        if (exists){
        return true;
        }
        return false;
    }

    const validateidProfessional = async (id:any) => {
        const exists = await checkIfUserProfessionalExists(id);
        console.log("validateidProfessional", exists);
        if (exists){
        return true;
        }
        return false;
    }

    const validateidPatient = async (id:any) => { 
        const exists = await checkIfUserExists(id);
        console.log("validateidPatient", exists);
        if (exists){
        return true;
        }
        return false;
    }

    const validateEmail = async (email:any) => {
        const exists = await checkIfEmailExists(email);
        console.log("validateid", exists);
        if (exists){
        return true;
        }
        return false;
    }

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
        setAreaList([...list, "0OaigBxmSmUa90dvawB1"]);
    };

    const selectChangeHandlerIdType = (e: ChangeEvent<HTMLSelectElement>) => {
        setPatientData({ ...patientData, ["idType"]: e.target.value });
    };

    const idChangeHandler = (id: string) => {
        setIsEdit(true);
        setIsVerificated(true);
        const patient = suggestions?.find(
            (patient: DataPatientObject) => patient.id === id,
        );

        patient &&
            (setPatientData({ ...patient, confirmEmail: patient.email }),
            setPatientExist(true));
        setSuggestions([]);
    };

    const dateChangeHandler = (e: any) => {
        setValue(e);
        const dateFormat = value ? e.startDate : "";
        setPatientData({
            ...patientData,
            birthDate: dateFormat,
            age: dateFormat ? `${calculateAge(dateFormat)}` : "",
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

    
    // const patientVal =
    //     patientData.idType &&
    //     patientData.id &&
    //     patientData.name &&
    //     patientData.lastName &&
    //     patientData.age &&
    //     patientData.birthDate &&
    //     patientData.email &&
    //     patientData.confirmEmail &&
    //     patientData.confirmEmail === patientData.email &&
    //     patientData.phone !== "57" &&
    //     patientData.phone !== "" &&
    //     patientData.phone.length > 11;

const patientVal =
    ( userRol?.uid === 'Ll6KGdzqdtmLLk0D5jhk') // Roles con validación completa
        ? (
            patientData.idType &&
            patientData.id &&
            patientData.name &&
            patientData.lastName &&
            patientData.age &&
            patientData.birthDate &&
            patientData.email &&
            patientData.confirmEmail &&
            patientData.confirmEmail === patientData.email &&
            patientData.phone &&
            /^\+?\d{5,15}$/.test(patientData.phone)

            // patientData.phone !== "57" &&
            // patientData.phone !== "" &&
            // patientData.phone.length > 11
        )
        : ( // Validaciones para otros roles
            patientData.idType &&
            patientData.id &&
            patientData.name &&
            patientData.lastName &&
            patientData.email &&
            patientData.confirmEmail === patientData.email
        );

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
                console.log("Entró profesional");

                saveAlert(uploadHandle, router).then(() => {
                    // setFormStep((prevStep: number) => prevStep + 1);
                    router.replace("/dashboard/orders-historial/");
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
            // setError(true);
            incompleteDataAlert();
            console.log("Falló");
        }
    };

    const savePatientData = async (
        documentPatientRef: any,
        documentNewOrderRef: any,
        patientAndOrderData: any,
        newOrderData: any,
    ) => {
        // Guarda la información del nuevo paciente

        await saveOneDocumentFb(documentPatientRef, {
            ...patientData,
            uid: documentPatientRef.id,
            serviceOrders: [documentNewOrderRef.id],
        });
        // Se crea la nueva orden de servicio y la guarda

        await saveOneDocumentFb(documentNewOrderRef, {
            ...newOrderData,
            patientId: documentPatientRef.id,
        }).then(async (res) => {
            setCurrentOrderId(parseInt(res.id));
        });

        // Envía el corro de nueva orden
        await handleSendNewOrderEmail(patientAndOrderData);
    };

    const uploadHandle = async () => {
        const patientRef = "patients";
        const newOrderRef = "serviceOrders";
        const patientDataNew = _.omit(patientData, ["confirmEmail"]);
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
            professionalUid: selectedOptions?.professionalUid || null,
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
            id: patientDataNew.id,
            name: patientDataNew.name,
            lastName: patientDataNew.lastName,
            email: patientDataNew.email,
            orderDate: moment(newOrderData.timestamp).format(
                "DD/MM/YYYY HH:mm:ss",
            ),
        };

        if (patientExist) {
            const documentPatientRef: any = getDocumentRef(
                patientRef,
                patientDataNew.uid,
            );

            // Si el paciente existe actualiza la información del paciente

            await updateDocumentsByIdFb(
                documentPatientRef.id,
                {
                    ...patientDataNew,
                    serviceOrders: patientDataNew.serviceOrders
                        ? patientDataNew.serviceOrders.includes(
                              documentNewOrderRef.id,
                          )
                            ? patientDataNew.serviceOrders
                            : [
                                  ...patientDataNew.serviceOrders,
                                  documentNewOrderRef.id,
                              ]
                        : [documentNewOrderRef.id],
                },
                patientRef,
            );

            // Se crea una nueva orden de servicio y la guarda

            await saveOneDocumentFb(documentNewOrderRef, {
                ...newOrderData,
                patientId: documentPatientRef.id,
            }).then(async (res) => {
                setCurrentOrderId(parseInt(res.id));
            });

            // Envía la notificación al correo del paciente
            
            await handleSendNewOrderEmail(patientAndOrderData);
        } else {
            const documentPatientRef: any = getReference(patientRef);

            // Si el paciente es nuevo se crea en Auth de firebase

            await addPatient({
                email: patientDataNew.email,
                password: patientDataNew.id,
                accessTokenUser,
                uid: documentPatientRef.id,
            });

            // Envía el correo de nuevo usuario bienvenida
            await handleSendWelcomeEmail(patientAndOrderData);

            // Guarda la información del nuevo paciente
            await savePatientData(
                documentPatientRef,
                documentNewOrderRef,
                patientAndOrderData,
                newOrderData,
            );
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


    const autoEmail = async () => {
       let patientIsActive = !patientData.autoEmail;
       console.log("patientIsActive", patientIsActive);
       if (patientData.id !== "") {
            if (!patientIsActive) {
            setPatientData({ ...patientData, ["autoEmail"]: patientIsActive, ["email"]: patientData.id + "@rxcountry.com", ["confirmEmail"]: patientData.id + "@rxcountry.com" });
            
        }
        else {
            setPatientData({ ...patientData,["autoEmail"]: patientIsActive , ["email"]: "", ["confirmEmail"]: "" });
        }
       }
       
    }

    // const setProfessionalId = (isPro: boolean) => {
    //     setPatientData(prev => {
    //         const baseId = String(prev.id || '').trim().replace(/^p/i, ''); // quita P inicial
    //         const newId  = isPro ? `p${baseId}` : baseId;                    // pone P sólo si toca
    //         return { ...prev, id: newId, autoProfessional: isPro };
    //     });
    // };
   
    const RX_DOMAIN = '@rxcountry.com';
    const setProfessionalId = (forceProfessional: boolean) => {
        setPatientData(prev => {
            const baseId = String(prev.id ?? '').trim().replace(/^p/i, '');
            const newId  = forceProfessional ? `p${baseId}` : baseId;

            const nextEmail = prev.autoEmail
            ? prev.email
            : (newId ? `${newId}${RX_DOMAIN}` : '');

            return {
            ...prev,
            autoProfessional: forceProfessional,
            id: newId,
            email: nextEmail,
            confirmEmail: nextEmail,
            };
        });
    };



    const getAllEmails = useCallback(async () => {
        const professionalsDocs = await getAllDocumentsFb("professionals");
        const functionaryDocs = await getAllDocumentsFb("functionary");
        const usersDocs = await getAllDocumentsFb("users");
        const patientsDocs = await getAllDocumentsFb("users");

        const re =
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

        if (patientData.email.toLowerCase().match(re)) {
            const currentUserData =
                usersDocs?.find(
                    (doc: any) => doc.email === patientData.email,
                ) ||
                functionaryDocs?.find(
                    (doc: any) => doc.email === patientData.email,
                ) ||
                professionalsDocs?.find(
                    (doc: any) => doc.email === patientData.email,
                ) ||
                patientsDocs?.find(
                    (doc: any) => doc.email === patientData.email,
                );

            setEmailFound(currentUserData);
        }
    }, [patientData]);

    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
            // Colección donde guardas tus odontólogos/especialistas
            const list = await getAllDocumentsFb("professionals");
            setProfessionals(list);               // 👈  guardamos todo el objeto
            } catch (err) {
            console.error("No pude leer profesionales:", err);
            }
        };
        fetchProfessionals();
        }, []);
        
    useEffect(() => {
        getAllEmails();
        getOptions();
        getOrders();
        getPatients();
        getAreas();
        getCampus();
    }, [getOptions, getOrders, getPatients, getAreas, getCampus, getAllEmails]);

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
            router.replace("/dashboard");
            return;
        }

        if (!user && !userRoleId) {
            router.replace("/sign-in");
            return;
        }
    }, [router, user, userData]);

    useEffect(() => {
        if (patientData.autoEmail) {
            setEmailLocked(false);
        }
    }, [patientData.autoEmail]);
    return {
        professionals,
        emailFound,
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
        isVerificated,
        setIsEdit,
        setIsVerificated,
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
        emailFoundAlert,
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
        //validateid,
        validateidProfessional,
        validateidPatient,
        validateEmail,
        autoEmail,
        setProfessionalId,
        emailLocked,
        setEmailLocked,
        lockEmail,

    };
};

export default NewOrderHook;
