"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { RiEditBoxFill } from "react-icons/ri";

export default function ProfilePage() {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <main className="flex flex-col justify-center items-center min-h-screen w-full bg-gray-image bg-cover">
      <div className="px-16 py-8 bg-company-gray rounded-2xl shadow-xl flex flex-col items-center space-y-4">
        <div className="w-full flex items-center space-x-2 text-company-blue font-bold text-xl">
          {!isEdit && (
            <Link href={"/dashboard"}>
              <IoArrowBackCircleOutline />
            </Link>
          )}
          <h2>Mi Perfil</h2>
        </div>
        <div className="relative w-[170px]">
          <Image
            src="https://via.placeholder.com/512"
            width={170}
            height={170}
            alt="Avatar"
            className="rounded-full shadow-xl"
          />
          {isEdit && (
            <Link href={""}>
              <RiEditBoxFill className="absolute top-4 right-0 text-3xl text-company-orange" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8 mx-16">
          <div className="col flex flex-col relative w-full">
            <input
              type="text"
              value="Fabian"
              className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
              readOnly={!isEdit}
            />
            <span className="text-company-orange">Nombre</span>
            {isEdit && (
              <Link href={""}>
                <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
              </Link>
            )}
          </div>
          <div className="col flex flex-col relative w-full">
            <input
              type="text"
              value=""
              className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
              readOnly={!isEdit}
            />
            <span className="text-company-orange">Apellido</span>
            {isEdit && (
              <Link href={""}>
                <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
              </Link>
            )}
          </div>
          <div className="col flex flex-col relative w-full">
            <input
              type="email"
              value="fabian@rxcountry.com"
              className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
              readOnly={!isEdit}
            />
            <span className="text-company-orange">Correo</span>
            {isEdit && (
              <Link href={""}>
                <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
              </Link>
            )}
          </div>
          <div className="col flex flex-col relative w-full">
            <input
              type="phone"
              value="3211234567"
              className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
              readOnly={!isEdit}
            />
            <span className="text-company-orange">Teléfono</span>
            {isEdit && (
              <Link href={""}>
                <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
              </Link>
            )}
          </div>
          <div className="col flex flex-col relative w-full">
            <input
              type="password"
              value="Fabian123Demo"
              className="bg-transparent border-b-2 border-white text-white py-2 pr-10"
              readOnly={!isEdit}
            />
            <span className="text-company-orange">Contraseña</span>
            {isEdit && (
              <Link href={""}>
                <RiEditBoxFill className="absolute right-0 bottom-8 text-3xl text-company-orange" />
              </Link>
            )}
          </div>
          <div className="col-span-2 flex justify-center">
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="border-company-blue flex space-x-2 items-center border py-2 px-4 rounded-md text-company-blue"
            >
              {!isEdit && <RiEditBoxFill />}
              <span>{isEdit ? "Guardar cambios" : "Editar datos"}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
