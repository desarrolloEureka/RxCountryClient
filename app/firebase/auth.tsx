import { User, onAuthStateChanged, getAuth } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import { auth } from "@/shared/firebase/firebase";
import { getProfileDataByIdFb } from "./user";
import { UserData } from "../types/user";

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
    const [userData, setUserData] = useState<UserData>();
    // const [role, setRole] = useState<Role | null>();
    const [error, setError] = useState<string>();
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
        const userId = user?.uid;
        user &&
            (await getProfileDataByIdFb(userId, "professionals").then(
                (res: any) => {
                    setIsActiveUser(res.isActive);
                    setUserData(res);
                },
            ));
    }, [user]);

    useEffect(() => {
        if (user !== undefined) {
            setIsLoading(false);
            getUserState();
            // console.log("soy diferente a indefinido");
        }
        console.log("user", user, isActiveUser);
        // console.log("isActiveUser", isActiveUser);
    }, [getUserState, isActiveUser, user]);

    return {
        isLoading,
        user,
        userData,
        error,
        isActiveUser,
    };
};
export default useAuth;
