"use client";
import AuthValidate from "@/app/hook/AuthValidate";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/firebase/auth";

const DashBoardHook = () => {
    const { user, isActiveUser, isLoading, isLoadingValidate } = AuthValidate();
    const router = useRouter();
    // console.log("Dashboard Hook", !user, !isLoading);

    useEffect(() => {
        // !user?.emailVerified &&
        !isLoading &&
            !user &&
            router.replace("/sign-in");
            // console.log("UseEffect de Dashboard Hook");
    }, [isActiveUser, isLoading, router, user]);

    // useEffect(() => {
    //     !user?.emailVerified &&
    //         router.replace("/sign-in/inactive-user");
    // }, [router, user]);

    return { user, isActiveUser, isLoading, isLoadingValidate };
};

export default DashBoardHook;
