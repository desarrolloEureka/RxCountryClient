"use client";
import Image from "next/image";
import Link from "next/link";
import { ImKey } from "react-icons/im";
import { IoEye, IoEyeOff, IoMail } from "react-icons/io5";
import Spinner from "../component/spinner/Spinner";
import SignInHook from "./hook/SignInHook";
import { useSearchParams } from "next/navigation";

const SingIn = () => {
    const searchParams = useSearchParams();

    const search = searchParams.get("email");

    const {
        user,
        showPassword,
        email,
        error,
        password,
        isPatient,
        // isActiveUser,
        setError,
        setShowPassword,
        setIsPatient,
        changeHandler,
        handleSignIn,
    } = SignInHook();

    if (user || user === undefined) {
        return <Spinner />;
    }

    return (
        <main className="flex flex-col bg-login-image bg-cover bg-bottom w-full min-h-screen">
            <div className="flex flex-col justify-center items-center min-h-[93vh] w-full">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    className="flex flex-col items-center space-y-8 p-8 rounded-3xl border-2 border-company-blue bg-black bg-opacity-80"
                >
                    {!isPatient && (
                        <div className="w-full">
                            <Link
                                href="/sign-up"
                                className="flex items-center space-x-2 text-company-blue"
                            >
                                <span>Registrarse</span>
                                <Image
                                    src={"/assets/icons/register-arrow.svg"}
                                    width={22}
                                    height={20}
                                    alt={"register icon"}
                                />
                            </Link>
                        </div>
                    )}
                    <div className="flex flex-col space-y-8 items-center w-full mx-16">
                        <Image
                            src={"/assets/logo.png"}
                            width={0}
                            height={0}
                            sizes="350px"
                            style={{ width: "45%", height: "auto" }}
                            alt={"logo"}
                            placeholder="blur"
                            blurDataURL={"/assets/logo.png"}
                        />
                        <div className="grid grid-cols-2 justify-between w-full px-16">
                            <div className="flex space-x-2 items-center text-white">
                                <input
                                    type="radio"
                                    checked={!isPatient}
                                    onChange={(_) => {
                                        setIsPatient(false);
                                    }}
                                    className="w-8 h-8 border-2"
                                />
                                <span>Profesional</span>
                            </div>
                            <div className="flex space-x-2 justify-end items-center text-white">
                                <input
                                    type="radio"
                                    checked={isPatient}
                                    onChange={(_) => {
                                        setIsPatient(true);
                                    }}
                                    className="w-8 h-8 border-0"
                                />
                                <span>Paciente</span>
                            </div>
                        </div>
                        {!isPatient && (
                            <>
                                <div className="relative flex flex-col w-full px-16 space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-white"
                                    >
                                        Correo
                                    </label>
                                    <input
                                        value={search ? search : email}
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10"
                                        onChange={changeHandler}
                                    />
                                    <IoMail className="ml-16 absolute left-2 bottom-2 text-company-blue text-[1.5rem]" />
                                </div>

                                <div className="relative flex flex-col w-full px-16 space-y-2">
                                    <label
                                        htmlFor="password"
                                        className="text-white"
                                    >
                                        Contraseña
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10"
                                        onChange={changeHandler}
                                    />
                                    <ImKey className="ml-16 absolute left-2 bottom-4 text-company-blue text-[1.5rem]" />
                                    <Link
                                        href={""}
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                    >
                                        <span className="absolute right-2 bottom-4 text-company-blue mr-16 text-[1.5rem]">
                                            {showPassword ? (
                                                <IoEyeOff />
                                            ) : (
                                                <IoEye />
                                            )}
                                        </span>
                                    </Link>
                                </div>
                            </>
                        )}
                        {/* {!isPatient && (
                            <div className="flex justify-end items-center w-full px-16">
                                <Link
                                    href={"/forgot-password"}
                                    className="text-white underline"
                                >
                                    Olvide mi contraseña
                                </Link>
                            </div>
                        )} */}
                        {isPatient && (
                            <div className="flex flex-col w-full px-16 space-y-2">
                                <label htmlFor="user" className="text-white">
                                    Usuario (Cédula)
                                </label>
                                <input
                                    id="user"
                                    name="user"
                                    type="text"
                                    required
                                    className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-2"
                                />
                            </div>
                        )}
                        {error && (
                            <div
                                id="alert-additional-content-1"
                                className="p-2 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800"
                                role="alert"
                            >
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="flex-shrink-0 w-4 h-4 me-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span>
                                        <div className="text-xs">
                                            <strong>
                                                Las credenciales son
                                                incorrectas!
                                            </strong>
                                            &nbsp;Intenta de nuevo
                                        </div>
                                    </span>
                                    <button
                                        type="button"
                                        className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                                        data-dismiss-target="#alert-border-1"
                                        aria-label="Close"
                                        onClick={() => setError(false)}
                                    >
                                        <span className="sr-only">Dismiss</span>
                                        <svg
                                            className="w-3 h-3"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                        <button
                            type="submit"
                            className="bg-company-blue rounded-2xl px-5 py-3 text-white"
                            onClick={() =>
                                handleSignIn(
                                    search
                                        ? { email: search, password }
                                        : {
                                              email,
                                              password,
                                          },
                                )
                            }
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default SingIn;
