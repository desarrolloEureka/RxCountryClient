"use client";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { ImKey } from "react-icons/im";
import { IoIosBusiness } from "react-icons/io";
import { IoEye, IoEyeOff, IoMail } from "react-icons/io5";
import { MdWork } from "react-icons/md";
import Spinner from "../component/spinner/Spinner";
import SignInHook from "./hook/SignInHook";

const SingIn = () => {
    const {
        user,
        showPassword,
        email,
        error,
        password,
        userLogin,
        // isActiveUser,
        allCampus,
        allAreasByCampus,
        selectedCampus,
        clearFields,
        setError,
        setShowPassword,
        setIsPatient,
        changeHandler,
        handleSignIn,
        selectChangeHandlerCampus,
        selectChangeHandlerArea,
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
                    {userLogin === "Profesional" && (
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
                        <div className="flex flex-row justify-between w-full px-16">
                            <div className="flex space-x-2 justify-center items-center text-white">
                                <input
                                    id="radio-1"
                                    type="radio"
                                    checked={userLogin === "Funcionario"}
                                    onChange={(_) => {
                                        setIsPatient("Funcionario");
                                        clearFields();
                                    }}
                                    className="w-8 h-8 border-2"
                                />
                                <label htmlFor="radio-1">Funcionario</label>
                            </div>
                            <div className="flex space-x-2 justify-center items-center text-white">
                                <input
                                    id="radio-2"
                                    type="radio"
                                    checked={userLogin === "Profesional"}
                                    onChange={(_) => {
                                        setIsPatient("Profesional");
                                        clearFields();
                                    }}
                                    className="w-8 h-8 border-2"
                                />
                                <label htmlFor="radio-2">Profesional</label>
                            </div>
                            <div className="flex space-x-2 justify-center items-center text-white">
                                <input
                                    id="radio-3"
                                    type="radio"
                                    checked={userLogin === "Paciente"}
                                    onChange={(_) => {
                                        setIsPatient("Paciente");
                                        clearFields();
                                    }}
                                    className="w-8 h-8 border-0"
                                />
                                <label htmlFor="radio-3">Paciente</label>
                            </div>
                        </div>
                        {userLogin !== "Paciente" && (
                            <>
                                <div className="relative flex flex-col w-full px-16 space-y-2">
                                    <label
                                        htmlFor="email"
                                        className="text-white"
                                    >
                                        Correo
                                    </label>
                                    <input
                                        value={email}
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
                                        value={password}
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        required
                                        className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10"
                                        title="Debe contener al menos un número y una letra mayúscula y minúscula, y al menos 8 o más caracteres"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
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
                                {userLogin === "Funcionario" && (
                                    <>
                                        <div className="relative flex flex-col w-full px-16 space-y-2">
                                            <label
                                                htmlFor="campus"
                                                className="text-white"
                                            >
                                                Seleccione Sede:
                                            </label>
                                            <select
                                                id="campus"
                                                required
                                                className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10"
                                                onChange={
                                                    selectChangeHandlerCampus
                                                }
                                            >
                                                <option
                                                    value=""
                                                    hidden
                                                    className=" text-company-orange"
                                                >
                                                    Seleccione...
                                                </option>
                                                {allCampus.map(
                                                    (option, index) =>
                                                        !_.isEmpty(
                                                            option.areas,
                                                        ) && (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    option.value
                                                                }
                                                                className="bg-black text-white"
                                                            >
                                                                {option.label}
                                                            </option>
                                                        ),
                                                )}
                                            </select>

                                            <IoIosBusiness className="ml-16 absolute left-2 bottom-2 text-company-blue text-[1.5rem]" />
                                        </div>
                                        {selectedCampus && (
                                            <div className="relative flex flex-col w-full px-16 space-y-2">
                                                <label
                                                    htmlFor="area"
                                                    className="text-white"
                                                >
                                                    Seleccione Área:
                                                </label>
                                                <select
                                                    id="area"
                                                    required
                                                    className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10"
                                                    onChange={
                                                        selectChangeHandlerArea
                                                    }
                                                >
                                                    <option
                                                        value=""
                                                        hidden={
                                                            !_.isEmpty(
                                                                allAreasByCampus,
                                                            )
                                                        }
                                                    >
                                                        Seleccione...
                                                    </option>
                                                    {allAreasByCampus.map(
                                                        (option, index) => (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    option.value
                                                                }
                                                                className="bg-black text-white"
                                                            >
                                                                {option.label}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>

                                                <MdWork className="ml-16 absolute left-2 bottom-2 text-company-blue text-[1.5rem]" />
                                            </div>
                                        )}
                                    </>
                                )}
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
                        {userLogin === "Paciente" && (
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
                                            <strong>{error}</strong>
                                            &nbsp;Intenta de nuevo
                                        </div>
                                    </span>
                                    <button
                                        type="button"
                                        className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                                        data-dismiss-target="#alert-border-1"
                                        aria-label="Close"
                                        onClick={() => setError("")}
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
                            onClick={handleSignIn}
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
