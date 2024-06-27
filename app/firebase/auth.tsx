import { auth } from "@/shared/firebase/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { dataUserObject } from "../data/user";
import { UserData } from "../types/user";
import { getAllDocumentsFb } from "./documents";
import { RolesBd } from "../types/roles";

// interface Role {
//     id: string;
//     name: string;
//     slug: string;
//     isAdmin: boolean;
// }
const useAuth = () => {
    // const auth = getAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isActiveUser, setIsActiveUser] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>();
    const [userData, setUserData] = useState<UserData>(dataUserObject);
    // const [role, setRole] = useState<Role | null>();
    const [error, setError] = useState<string>();
    const [accessTokenUser, setAccessTokenUser] = useState<string>("");
    const [userRol, setUserRol] = useState<RolesBd>({
        name: "",
        uid: "",
    });
    const [userCampus, setUserCampus] = useState<string>("");
    //   const getRole = useCallback(async () => {
    //     if (user) {
    //       const document = await getDoc(doc(db, 'usersData', user.uid));
    //       if (document.exists()) {
    //         const roleDocument = await getDoc(
    //           document.data().roleRef as DocumentReference
    //         );
    //         if (roleDocument.exists()) {
    //           setRole({
    //             ...roleDocument.data(),
    //             id: roleDocument.id,
    //             isAdmin: roleDocument.data().slug === 'admin',
    //           } as Role);
    //         }
    //       }
    //     } else if (user === null) {
    //       setRole(null);
    //     }
    //   }, [user]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, setUser, (error: any) => {
            setError(error.toString());
        });
        return () => {
            unsubscribe();
        };
    }, []);

    //   useEffect(() => {
    //     getRole();
    //   }, [getRole]);

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

    useEffect(() => {
        if (user !== undefined && user !== null) {
            setIsLoading(false);
            getUserData();
            user?.getIdToken().then((token) => setAccessTokenUser(token));
            console.log("user", user);
        } else {
            console.log("User nulo o Indefinido");
            // setIsLoading(true);
            // setUser(null);
        }
    }, [getUserData, user]);

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
