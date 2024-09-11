"use client";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import useAuth from "../firebase/auth";

const PageHook = () => {
    const router = useRouter();
    const { user, isLoading, isActiveUser } = useAuth();

    useLayoutEffect(() => {
        user && !isLoading
            ? router.replace("/dashboard")
            : router.replace("/sign-in");

        // console.log("entre en PageHook");
    }, [isActiveUser, isLoading, router, user]);

    return { user, isActiveUser, isLoading };
};

export default PageHook;
