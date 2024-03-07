"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ImKey } from "react-icons/im";
import {
  IoArrowBackCircleOutline,
  IoEye,
  IoEyeOff,
  IoMail,
} from "react-icons/io5";

export default function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  return (
    <main className="relative flex flex-col justify-center items-center bg-login-image bg-cover bg-bottom min-h-screen w-full">
      <div className="flex flex-col items-center space-y-8 p-8 rounded-3xl border-2 border-company-blue bg-black bg-opacity-80">
        <div className="w-full">
          <Link
            href="/"
            className="flex items-center space-x-2 text-company-blue text-3xl"
          >
            <IoArrowBackCircleOutline />
          </Link>
        </div>
        <div className="flex flex-col space-y-8 items-center w-full mx-16">
          <h2 className="text-company-orange text-xl">Recuperar contraseña</h2>
          <p className="text-white text-center w-96">
            Para recuperar tu contraseña deja tu correo al cual enviaremos un
            código de verificación y luego podras crear una contraseña nueva.
          </p>
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
          <Link
            href={"/forgot-password/code"}
            className="text-company-blue underline"
          >
            Enviar código
          </Link>
        </div>
      </div>
      <footer className="absolute bottom-0 flex justify-between items-center w-full p-4 bg-company-blue">
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
      </footer>
    </main>
  );
}
