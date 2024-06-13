import { loginData } from "@/app/data/user";
import useAuth from "@/app/firebase/auth";
import {
    getAllAreasOptions,
    getAllCampusOptions,
    getAllFunctionaries,
    getAllProfessionals,
    getAllRoles,
    updateDocumentsByIdFb,
} from "@/app/firebase/documents";
import { loginFirebase } from "@/app/firebase/user";
import { CampusSelector } from "@/app/types/campus";
// import { LoginParams } from "@/app/types/user";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const SignUpHook = () => {
    const { user, isActiveUser, userData } = useAuth();
    const [error, setError] = useState("");
    const [data, setData] = useState(loginData);
    const router = useRouter();
    const { email, password } = data;
    // const [sigIn, setSignIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [userLogin, setUserLogin] = useState("Profesional");

    const [allCampus, setAllCampus] = useState<CampusSelector[]>([]);

    const [allAreasByCampus, setAllAreasByCampus] = useState<any[]>([]);

    const [selectedCampus, setSelectedCampus] = useState<string>("");

    const [selectedArea, setSelectedArea] = useState<string>("");

    const [allRoles, setAllRoles] = useState<any>();

    const [emailsProfessionalsData, setEmailsProfessionalsData] =
        useState<any>();

    const [currentFunctionary, setCurrentFunctionary] = useState<any>();

    const handleSignIn = async () => {
        if (!email || !password) {
            // setError("¡Las credenciales son incorrectas!");
            return;
        }

        if (userLogin === "Funcionario" && (!selectedCampus || !selectedArea)) {
            // setError("¡Seleccione una Sede!");
            return;
        }

        const authenticateUser = async (email: string, password: string) => {
            try {
                await loginFirebase(email, password);
                setError("");
            } catch (error: any) {
                if (error.code === "auth/invalid-credential") {
                    setError("¡Las credenciales son incorrectas!");
                } else {
                    setError("Error inicio de sesión");
                }
            }
        };

        const isUserFound =
            (userLogin !== "Profesional" &&
                currentFunctionary.email === email) ||
            (userLogin === "Profesional" &&
                emailsProfessionalsData?.includes(email));

        if (isUserFound) {
            await authenticateUser(email, password);
        } else {
            setError("Usuario No Encontrado!");
        }
    };

    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const selectChangeHandlerCampus = (e: any) => {
        setSelectedCampus(e?.target.value);
    };

    const selectChangeHandlerArea = (e: any) => {
        setSelectedArea(e?.target.value);
    };

    const clearFields = () => {
        setData(loginData);
        setSelectedArea("");
        setSelectedCampus("");
    };

    const getCampus = useCallback(async () => {
        const allCampusData = await getAllCampusOptions();
        allCampusData && setAllCampus(allCampusData);

        const areasByCampus =
            selectedCampus &&
            allCampusData.find((campus) => campus.value === selectedCampus)
                ?.areas;

        const allAreasData = await getAllAreasOptions();
        const areasFiltered = allAreasData.filter((area) =>
            areasByCampus?.includes(area.value),
        );
        areasByCampus && setAllAreasByCampus(areasFiltered);
    }, [selectedCampus]);

    const getProfessionals = useCallback(async () => {
        const allProfessionalsData = await getAllProfessionals();
        const emailProfessionals = allProfessionalsData.map(
            (user) => user.email,
        );
        allProfessionalsData && setEmailsProfessionalsData(emailProfessionals);
    }, []);

    const getFunctionaries = useCallback(async () => {
        const allFunctionariesData = await getAllFunctionaries();

        const functionaryData = allFunctionariesData.find(
            (user) => user.email === email,
        );
        functionaryData && setCurrentFunctionary(functionaryData);
    }, [email]);

    const getRoles = useCallback(async () => {
        const allRolesData = await getAllRoles();
        allRolesData && setAllRoles(allRolesData);
    }, []);

    useEffect(() => {
        if (currentFunctionary && currentFunctionary.email === email) {
            setSelectedCampus(currentFunctionary.campus);
            setSelectedArea(currentFunctionary.area);
        }
    }, [currentFunctionary, email]);

    useEffect(() => {
        getCampus();
        getRoles();
        getProfessionals();
        getFunctionaries();
    }, [getCampus, getProfessionals, getFunctionaries, getRoles]);

    useEffect(() => {
        if (user && userData) {
            // setSignIn(true);
            // userData?.rol !== "Paciente"

            if (
                userData.rol === "ZWb0Zs42lnKOjetXH5lq" ||
                userData.rol === "ShHQKRuKJfxHcV70XSvC"
            ) {
                router.replace("/dashboard");
            }

            if (selectedCampus && userData.campus) {
                const reference = "functionary";
                updateDocumentsByIdFb(
                    userData.uid,
                    {
                        campus: selectedCampus,
                        area: selectedArea,
                        rol: allRoles.find(
                            (item: any) => item.area === selectedArea,
                        ).uid,
                    },
                    reference,
                ).then(() => {
                    router.replace("/dashboard");
                });
            }

            // user.emailVerified
            //     ? router.replace("/dashboard")
            //     : router.replace("/sign-in/inactive-user");
        }
    }, [router, user, userData, selectedCampus, selectedArea, allRoles]);

    return {
        user,
        email,
        password,
        error,
        // sigIn,
        showPassword,
        router,
        userLogin,
        isActiveUser,
        allCampus,
        allAreasByCampus,
        selectedCampus,
        selectedArea,
        clearFields,
        handleSignIn,
        setError,
        changeHandler,
        setShowPassword,
        setIsPatient: setUserLogin,
        selectChangeHandlerCampus,
        selectChangeHandlerArea,
    };
};

export default SignUpHook;
