import { auth } from "@/shared/firebase/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { UserData } from "../types/user";
import { getProfileDataByIdFb } from "./user";
import { dataUserObject } from "../data/user";

// interface Role {
//     id: string;
//     name: string;
//     slug: string;
//     isAdmin: boolean;
// }
const useAuth = () => {
    // const auth = getAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isActiveUser, setIsActiveUser] = useState<boolean>();
    const [user, setUser] = useState<User | null>();
    const [userData, setUserData] = useState<UserData>(dataUserObject);
    // const [role, setRole] = useState<Role | null>();
    const [error, setError] = useState<string>();
    const [accessTokenUser, setAccessTokenUser] = useState<string>("");
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

    const getUserState = useCallback(async () => {
        const userId: string | undefined = user?.uid;
        user &&
            (await getProfileDataByIdFb(userId, "professionals").then(
                (res: any) => {
                    setIsActiveUser(res.isActive);
                    if (res) {
                        setUserData(res);
                    }
                },
            ));
    }, [user]);

    useEffect(() => {
        if (user !== undefined && user !== null) {
            setIsLoading(false);
            getUserState();
            user?.getIdToken().then((token) => setAccessTokenUser(token));
            console.log("user", user);
        } else {
            console.log("User nulo o Indefinido");
        }
    }, [getUserState, user]);

    return {
        isLoading,
        user,
        userData,
        error,
        isActiveUser,
        accessTokenUser,
    };
};
export default useAuth;
