"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

type Props = {
    orderAndPatientData: any;
};

const ImagesGroup = ({ orderAndPatientData }: Props) => {
    const [imageSelected, setImageSelected] = useState(
        "https://via.placeholder.com/1920",
    );
    const [imageIdSelected, setImageIdSelected] = useState<number>(0);

    useEffect(() => {
        orderAndPatientData &&
            setImageSelected(orderAndPatientData?.orderImagesUrl[0]);
    }, [orderAndPatientData]);

    return (
        <div className="mx-auto flex rounded-[2.5rem] bg-company-gray w-full max-w-[1440px]">
            <div className="flex flex-col items-center w-72 p-12 space-y-8 bg-[#5E5E5E] rounded-[2.5rem]">
                <div className="flex items-center space-x-8">
                    <Link href={"/dashboard/images-query"}>
                        <IoArrowBackCircleOutline
                            className="text-company-blue"
                            size={32}
                        />
                    </Link>
                    <h2 className="text text-company-blue text-xl">Imágenes</h2>
                </div>
                <div className="flex flex-col space-y-4 overflow-auto h-full">
                    <div className="flex flex-col items-center space-y-2 cursor-pointer">
                        {/* <Image
                            src="/assets/icons/PDF.svg"
                            width={1920}
                            height={1920}
                            alt="image"
                            className="rounded-xl w-full"
                        /> */}
                        <Image
                            src="/assets/icons/PDF.svg"
                            width={0}
                            height={0}
                            sizes="500px"
                            style={{
                                width: "60%",
                                height: "auto",
                            }}
                            alt={"logo"}
                            placeholder="blur"
                            blurDataURL={"/assets/icons/PDF.svg"}
                        />
                        <h3 className="text-white text-center">
                            Informe de radiografía
                        </h3>
                    </div>
                    {orderAndPatientData?.orderImagesUrl?.map(
                        (item: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center space-y-2 cursor-pointer"
                                    onClick={() => {
                                        setImageSelected(item);
                                        setImageIdSelected(index);
                                    }}
                                >
                                    {/* <Image
                                        // src="https://via.placeholder.com/1920"
                                        src={item}
                                        width={1920}
                                        height={1920}
                                        alt="image"
                                        className="rounded-xl w-full"
                                    /> */}
                                    <Image
                                        src={item}
                                        width={0}
                                        height={0}
                                        sizes="200px"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        alt={"logo"}
                                        placeholder="blur"
                                        blurDataURL={item}
                                    />
                                    <h3 className="text-white text-center">
                                        {`Imagen ${index + 1}`}
                                    </h3>
                                </div>
                            );
                        },
                    )}

                    {/* <div className="flex flex-col items-center space-y-2 cursor-pointer">
                        <Image
                            src="https://via.placeholder.com/1920"
                            width={0}
                            height={0}
                            sizes="1920px"
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                            alt={"logo"}
                            placeholder="blur"
                            blurDataURL={"https://via.placeholder.com/1920"}
                        />
                        <h3 className="text-white text-center">Imagen 2</h3>
                    </div> */}

                    <div className="flex flex-col items-center space-y-2 cursor-pointer">
                        {/* <Image
                            src="/assets/icons/wetranfer.svg"
                            width={64}
                            height={64}
                            alt="image"
                            className="rounded-xl"
                        /> */}
                        <Image
                            src="/assets/icons/wetranfer.svg"
                            width={0}
                            height={0}
                            sizes="500px"
                            style={{
                                width: "50%",
                                height: "auto",
                            }}
                            alt={"logo"}
                            placeholder="blur"
                            blurDataURL={"/assets/icons/wetranfer.svg"}
                        />
                        <h3 className="text-white text-center">
                            Link: WeTransfer
                        </h3>
                    </div>
                    <div className="flex flex-col items-center space-y-2 cursor-pointer">
                        {/* <Image
                            src="/assets/icons/enlace.svg"
                            width={64}
                            height={64}
                            alt="image"
                            className="rounded-xl"
                        /> */}
                        <Image
                            src="/assets/icons/enlace.svg"
                            width={0}
                            height={0}
                            sizes="500px"
                            style={{
                                width: "50%",
                                height: "auto",
                            }}
                            alt={"logo"}
                            placeholder="blur"
                            blurDataURL={"/assets/icons/enlace.svg"}
                        />
                        <h3 className="text-white text-center">Link</h3>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-8 w-full p-12">
                <h3 className="text-white">Imagen {imageIdSelected + 1}</h3>
                {/* <Image
                    // src="https://via.placeholder.com/1920"
                    src={imageSelected}
                    width={1920}
                    height={1920}
                    alt="image"
                    className="rounded-xl w-full"
                /> */}
                <Image
                    src={imageSelected}
                    width={0}
                    height={0}
                    sizes="1920px"
                    style={{
                        width: "100%",
                        height: "auto",
                    }}
                    alt={"logo"}
                    placeholder="blur"
                    blurDataURL={imageSelected}
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
