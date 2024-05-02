import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import useAuth from "../firebase/auth";
import PageHook from "./PageHook";

const AuthValidate = () => {
    const router = useRouter();
    const { user, isLoading, isActiveUser } = useAuth();
    const [isLoadingValidate, setIsLoadingValidate] = useState<boolean>(true);

    useLayoutEffect(() => {
        // user
        //     ? !isActiveUser &&
        //       !isLoading &&
        //       (router.replace("/sign-in/inactive-user"),
        //       setTimeout(() => {
        //           setIsLoadingValidate(false);
        //       }, 1500))
        //     : router.replace("/sign-in");
        // !user && !isActiveUser && !isLoading && router.replace("/sign-in");
    }, [isActiveUser, isLoading, router, user]);

    return { user, isLoading, isActiveUser, isLoadingValidate };
};

export default AuthValidate;
