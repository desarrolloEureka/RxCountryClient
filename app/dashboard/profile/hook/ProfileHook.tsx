import {
    colombianStates,
    countries,
    getCities,
    idTypes,
} from "@/app/component/constants/formConstants";
import { dataUserObject } from "@/app/data/user";
import useAuth from "@/app/firebase/auth";
import {
    getAllContracts,
    getAllSpecialties,
    updateDocumentsByIdFb,
} from "@/app/firebase/documents";
import { uploadProfilePhoto } from "@/app/firebase/files";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

// type props = {};

const referenceByRol: { [key: string]: string } = {
    ZWb0Zs42lnKOjetXH5lq: "professionals",
    ShHQKRuKJfxHcV70XSvC: "patients",
    "9RZ9uhaiwMC7VcTyIzhl": "functionary",
};

const confirmAlert = () => {
    Swal.fire({
        position: "center",
        icon: "success",
        title: `¡Guardado!`,
        showConfirmButton: false,
        timer: 2000,
        background: "#404040",
        color: "#e9a225",
    });
};

const ProfileHook = () => {
    const { userData } = useAuth();
    const [data, setData] = useState(dataUserObject);
    const [isEdit, setIsEdit] = useState(false);
    const [nextStep, setNextStep] = useState<boolean>(false);

    const [specialties, setSpecialties] = useState<any[]>();
    const [contracts, setContracts] = useState<any>();
    const [errorImg, setErrorImg] = useState<string | null>(null);
    const [files, setFiles] = useState<any[]>([]);
    const [fileName, setFileName] = useState("Foto de Perfil");

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.name;
        setData({ ...data, [value]: e.target.value });
    };

    const phoneChangeHandler = (e: string) => {
        setData({ ...data, ["phone"]: e });
    };
    const phoneTwoChangeHandler = (e: any) => {
        setData({ ...data, ["phone2"]: e });
    };
    const selectChangeHandlerIdType = (e: any) => {
        setData({ ...data, ["idType"]: e?.target.value });
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
    const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const uploadFiles = event.target.files;

        if (!uploadFiles || uploadFiles.length === 0) {
            resetFileInput();
            return;
        }

        const file = uploadFiles[0];

        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                if (img.width <= 400 && img.height <= 400) {
                    setErrorImg("");
                    event.target.files &&
                        (setFiles([...event.target.files]),
                        setFileName(file.name));

                    // Muestra una vista previa de la imagen
                } else {
                    setErrorImg(
                        "La imagen debe tener un tamaño de 400x400 píxeles o menor.",
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

    const resetFileInput = () => {
        setFileName("Foto de Perfil");
        setFiles([]);
        setErrorImg(null);
    };

    const handleSendForm = async () => {
        const getUrlPhoto = async (): Promise<string> => {
            if (files.length > 0) {
                const urlName = files[0].name.split(".")[0];
                const result = await uploadProfilePhoto({
                    folder: data.uid,
                    fileName: urlName.split(" ").join("_"),
                    file: files[0],
                    reference: referenceByRol[data.rol],
                });
                return result;
            }
            return data.urlPhoto;
        };

        setData({ ...data, ["urlPhoto"]: await getUrlPhoto() });

        const newData = {
            ...data,
            urlPhoto: (await getUrlPhoto()) ?? "",
        };

        // await updateDocumentsByIdFb(
        //     data.uid,
        //     newData,
        //     referenceByRol[data.rol],
        // ).then(confirmAlert);
    };

    const handleClose = () => {
        // setData(dataUserObject);
        resetFileInput();
    };

    const handleNextStep = (state?: boolean) => {
        setNextStep(state ?? !nextStep);
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
        if (userData) {
            setData(userData);
        }
    }, [userData]);

    return {
        phoneChangeHandler,
        changeHandler,
        isEdit,
        setIsEdit,
        data,
        handleSendForm,
        selectChangeHandlerIdType,
        selectChangeHandlerState,
        selectChangeHandlerCountry,
        selectChangeHandlerCity,
        selectChangeHandlerSpecialty,
        selectChangeHandlerContract,
        idTypes,
        colombianStates,
        countries,
        getCities,
        nextStep,
        phoneTwoChangeHandler,
        specialties,
        contracts,
        handleNextStep,
        errorImg,
        handleInputFileChange,
        fileName,
        handleClose,
    };
};

export default ProfileHook;
