"use client";
import AuthValidate from "@/app/hook/AuthValidate";

const DashBoardHook = () => {
    const { user, isActiveUser, isLoading, isLoadingValidate, userData } =
        AuthValidate();

    return { user, isActiveUser, isLoading, isLoadingValidate, userData };
};

export default DashBoardHook;
