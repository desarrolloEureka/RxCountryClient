import { loginData } from "@/app/data/user";
import useAuth from "@/app/firebase/auth";
import {
    getAllAreasOptions,
    getAllCampusOptions,
    getAllFunctionaries,
    getAllPatients,
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
    // Todas la varias a usar.

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

    const [allFunctionaries, setAllFunctionaries] = useState<any>();

    const [allPatients, setAllPatients] = useState<any>();

    const [allRoles, setAllRoles] = useState<any>();

    const [emailsProfessionalsData, setEmailsProfessionalsData] =
        useState<any>();

    const [currentUser, setCurrentUser] = useState<any>();

    // Envía la información del formulario

    const handleSignIn = async () => {
        // Verifica que las variables estén llenas
        if (!email || !password) {
            // setError("¡Las credenciales son incorrectas!");
            return;
        }

        // si es funcionario verifica estas variables
        if (userLogin === "Funcionario" && (!selectedCampus || !selectedArea)) {
            // setError("¡Seleccione una Sede!");
            return;
        }

        // verifica las credenciales
        const authenticateUser = async (email: string, password: string) => {
            
            try {
                await loginFirebase(email, password).then((data: any) => {
                    const currentUser = data.user;
                    // Si es funcionario añade sus respectiva area y rol seleccionados.
                    if (
                        selectedCampus &&
                        selectedCampus !== currentUser.campus
                    ) {
                        // console.log("En el if");
                        const reference = "functionary";
                        
                        updateDocumentsByIdFb(
                            currentUser.uid,
                            {
                                campus: selectedCampus,
                                area: selectedArea,
                                rol: allRoles.find(
                                    (item: any) => item.area === selectedArea,
                                ).uid,
                            },
                            reference,
                        );
                        
                    }
                });
                setError("");
            } catch (error: any) {
                if (error.code === "auth/invalid-credential") {
                    setError("¡Las credenciales son incorrectas!");
                    return;
                }
                setError("Error inicio de sesión");
            }
            // console.log("currentUser.rol:");
            // console.log(currentUser);
            // console.log(currentUser.rol);
        };

        // Verifica si existe el correo en base de datos.
        const isUserFound =
            userLogin === "Profesional"
                ? emailsProfessionalsData?.includes(email)
                : currentUser?.email === email;

        if (isUserFound) {
            await authenticateUser(email, password);
        } else {
            setError("Usuario No Encontrado!");
        }
    };

    // Handlers de formulario: Guarda los datos ingresados
    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });

        const userLoginData =
            allFunctionaries?.find(
                (user: any) => user.email === e.target.value,
            ) ||
            allPatients?.find((user: any) => user.email === e.target.value);

        e.target.name === "email" &&
            userLoginData &&
            (setCurrentUser(userLoginData),
            setSelectedArea(userLoginData?.area),
            setSelectedCampus(userLoginData?.campus));
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
        setError("");
    };

    // Obtiene los datos de colección de áreas
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

    // Obtiene los datos de colección de Profesionales
    const getProfessionals = useCallback(async () => {
        const allProfessionalsData = await getAllProfessionals();
        const emailProfessionals = allProfessionalsData.map(
            (user) => user.email,
        );
        allProfessionalsData && setEmailsProfessionalsData(emailProfessionals);
    }, []);

    // Obtiene los datos de colección de Funcionarios
    const getFunctionaries = useCallback(async () => {
        const allFunctionariesData = await getAllFunctionaries();

        allFunctionariesData && setAllFunctionaries(allFunctionariesData);
    }, []);

    // Obtiene los datos de colección de Pacientes
    const getPatients = useCallback(async () => {
        const allPatientsData = await getAllPatients();

        allPatientsData && setAllPatients(allPatientsData);
    }, []);

    // Obtiene los datos de colección de Roles
    const getRoles = useCallback(async () => {
        const allRolesData = await getAllRoles();
        allRolesData && setAllRoles(allRolesData);
    }, []);

    useEffect(() => {
        getCampus();
        getRoles();
        getProfessionals();
        getFunctionaries();
        getPatients();
    }, [getCampus, getProfessionals, getFunctionaries, getRoles, getPatients]);

    useEffect(() => {
        if (user && userData) {
            router.replace("/dashboard");
        }
    }, [router, user, userData]);

    return {
        user,
        email,
        password,
        error,
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
