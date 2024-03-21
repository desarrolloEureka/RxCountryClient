"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImKey } from "react-icons/im";
import { IoEye, IoEyeOff, IoMail } from "react-icons/io5";
import DashboardFooter from "./component/DashboardFooter";

export default function Home() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isPatient, setIsPatient] = useState(false);
    return (
        <main className="flex flex-col bg-login-image bg-cover bg-bottom w-full">
            <div className="flex flex-col justify-center items-center min-h-[93vh] w-full">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    className="flex flex-col items-center space-y-8 p-8 rounded-3xl border-2 border-company-blue bg-black bg-opacity-80"
                >
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
                    <div className="flex flex-col space-y-8 items-center w-full mx-16">
                        <Image
                            src={"/assets/logo.png"}
                            width={220}
                            height={72}
                            alt={"logo"}
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
                                <span>Especialista</span>
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
                            <div className="relative flex flex-col w-full px-16 space-y-2">
                                <label htmlFor="email" className="text-white">
                                    Correo
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10"
                                />
                                <IoMail className="ml-16 absolute left-2 bottom-2 text-company-blue text-[1.5rem]" />
                            </div>
                        )}
                        {!isPatient && (
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
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10"
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
                        )}
                        {!isPatient && (
                            <div className="flex justify-end items-center w-full px-16">
                                <Link
                                    href={"/forgot-password"}
                                    className="text-white underline"
                                >
                                    Olvide mi contraseña
                                </Link>
                            </div>
                        )}
                        {isPatient && (
                            <div className="flex flex-col w-full px-16 space-y-2">
                                <label htmlFor="user" className="text-white">
                                    Usuario (cédula)
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
                        <button
                            // type="submit"
                            className="bg-company-blue rounded-2xl px-5 py-3 text-white"
                            onClick={() => {
                                router.replace("/dashboard");
                            }}
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
