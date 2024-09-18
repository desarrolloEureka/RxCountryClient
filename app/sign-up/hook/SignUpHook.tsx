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
    getAllProfessionals,
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
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [errorId, setErrorId] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    const [specialties, setSpecialties] = useState<any[]>();
    const [contracts, setContracts] = useState<any>();

    const [errorImg, setErrorImg] = useState("");
    const [idsProfessionalsData, setIdsProfessionalsData] = useState<string[]>(
        [],
    );
    const [emailsProfessionalsData, setEmailsProfessionalsData] = useState<
        string[]
    >([]);

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

    const handleCloseError = () => {
        setShowError(false);
        setErrorId("");
        setErrorEmail("");
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

    const uploadHandle = async () => {
        const { confirmEmail, ...rest } = data;
        let newUrlPhoto: string = "";

        // Verificar si el ID y el correo ya existen en la base de datos
        const isIdUserFound = idsProfessionalsData?.includes(data.id);
        const isEmailFound = emailsProfessionalsData?.includes(data.email);

        if (isIdUserFound) {
            setShowError(true);
            setErrorId("Este usuario (documento) ya existe");
            return;
        }

        if (isEmailFound) {
            setShowError(true);
            setErrorEmail("Este correo ya existe");
            return;
        }

        try {
            // Intenta registrar al usuario en Firebase
            const result = await registerFirebase(data.email, data.id);
            const newUser = result?.user;

            if (!newUser) throw new Error("No se pudo crear el usuario.");

            // Envía el correo de bienvenida
            await handleSendWelcomeEmail(data);

            // Actualiza el perfil del usuario
            await updateUserProfile(newUser);

            // Sube la foto de perfil
            newUrlPhoto = await uploadUserProfilePhoto(newUser.uid, files);

            // Guarda la información del usuario
            await saveUserData(newUser, rest, newUrlPhoto);

            setIsSendData(false);
            setShowError(false);
            setErrorEmail("");
            setErrorId("");
        } catch (error: any) {
            handleErrors(error);
        }
    };

    // Función auxiliar para actualizar el perfil del usuario
    const updateUserProfile = async (user: any) => {
        const currentUser = user.auth.currentUser;
        if (!currentUser) throw new Error("Usuario no autenticado.");

        await updateProfileFirebase(
            currentUser,
            `${data.name} ${data.lastName}`,
        );
    };

    // Función auxiliar para subir la foto de perfil
    const uploadUserProfilePhoto = async (uid: string, files: File[]) => {
        let newUrlPhoto = "";

        for (const record of files) {
            const urlName = record.name.split(".")[0].split(" ").join("_");

            try {
                newUrlPhoto = await uploadProfilePhoto({
                    folder: uid,
                    fileName: urlName,
                    file: record,
                    reference: "professionals",
                });
            } catch (err: any) {
                console.error("Error subiendo la foto de perfil:", err);
                throw new Error("Error subiendo la foto de perfil.");
            }
        }

        return newUrlPhoto;
    };

    // Función auxiliar para guardar los datos del usuario
    const saveUserData = async (user: any, rest: any, urlPhoto: string) => {
        const reference = "professionals";
        const documentRef = getDocumentRef(reference, user.uid);

        try {
            await saveOneDocumentFb(documentRef, {
                ...rest,
                urlPhoto,
                uid: user.uid,
            });
        } catch (error) {
            console.error("Error guardando los datos del usuario:", error);
            throw new Error("Error guardando los datos del usuario.");
        }
    };

    // Función auxiliar para manejar los errores
    const handleErrors = (error: any) => {
        console.error("Error en el proceso:", error);

        if (
            error.code === "auth/email-already-exists" ||
            error.code === "auth/email-already-in-use"
        ) {
            setErrorEmail("¡El correo ya existe!");
        } else {
            setErrorEmail("Error al registrar el usuario.");
        }

        setShowError(true);
    };

    // Handle de formulario, valida las contraseñas
    const handleSendForm = async (e?: any) => {
        // console.log("data", data);
        if (professionalsVal && emailValidation) {
            e.preventDefault();
            e.stopPropagation();
            // console.log("Entró");
            await uploadHandle();
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

    // Obtiene los datos de colección de Profesionales
    const getProfessionals = useCallback(async () => {
        const allProfessionalsData = await getAllProfessionals();
        const idsProfessionals: string[] = allProfessionalsData.map(
            (user) => user.id,
        );
        const emailProfessionals: string[] = allProfessionalsData.map(
            (user) => user.email,
        );
        allProfessionalsData &&
            (setIdsProfessionalsData(idsProfessionals),
            setEmailsProfessionalsData(emailProfessionals));
    }, []);

    useEffect(() => {
        getProfessionals();
        getSpecialties();
        getContracts();
    }, [getSpecialties, getContracts, getProfessionals]);

    useEffect(() => {
        if (user) {
            // setSignUp(true);

            router.push("/sign-up/welcome-message");
        }
    }, [router, user]);

    return {
        data,
        user,
        showError,
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
        emailValidation,
        errorEmail,
        errorId,
        handleCloseError,
        setShowError,
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
