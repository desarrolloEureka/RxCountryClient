"use client";
import Link from "next/link";
import { IoArrowBackCircleOutline, IoMail } from "react-icons/io5";
import { ForgotPassHook } from "./hook/ForgotPassHook";

export default function ForgotPassword() {
    const { handleSendEmailRecover, handleChangeEmail, email, setError, error } =
        ForgotPassHook();
    return (
        <main className="relative flex flex-col justify-center items-center bg-login-image bg-cover bg-bottom min-h-screen w-full">
            <div className="flex flex-col items-center space-y-8 p-4 lg:p-8 rounded-3xl border-2 border-company-blue bg-black bg-opacity-80 w-[90%] sm:w-auto">
                <div className="w-full">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-company-blue text-3xl"
                    >
                        <IoArrowBackCircleOutline />
                    </Link>
                </div>

                <form
                    onSubmit={handleSendEmailRecover}
                    method="post"
                    className="flex flex-col space-y-8 items-center w-auto sm:w-full sm:mx-16"
                >
                    <h2 className="text-company-orange text-xl">
                        ¿Olvidaste tu contraseña?
                    </h2>
                    <p className="text-white text-center w-auto sm:w-96 text-wrap">
                        No te preocupes, ingresa tu correo donde enviaremos un
                        enlace con el cual podrás crear una contraseña nueva.
                    </p>

                    <div className="relative flex flex-col w-auto sm:w-full lg:px-16 space-y-2">
                        <label htmlFor="email" className="text-white">
                            Correo
                        </label>
                        <input
                            onChange={(e) => {
                                handleChangeEmail(e.target.value);
                            }}
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10"
                        />
                        <IoMail className="lg:ml-16 absolute left-2 bottom-2 text-company-blue text-[1.5rem]" />
                    </div>
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
                        // onClick={handleSendEmailRecover}
                        className={`text-company-blue underline ${
                            !email ? "invisible" : "visible"
                        }`}
                    >
                        Enviar
                    </button>
                </form>
            </div>
            {/* <footer className="absolute bottom-0 flex justify-between items-center w-full p-4 bg-company-blue">
        <Link href="" className="underline text-white text-sm">
          Acerca de RxCountry
        </Link>
        <Link href="" className="underline text-white text-sm">
          www.Rxcontry/eurekadreams.com
        </Link>
        <Link href="" className="underline text-white text-sm">
          <Image
            src={"/assets/logo.png"}
            width={100}
            height={24}
            alt={"logo"}
          />
        </Link>
      </footer> */}
        </main>
    );
}
