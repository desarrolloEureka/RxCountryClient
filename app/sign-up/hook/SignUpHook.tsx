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
import { uploadFile } from "@/app/firebase/files";
import {
    registerFirebase,
    sendEmailToUser,
    updateProfileFirebase,
} from "@/app/firebase/user";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Props = {};

const SignUpHook = (props?: Props) => {
    const router = useRouter();
    const { user, isActiveUser, userData } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [isPatient, setIsPatient] = useState(false);
    const [data, setData] = useState(dataProfessionalObject);
    const [files, setFiles] = useState<any[]>([]);
    const [errorPass, setErrorPass] = useState(false);
    const [isSendData, setIsSendData] = useState(false);
    const [sigUp, setSignUp] = useState(false);
    const [nextStep, setNextStep] = useState(true);

    const [specialties, setSpecialties] = useState<any>();
    const [contracts, setContracts] = useState<any>();

    const [errorImg, setErrorImg] = useState("");

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
        const file = event.target.files[0];
        if (!file) return;

        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                if (img.width <= 400 && img.height <= 400) {
                    setErrorImg("");
                    event.target.files && setFiles([...event.target.files]);
                    // Muestra una vista previa de la imagen
                } else {
                    setErrorImg(
                        "La imagen debe tener un tamaño de 400x200 píxeles o menor.",
                    );
                }
                URL.revokeObjectURL(img.src);
            };

            img.onerror = () => {
                setErrorImg("Error al cargar la imagen. Inténtalo de nuevo.");
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

    // console.log(data);

    const professionalsVal =
        data.idType &&
        data.id &&
        data.name &&
        data.lastName &&
        data.email &&
        data.password &&
        data.confirmPassword &&
        data.phone !== "57" &&
        data.phone !== "" &&
        data.phone.length > 11;

    const passValidation = data.confirmPassword === data.password;

    const uploadHandle = async () => {
        const { password, confirmPassword, ...rest } = data;
        let newUrlPhoto: string = "";
        const res = await registerFirebase(data.email, password)
            .then(async (result: any) => {
                const newUser = result.user;
                if (newUser !== null) {
                    setIsSendData(true);

                    const user = newUser.auth.currentUser;
                    updateProfileFirebase(
                        user,
                        `${data.name} ${data.lastName}`,
                    );

                    const reference = "professionals";
                    const documentRef: any = getDocumentRef(
                        reference,
                        newUser.uid,
                    );

                    for (const record of files) {
                        const urlName = record.name.split(".")[0];
                        await uploadFile({
                            folder: newUser.uid,
                            fileName: urlName,
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

                    var actionCodeSettings = {
                        url:
                            "https://rx-country-client.vercel.app/sign-in/?email=" +
                            newUser.email,
                        // url:
                        //     "https://localhost:3001/sign-in/?email=" +
                        //     newUser.email,
                        // iOS: {
                        //     bundleId: "com.example.ios",
                        // },
                        // android: {
                        //     packageName: "com.example.android",
                        //     installApp: true,
                        //     minimumVersion: "12",
                        // },
                        handleCodeInApp: false,
                        // When multiple custom dynamic link domains are defined, specify which
                        // one to use.
                        // dynamicLinkDomain: "example.page.link",
                    };

                    saveOneDocumentFb(documentRef, {
                        ...rest,
                        urlPhoto: newUrlPhoto,
                        uid: newUser.uid,
                    }).then(() => {
                        setIsSendData(false);
                        console.log("entre en el then de saveOneDocument");
                        const user = newUser.auth.currentUser;
                        sendEmailToUser(user, actionCodeSettings);
                        //     .then(() => {
                        //     router.push("/sign-up/verification-email-send");
                        // });
                    });
                }
                setSignUp(true);
            })
            .catch((error: any) => {
                console.log(error);
                setSignUp(false);
            });
        return res;
    };

    const handleSendForm = async (e?: any) => {
        // console.log("data", data);
        if (professionalsVal && passValidation) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Entró");
            await uploadHandle();
            handleClose();
        } else {
            e.preventDefault();
            e.stopPropagation();
            !passValidation && setErrorPass(true);
            console.log("Falló");
        }
    };

    const getSpecialties = useCallback(async () => {
        const allSpecialties: any = await getAllSpecialties();
        allSpecialties && setSpecialties(allSpecialties);
    }, []);

    const getContracts = useCallback(async () => {
        const allContracts: any = await getAllContracts();
        allContracts && setContracts(allContracts);
    }, []);

    useEffect(() => {
        getSpecialties();
        getContracts();
    }, [getSpecialties, getContracts]);

    useEffect(() => {
        if (user) {
            // setSignUp(true);

            // router.replace("/dashboard");

            user?.emailVerified
                ? router.replace("/dashboard")
                : router.replace("/sign-up/verification-email-send");
        }
    }, [router, user, userData?.isActive]);

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
