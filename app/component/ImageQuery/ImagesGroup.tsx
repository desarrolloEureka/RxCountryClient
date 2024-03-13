"use client";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ImagesGroup = () => {
  return (
    <div className="mx-auto flex rounded-[2.5rem] bg-company-gray w-full max-w-[1440px]">
      <div className="flex flex-col items-center w-72 p-12 space-y-8 bg-[#5E5E5E] rounded-[2.5rem]">
        <div className="flex items-center space-x-8">
          <Link href={"/dashboard/images-query/details/123"}>
            <IoArrowBackCircleOutline className="text-company-blue" size={32} />
          </Link>
          <h2 className="text text-company-blue text-xl">Imágenes</h2>
        </div>
        <div className="flex flex-col space-y-4 overflow-auto h-full">
          <div className="flex flex-col items-center space-y-2 cursor-pointer">
            <Image
              src="https://via.placeholder.com/1920"
              width={1920}
              height={1920}
              alt="image"
              className="rounded-xl w-full"
            />
            <h3 className="text-white text-center">Tomografía 2</h3>
          </div>
          <div className="flex flex-col items-center space-y-2 cursor-pointer">
            <Image
              src="/assets/icons/PDF.svg"
              width={1920}
              height={1920}
              alt="image"
              className="rounded-xl w-full"
            />
            <h3 className="text-white text-center">Informe de radigrafía</h3>
          </div>
          <div className="flex flex-col items-center space-y-2 cursor-pointer">
            <Image
              src="/assets/icons/wetranfer.svg"
              width={64}
              height={64}
              alt="image"
              className="rounded-xl"
            />
            <h3 className="text-white text-center">Link: WeTranfer</h3>
          </div>
          <div className="flex flex-col items-center space-y-2 cursor-pointer">
            <Image
              src="/assets/icons/enlace.svg"
              width={64}
              height={64}
              alt="image"
              className="rounded-xl"
            />
            <h3 className="text-white text-center">Link</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-8 w-full p-12">
        <h3 className="text-white">Tomografía 1</h3>
        <Image
          src="https://via.placeholder.com/1920"
          width={1920}
          height={1920}
          alt="image"
          className="rounded-xl w-full"
        />
        <Link
          className="mx-auto rounded-xl bg-gray-500 hover:bg-gray-400 text-white flex justify-center items-center py-2 w-64"
          target="_blank"
          href="https://via.placeholder.com/1920.png"
          download="tomografia-1.png"
        >
          Descargar imagen
        </Link>
      </div>
    </div>
  );
};

export default ImagesGroup;
