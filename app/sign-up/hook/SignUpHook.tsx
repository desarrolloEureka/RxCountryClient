import {
    colombianStates,
    countries,
    getCities,
    idTypes,
} from "@/app/component/constants/formConstants";
import { dataProfessionalObject } from "@/app/data/professionalData";
import useAuth from "@/app/firebase/auth";
import {
    getAllContracts,
    getAllSpecialties,
    getDocumentRef,
    saveOneDocumentFb,
} from "@/app/firebase/documents";
import { uploadProfilePhoto } from "@/app/firebase/files";
import { registerFirebase, updateProfileFirebase } from "@/app/firebase/user";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { handleSendWelcomeEmail } from "../../../lib/brevo/handlers/actions";

type Props = {};

const SignUpHook = (props?: Props) => {
    // variables y constantes a usar
    const router = useRouter();
    const { user, isActiveUser, userData } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [isPatient, setIsPatient] = useState(false);
    const [data, setData] = useState(dataProfessionalObject);
    const [files, setFiles] = useState<any[]>([]);
    const [fileName, setFileName] = useState("");
    const [errorPass, setErrorPass] = useState(false);
    const [isSendData, setIsSendData] = useState(false);
    const [sigUp, setSignUp] = useState(false);
    const [nextStep, setNextStep] = useState(true);

    const [specialties, setSpecialties] = useState<any[]>();
    const [contracts, setContracts] = useState<any>();

    const [errorImg, setErrorImg] = useState("");

    // Handlers de formulario
    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const selectChangeHandlerIdType = (e: any) => {
        setData({ ...data, ["idType"]: e?.target.value });
    };
    const selectChangeHandlerStatus = (e: any) => {
        setData({ ...data, ["isActive"]: e?.target.value });
    };
    const selectChangeHandlerState = (e: any) => {
        setData({ ...data, ["state"]: parseInt(e?.target.value) });
    };
    const selectChangeHandlerCountry = (e: any) => {
        setData({ ...data, ["country"]: e?.target.value });
    };
    const selectChangeHandlerCity = (e: any) => {
        setData({ ...data, ["city"]: e?.target.value });
    };
    const selectChangeHandlerSpecialty = (e: any) => {
        setData({ ...data, ["specialty"]: e?.target.value });
    };
    const selectChangeHandlerContract = (e: any) => {
        setData({ ...data, ["contract"]: e?.target.value });
    };
    const handleInputFileChange = (event: { target: any }) => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            resetFileInput();
            return;
        }

        const newFile = files[0];

        if (newFile) {
            const img = new Image();
            img.src = URL.createObjectURL(newFile);

            img.onload = () => {
                if (img.width <= 400 && img.height <= 400) {
                    setErrorImg("");
                    setFileName(newFile.name);
                    event.target.files && setFiles([...event.target.files]);
                    // Muestra una vista previa de la imagen
                } else {
                    setErrorImg(
                        "La imagen debe tener un tamaño de 400x400 píxeles o menor.",
                    );
                    setFileName("");
                }
                URL.revokeObjectURL(img.src);
            };

            img.onerror = () => {
                setErrorImg("Error al cargar la imagen. Inténtalo de nuevo.");
                setFileName("");
                URL.revokeObjectURL(img.src);
            };
        }
    };
    const phoneChangeHandler = (e: any) => {
        setData({ ...data, ["phone"]: e });
    };
    const phoneTwoChangeHandler = (e: any) => {
        setData({ ...data, ["phone2"]: e });
    };

    const handleClose = () => {
        setData(dataProfessionalObject);
        setErrorPass(false);
    };

    const resetFileInput = () => {
        setFiles([]);
        setErrorImg("");
        setFileName("");
    };

    // console.log(data);

    // Validación del formulario
    const professionalsVal =
        data.idType &&
        data.id &&
        data.name &&
        data.lastName &&
        data.email &&
        data.confirmEmail &&
        data.phone !== "57" &&
        data.phone !== "" &&
        data.phone.length > 11;

    const emailValidation = data.email === data.confirmEmail;

    // Handle del registro
    const uploadHandle = async () => {
        const { confirmEmail, ...rest } = data;
        let newUrlPhoto: string = "";
        const res = await registerFirebase(data.email, data.id)
            .then(async (result: any) => {
                const newUser = result.user;

                // Envía el correo de nuevo usuario
                await handleSendWelcomeEmail(data);

                if (newUser !== null) {
                    setIsSendData(true);

                    // Actualiza la info
                    const user = newUser.auth.currentUser;
                    await updateProfileFirebase(
                        user,
                        `${data.name} ${data.lastName}`,
                    );

                    const reference = "professionals";
                    const documentRef: any = getDocumentRef(
                        reference,
                        newUser.uid,
                    );

                    // Guarda los archivos(foto perfil)
                    for (const record of files) {
                        const urlName = record.name.split(".")[0];
                        await uploadProfilePhoto({
                            folder: newUser.uid,
                            fileName: urlName.split(" ").join("_"),
                            file: record,
                            reference,
                        })
                            .then((res) => {
                                newUrlPhoto = res;
                            })
                            .catch((err: any) => {
                                console.log(err);
                            });
                    }

                    // Guarda la información del usuario
                    await saveOneDocumentFb(documentRef, {
                        ...rest,
                        urlPhoto: newUrlPhoto,
                        uid: newUser.uid,
                    }).then(() => {
                        setIsSendData(false);
                    });
                }
                // setSignUp(true);
            })
            .catch((error: any) => {
                console.log(error);
                setSignUp(false);
            });
        return res;
    };

    // Handle de formulario, valida las contraseñas
    const handleSendForm = async (e?: any) => {
        // console.log("data", data);
        if (professionalsVal && emailValidation) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Entró");
            await uploadHandle();
            handleClose();
        } else {
            e.preventDefault();
            e.stopPropagation();
            !emailValidation && setErrorPass(true);
            console.log("Falló");
        }
    };

    // Obtiene los datos de la colección de Especialidades
    const getSpecialties = useCallback(async () => {
        const allSpecialties: any[] = await getAllSpecialties();
        allSpecialties && setSpecialties(allSpecialties);
    }, []);

    // Obtiene los datos de la colección de Convenios
    const getContracts = useCallback(async () => {
        const allContracts: any = await getAllContracts();
        allContracts && setContracts(allContracts);
    }, []);

    useEffect(() => {
        getSpecialties();
        getContracts();
    }, [getSpecialties, getContracts]);

    useEffect(() => {
        if (user && userData) {
            // setSignUp(true);

            router.replace("/dashboard");
        }
    }, [router, user, userData]);

    return {
        data,
        user,
        errorPass,
        showPassword,
        isPatient,
        idTypes,
        countries,
        isActiveUser,
        colombianStates,
        specialties,
        contracts,
        isSendData,
        nextStep,
        professionalsVal,
        errorImg,
        fileName,
        setNextStep,
        setErrorPass,
        handleClose,
        getCities,
        setShowPassword,
        setIsPatient,
        changeHandler,
        handleSendForm,
        selectChangeHandlerIdType,
        selectChangeHandlerStatus,
        selectChangeHandlerState,
        selectChangeHandlerCountry,
        selectChangeHandlerCity,
        selectChangeHandlerSpecialty,
        selectChangeHandlerContract,
        handleInputFileChange,
        phoneChangeHandler,
        phoneTwoChangeHandler,
    };
};

export default SignUpHook;
