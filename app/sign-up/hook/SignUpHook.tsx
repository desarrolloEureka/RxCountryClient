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
import { registerFirebase } from "@/app/firebase/user";
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
        event.target.files && setFiles([...event.target.files]);
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
        data.phone.length > 10;
    // data.phone2 &&
    // data.address &&
    // data.country &&
    // data.state &&
    // data.city &&
    // data.specialty &&
    // data.contract &&
    // data.isActive;

    // console.log(professionalsVal);

    const passValidation = data.confirmPassword === data.password;

    const uploadHandle = async () => {
        let newData = data;
        const res = await registerFirebase(data.email, data.password)
            .then(async (result: any) => {
                const newUser = result.user;
                if (newUser !== null) {
                    // console.log(result);
                    setIsSendData(true);

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
                            .then((result) => {
                                // console.log("entré al archivo", {
                                //     ...data,
                                //     urlPhoto: urlName,
                                // });
                                newData = {
                                    ...data,
                                    urlPhoto: urlName,
                                };
                                console.log(newData);
                            })
                            .catch((err: any) => {
                                console.log(err);
                            });
                    }

                    // var actionCodeSettings = {
                    //     url:
                    //         "https://http://localhost:3000/?email=" +
                    //         newUser.email,
                    //     iOS: {
                    //         bundleId: "com.example.ios",
                    //     },
                    //     android: {
                    //         packageName: "com.example.android",
                    //         installApp: true,
                    //         minimumVersion: "12",
                    //     },
                    //     handleCodeInApp: false,
                    //     // When multiple custom dynamic link domains are defined, specify which
                    //     // one to use.
                    //     dynamicLinkDomain: "example.page.link",
                    // };

                    saveOneDocumentFb(documentRef, {
                        ...newData,
                        uid: newUser.uid,
                    }).then(() => {
                        router.push("/sign-up/verification-email-send");
                        setIsSendData(false);
                        // console.log("entre en el then de saveOneDocument");
                        // const user = newUser.auth.currentUser;
                        // sendEmailToUser(user, actionCodeSettings).then(() => {
                        //     // router.push("/sign-up/verification-email-send");
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
            userData?.isActive
                ? router.replace("/dashboard")
                : router.replace("/sign-in/inactive-user");
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
