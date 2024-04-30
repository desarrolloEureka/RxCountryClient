import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "../firebase/auth";
import PageHook from "./PageHook";

const AuthValidate = () => {
    const router = useRouter();
    const { user, isLoading, isActiveUser } = useAuth();

    useEffect(() => {
        !isActiveUser &&
            !isLoading &&
            !user &&
            router.replace("/sign-in");
        // console.log(
        //     "entre en AuthValidate",
        //     !isActiveUser,
        //     !isLoading,
        //     !user,
        //     // user === null,
        //     // user === undefined,
        // );
    }, [isActiveUser, isLoading, router, user]);

    return { user, isLoading, isActiveUser };
};

export default AuthValidate;
