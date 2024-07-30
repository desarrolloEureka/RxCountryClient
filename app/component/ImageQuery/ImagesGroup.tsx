"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";

type Props = {
    orderAndPatientData: any;
    downloadImage: (e: any) => Promise<void>;
    linkRef: any;
};

const ImagesGroup = ({
    orderAndPatientData,
    downloadImage,
    linkRef,
}: Props) => {
    const [fileSrcSelected, setFileSrcSelected] = useState(
        "https://via.placeholder.com/1920",
    );
    const [idFileSelected, setIdFileSelected] = useState<number>(0);

    const [typoFile, setTypoFile] = useState<string>("image");

    useEffect(() => {
        orderAndPatientData &&
            setFileSrcSelected(orderAndPatientData?.orderImagesUrl[0]);
    }, [orderAndPatientData]);

    return (
        <div className="mx-auto flex rounded-[2.5rem] bg-company-gray w-full">
            <div className="flex flex-col items-center w-80 p-5 bg-[#5E5E5E] rounded-[2.5rem] space-y-4">
                <div className="flex items-center space-x-8">
                    <h2 className="text text-company-blue text-xl">Archivos</h2>
                </div>
                <div className="flex flex-col overflow-y-auto custom-scrollbar h-screen px-10 w-full">
                    {orderAndPatientData?.orderPDFUrl?.map(
                        (item: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center py-4 space-y-1 cursor-pointer"
                                    onClick={() => {
                                        setFileSrcSelected(item);
                                        setIdFileSelected(index);
                                        setTypoFile("pdf");
                                    }}
                                >
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
                                        {`PDF ${index + 1}`}
                                    </h3>
                                </div>
                            );
                        },
                    )}
                    {orderAndPatientData?.orderImagesUrl?.map(
                        (item: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center py-4 space-y-1 cursor-pointer"
                                    onClick={() => {
                                        setFileSrcSelected(item);
                                        setIdFileSelected(index);
                                        setTypoFile("image");
                                    }}
                                >
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

                    <div className="flex flex-col items-center space-y-2 cursor-pointer">
                        {orderAndPatientData?.urlWeTransfer && (
                            <Link
                                className="text-white flex flex-col justify-center items-center py-2 w-64"
                                target="_blank"
                                // href={"https://via.placeholder.com/1920"}
                                href={orderAndPatientData?.urlWeTransfer}
                            >
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
                            </Link>
                        )}
                    </div>
                    <div className="flex flex-col items-center space-y-2 cursor-pointer">
                        {orderAndPatientData?.urlDropbox && (
                            <Link
                                className="text-white flex flex-col justify-center items-center py-2 w-64"
                                target="_blank"
                                // href={"https://via.placeholder.com/1920"}
                                href={orderAndPatientData?.urlDropbox}
                            >
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
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-2 w-full p-12">
                <div className="overflow-auto custom-scrollbar">
                    <h3 className="text-white">Imagen {idFileSelected + 1}</h3>
                    {typoFile === "image" ? (
                        <Image
                            src={fileSrcSelected}
                            width={0}
                            height={0}
                            sizes="1920px"
                            style={{
                                width: "100%",
                                height: "auto",
                            }}
                            alt={"logo"}
                            placeholder="blur"
                            blurDataURL={fileSrcSelected}
                        />
                    ) : (
                        <div>
                            <iframe
                                src={fileSrcSelected}
                                width="100%"
                                height="1200px"
                                className=""
                            />
                        </div>
                    )}
                </div>
                <Link
                    className="mx-auto rounded-xl bg-gray-500 hover:bg-gray-400 text-white flex justify-center items-center py-2 w-64"
                    target="_blank"
                    href={fileSrcSelected}
                    download="download"
                    // href="https://via.placeholder.com/1920.png"
                    // ref={linkRef}
                    // onClick={downloadImage}
                >
                    Descargar
                </Link>
            </div>
        </div>
    );
};

export default ImagesGroup;
