"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function ForgotPasswordSuccess() {
    const router = useRouter();
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
                <div className="flex flex-col space-y-8 items-center w-auto sm:w-full sm:mx-16">
                    <h2 className="text-company-orange text-xl">
                        Revisa tu Correo
                    </h2>
                    {/* <h2 className="text-company-orange text-xl">Contraseña recuperada</h2> */}
                    <p className="text-white text-center w-auto sm:w-96 text-wrap">
                        Ingresa al enlace que llegó a tu correo y cambia tu
                        contraseña, al aceptar ya puedes iniciar sesión
                        nuevamente con tu nueva contraseña.
                    </p>
                    {/* <p className="text-white text-center w-96">
            Tu contraseña ha sido cambiada con éxito, a continuación inicia
            sesión con tu nueva contraseña.
          </p> */}
                    <button
                        className="bg-company-blue rounded-2xl px-5 py-3 text-white"
                        onClick={() => router.push("/")}
                    >
                        Inicio de Sesión
                    </button>
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
