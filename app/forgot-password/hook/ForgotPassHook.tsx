import {
    getAllFunctionaries,
    getAllPatients,
    getAllProfessionals,
} from "@/app/firebase/documents";
import { resetPasswordFirebase } from "@/app/firebase/user";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const ForgotPassHook = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const [emailsProfessionalsData, setEmailsProfessionalsData] = useState<
        string[]
    >([]);

    const [emailFunctionariesData, setEmailFunctionariesData] = useState<
        string[]
    >([]);

    const [emailPatientsData, setPatientsData] = useState<string[]>([]);

    const handleChangeEmail = (value: string) => {
        setEmail(value);
    };

    const handleSendEmailRecover = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!email) {
            return;
        }

        const actionCodeSettings = {
            url: "https://rx-country-client.vercel.app/sign-in",
            handleCodeInApp: false,
        };

        const authenticateUser = async (email: string) => {
            try {
                await resetPasswordFirebase(email, actionCodeSettings).then(
                    () => {
                        router.replace("/forgot-password/success");
                    },
                );
            } catch (error) {
                //console.log("Error: ", error);
            }
        };

        // Verifica si existe el correo en base de datos.
        const isUserFound =
            emailsProfessionalsData?.includes(email) ||
            emailFunctionariesData?.includes(email) ||
            emailPatientsData?.includes(email);

        if (isUserFound) {
            await authenticateUser(email);
        } else {
            setError("Usuario No Encontrado!");
        }
    };

    // Obtiene los datos de colección de Profesionales
    const getProfessionals = useCallback(async () => {
        const allProfessionalsData = await getAllProfessionals();
        const emailProfessionals: string[] = allProfessionalsData.map(
            (user) => user.email,
        );
        allProfessionalsData && setEmailsProfessionalsData(emailProfessionals);
    }, []);

    // Obtiene los datos de colección de Funcionarios
    const getFunctionaries = useCallback(async () => {
        const allFunctionariesData = await getAllFunctionaries();
        const emailFunctionaries: string[] = allFunctionariesData.map(
            (user) => user.email,
        );
        allFunctionariesData && setEmailFunctionariesData(emailFunctionaries);
    }, []);

    // Obtiene los datos de colección de Pacientes
    const getPatients = useCallback(async () => {
        const allPatientsData = await getAllPatients();
        const emailPatients: string[] = allPatientsData.map(
            (user) => user.email,
        );
        allPatientsData && setPatientsData(emailPatients);
    }, []);

    useEffect(() => {
        getProfessionals();
        getFunctionaries();
        getPatients();
    }, [getFunctionaries, getPatients, getProfessionals]);

    return {
        handleSendEmailRecover,
        handleChangeEmail,
        email,
        setError,
        error,
    };
};
