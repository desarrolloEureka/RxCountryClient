import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import useAuth from "../firebase/auth";

const AuthValidate = () => {
    const router = useRouter();
    const {
        user,
        isLoading,
        isActiveUser,
        userData,
        userRol,
        accessTokenUser,
    } = useAuth();
    const [isLoadingValidate, setIsLoadingValidate] = useState<boolean>(true);

    useLayoutEffect(() => {
        user && !isLoading
            ? router.replace("/dashboard")
            : router.replace("/sign-in");
    }, [isActiveUser, isLoading, router, user]);

    return {
        user,
        isLoading,
        isActiveUser,
        isLoadingValidate,
        userData,
        userRol,
        accessTokenUser,
    };
};

export default AuthValidate;
