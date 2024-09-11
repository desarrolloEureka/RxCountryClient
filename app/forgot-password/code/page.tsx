"use client";
import Link from "next/link";
import {
  IoArrowBackCircleOutline
} from "react-icons/io5";

export default function ForgotPasswordCode() {
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
                    <h2 className="text-company-orange text-xl">
                        Recuperar contraseña
                    </h2>
                    <p className="text-white text-center w-96">
                        Ingresa el código de verificación que llego a tu correo.
                    </p>
                    <div className="flex flex-col w-full px-16 space-y-2">
                        <label htmlFor="code" className="text-white">
                            Código
                        </label>
                        <input
                            id="code"
                            name="code"
                            type="text"
                            required
                            className="rounded-xl h-10 bg-transparent border-company-blue border text-white pl-10"
                        />
                    </div>
                    <div className="flex justify-between items-center w-full px-16">
                        <Link href={""} className="text-company-blue underline">
                            Reenviar código
                        </Link>
                        <Link
                            href={"/forgot-password/new-password"}
                            className="text-company-blue underline"
                        >
                            Verificar código
                        </Link>
                    </div>
                </div>
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
