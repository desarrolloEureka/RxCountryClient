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

export default function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);
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
            Tu código ha sido verificado con éxito, a continuación crea una
            nueva contraseña e inicia sesión.
          </p>
          <div className="relative flex flex-col w-full px-16 space-y-2">
            <label htmlFor="password" className="text-white">
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
            <Link href={""} onClick={() => setShowPassword(!showPassword)}>
              <span className="absolute right-2 bottom-4 text-company-blue mr-16 text-[1.5rem]">
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </Link>
          </div>
          <div className="relative flex flex-col w-full px-16 space-y-2">
            <label htmlFor="confirm-password" className="text-white">
              Repetir contraseña
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10"
            />
            <ImKey className="ml-16 absolute left-2 bottom-4 text-company-blue text-[1.5rem]" />
            <Link href={""} onClick={() => setShowPassword(!showPassword)}>
              <span className="absolute right-2 bottom-4 text-company-blue mr-16 text-[1.5rem]">
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </Link>
          </div>
          <Link
            href={"/forgot-password/success"}
            className="text-company-blue underline"
          >
            Guardar contraseña
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
