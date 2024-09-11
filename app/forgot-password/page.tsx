"use client";
import Link from "next/link";
import { IoArrowBackCircleOutline, IoMail } from "react-icons/io5";
import { ForgotPassHook } from "./hook/ForgotPassHook";

export default function ForgotPassword() {
    const { handleSendEmailRecover, handleChangeEmail, email } =
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
