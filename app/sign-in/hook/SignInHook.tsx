import { LoginData } from "@/app/data/user";
import useAuth from "@/app/firebase/auth";
import { loginFirebase } from "@/app/firebase/user";
import AuthValidate from "@/app/hook/AuthValidate";
import { LoginParams } from "@/app/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUpHook = () => {
    const { user, isActiveUser } = useAuth();
    const [error, setError] = useState(false);
    const [data, setData] = useState(LoginData);
    const router = useRouter();
    const { email, password } = data;
    const [sigIn, setSignIn] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [isPatient, setIsPatient] = useState(false);

    const handleSignIn = async ({ email, password }: LoginParams) => {
        if (email && password) {
            loginFirebase(email, password)
                .then(() => {
                    setError(false);
                    setSignIn(true);
                    // if (isActiveUser) {
                    //     router.replace("/dashboard");
                    // } else {
                    //     router.replace("/sign/inactive-user");
                    // }
                })
                .catch(() => {
                    setError(true);
                    setSignIn(false);
                });
        } else {
            setError(true);
        }
    };

    const changeHandler = (e: any) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (user) {
            setSignIn(true);
            router.replace("/dashboard");
        }
    }, [router, user]);

    return {
        user,
        email,
        password,
        error,
        sigIn,
        showPassword,
        router,
        isPatient,
        isActiveUser,
        handleSignIn,
        setError,
        changeHandler,
        setShowPassword,
        setIsPatient,
    };
};

export default SignUpHook;
