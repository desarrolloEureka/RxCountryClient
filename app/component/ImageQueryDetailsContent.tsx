"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const ImageQueryDetailsContent = () => {
  const router = useRouter();
  return (
    <div className="mx-auto flex flex-col space-y-8 rounded-[2.5rem] bg-company-gray p-12 w-full max-w-[1440px]">
      <div className="flex items-center space-x-8">
        <Link href={"/dashboard/images-query"}>
          <IoArrowBackCircleOutline className="text-company-blue" size={32} />
        </Link>
      </div>
      <div className="mx-16 grid grid-cols-3 gap-4 text-white">
        <div
          onClick={() =>
            router.push("/dashboard/images-query/details/123/images")
          }
          className="flex flex-col space-y-2 cursor-pointer"
        >
          <h3>Tomografía 1</h3>
          <Image
            src="https://via.placeholder.com/1920"
            width={1920}
            height={1920}
            alt="image"
            className="rounded-xl w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h3>Tomografía 2</h3>
          <Image
            src="https://via.placeholder.com/1920"
            width={1920}
            height={1920}
            alt="image"
            className="rounded-xl w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h3>Tomografía 3</h3>
          <Image
            src="https://via.placeholder.com/1920"
            width={1920}
            height={1920}
            alt="image"
            className="rounded-xl w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h3>Radiografía 1</h3>
          <Image
            src="https://via.placeholder.com/1920"
            width={1920}
            height={1920}
            alt="image"
            className="rounded-xl w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h3>Radiografía 2</h3>
          <Image
            src="https://via.placeholder.com/1920"
            width={1920}
            height={1920}
            alt="image"
            className="rounded-xl w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h3>Radiografía 3</h3>
          <Image
            src="https://via.placeholder.com/1920"
            width={1920}
            height={1920}
            alt="image"
            className="rounded-xl w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageQueryDetailsContent;
