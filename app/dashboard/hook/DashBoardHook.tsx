"use client";
import AuthValidate from "@/app/hook/AuthValidate";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/firebase/auth";

const DashBoardHook = () => {
    const { user, isActiveUser, isLoading } = useAuth();
    const router = useRouter();

    // useEffect(() => {
    //     !isActiveUser &&
    //         !isLoading &&
    //         !user &&
    //         router.replace("/sign-in/inactive-user");
    // }, [isActiveUser, isLoading, router, user]);

    return { user, isActiveUser };
};

export default DashBoardHook;