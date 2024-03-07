"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ImKey } from "react-icons/im";
import { IoEye, IoEyeOff, IoMail } from "react-icons/io5";

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  return (
    <main className="relative flex flex-col justify-center items-center bg-login-image bg-cover bg-bottom min-h-screen w-full">
      <div className="flex flex-col items-center space-y-8 p-8 rounded-3xl border-2 border-company-blue bg-black bg-opacity-80">
        <h2 className="w-full text-center text-company-blue text-2xl">
          Registro
        </h2>
        <div className="flex flex-col space-y-8 items-center w-full mx-16">
          <div className="grid grid-cols-2 justify-center w-[512px] gap-8">
            <div className="col flex flex-col w-full space-y-2">
              <label htmlFor="name" className="text-white">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-4"
              />
            </div>
            <div className="col flex flex-col w-full space-y-2">
              <label htmlFor="email" className="text-white">
                Correo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-4"
              />
            </div>
            <div className="col flex flex-col w-full space-y-2">
              <label htmlFor="lastname" className="text-white">
                Apellidos
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                required
                className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-4"
              />
            </div>
            <div className="col relative flex flex-col w-full space-y-2">
              <label htmlFor="password" className="text-white">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-4 pr-10"
              />
              <Link href={""} onClick={() => setShowPassword(!showPassword)}>
                <span className="absolute right-2 bottom-4 text-company-blue text-[1.5rem]">
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </span>
              </Link>
            </div>
            <div className="col flex flex-col w-full space-y-2">
              <label htmlFor="phone" className="text-white">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="number"
                required
                className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-4"
              />
            </div>
            <div className="col relative flex flex-col w-full space-y-2">
              <label htmlFor="confirm-password" className="text-white">
                Repite tu contraseña
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showPassword ? "text" : "password"}
                required
                className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-4 pr-10"
              />
              <Link href={""} onClick={() => setShowPassword(!showPassword)}>
                <span className="absolute right-2 bottom-4 text-company-blue text-[1.5rem]">
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </span>
              </Link>
            </div>
            <div className="col flex flex-col w-full space-y-2">
              <label htmlFor="dni-type" className="text-white">
                Tipo de documento
              </label>
              <select
                id="dni-type"
                name="dni-type"
                required
                className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-4"
              >
                <option className="bg-black">Cédula de ciudadanía</option>
                <option className="bg-black">Cédula de extrangería</option>
              </select>
            </div>
            <div className="col flex flex-col w-full space-y-2">
              <label htmlFor="dni" className="text-white">
                Número de documento
              </label>
              <input
                id="dni"
                name="dni"
                type="number"
                required
                className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-4"
              />
            </div>
          </div>
          <button
            onClick={() => router.replace("/dashboard")}
            className="bg-company-blue rounded-2xl px-5 py-3 text-white"
          >
            Registrate
          </button>
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
