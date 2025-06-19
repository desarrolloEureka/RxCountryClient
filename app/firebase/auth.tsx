"use client";
import { auth } from "@/shared/firebase/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { RolesBd } from "../types/roles";
import { getAllDocumentsFb } from "./documents";

const useAuth = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isActiveUser, setIsActiveUser] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>();
    const [userData, setUserData] = useState<any>();
    const [error, setError] = useState<string>();
    const [accessTokenUser, setAccessTokenUser] = useState<string>("");
    const [userRol, setUserRol] = useState<RolesBd>({
        name: "",
        uid: "",
    });
    const [userCampus, setUserCampus] = useState<string>("");

    const getUserData = useCallback(async () => {
        const userId: string | undefined = user?.uid;
        const professionalsDocs = await getAllDocumentsFb("professionals");
        const functionaryDocs = await getAllDocumentsFb("functionary");
        const patientsDocs = await getAllDocumentsFb("patients");

        // const allAreasData = await getAllDocumentsFb("areas");
        const allCampusData = await getAllDocumentsFb("campus");
        const allRolesData = await getAllDocumentsFb("roles");
        const currentUserData =
            user &&
            (functionaryDocs.find((doc: any) => doc.uid === userId) ||
                professionalsDocs.find((doc: any) => doc.uid === userId) ||
                patientsDocs.find((doc: any) => doc.uid === userId));

        const currentUserRol = allRolesData.find(
            (doc: any) => doc.uid === currentUserData?.rol,
        );

        if (currentUserData) {
            setUserData(currentUserData);
            setIsActiveUser(currentUserData?.isActive);
            setUserRol(currentUserRol);
        }

        // if (functionaryDocs && allAreasData && currentUserData.area) {
        //     const rol = allAreasData?.find(
        //         (item: any) => item.uid === currentUserData.area,
        //     )?.name;
        //     setUserRol(rol);
        // } else {
        //     setUserRol(currentUserData.rol);
        // }

        if (functionaryDocs && allCampusData && currentUserData?.campus) {
            const campus = allCampusData?.find(
                (item: any) => item.uid === currentUserData?.campus,
            )?.name;
            setUserCampus(campus);
        } else {
            setUserCampus("");
        }
    }, [user]);

    const getRole = useCallback(async () => {
        if (user) {
            //Trae la colecciones de FireStore
            const userId: string | undefined = user?.uid;
            const professionalsDocs = await getAllDocumentsFb("professionals");
            const functionaryDocs = await getAllDocumentsFb("functionary");
            const patientsDocs = await getAllDocumentsFb("patients");

            // Obtiene el documento del usuario desde FireStore
            const currentUserData =
                functionaryDocs.find((doc: any) => doc.uid === userId) ||
                professionalsDocs.find((doc: any) => doc.uid === userId) ||
                patientsDocs.find((doc: any) => doc.uid === userId);

            if (currentUserData) {
                localStorage.setItem("userRoleId", currentUserData?.rol); // Guarda el rol en localStorage
            } else {
                localStorage.removeItem("userRoleId"); // Limpia el rol si no existe
            }
        } else if (user === null) {
            localStorage.removeItem("userRoleId"); // Limpia el rol si no hay usuario
        }
    }, [user]);

    useEffect(() => {
        getRole();
    }, [getRole]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser, (error: any) => {
            setError(error.toString());
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (user !== undefined && user !== null) {
            setIsLoading(false);
            getUserData();
            user?.getIdToken().then((token) => setAccessTokenUser(token));
            //console.log("user", user);
        } else {
            // localStorage.removeItem("userRoleId"); // Limpia el rol si no hay usuario
            //console.log("User nulo o Indefinido");
            // setIsLoading(true);
            // setUser(null);
        }
    }, [getUserData, user, userData?.rol]);

    return {
        isLoading,
        user,
        userRol,
        userCampus,
        userData,
        error,
        isActiveUser,
        accessTokenUser,
    };
};
export default useAuth;
