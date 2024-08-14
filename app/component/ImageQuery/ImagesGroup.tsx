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

    const dropBoxUrl: string = orderAndPatientData?.urlDropbox as string;
    const weTransferUrl: string = orderAndPatientData?.urlWeTransfer as string;

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
                <div className="flex flex-auto flex-col overflow-y-auto custom-scrollbar h-screen max-h-min px-10 w-full">
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
                    {orderAndPatientData?.orderSTLFiles?.map(
                        (item: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-col items-center py-4 space-y-1 cursor-pointer"
                                    onClick={() => {
                                        setFileSrcSelected(item);
                                        setIdFileSelected(index);
                                        setTypoFile("STL");
                                    }}
                                >
                                    <Image
                                        src="/assets/stl.png"
                                        width={0}
                                        height={0}
                                        sizes="200px"
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                        alt={"logo stl file"}
                                        placeholder="blur"
                                        blurDataURL={item}
                                    />
                                    <h3 className="text-white text-center">
                                        {`Archivo ${index + 1}`}
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
                                href={
                                    weTransferUrl.includes("https://") ||
                                    weTransferUrl.includes("http://")
                                        ? weTransferUrl
                                        : `https://${weTransferUrl}`
                                }
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
                                href={
                                    dropBoxUrl.includes("https://") ||
                                    dropBoxUrl.includes("http://")
                                        ? dropBoxUrl
                                        : `https://${dropBoxUrl}`
                                }
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
            <div className="flex flex-col space-y-2 w-full p-12 max-h-min">
                <h2 className="text-company-orange text-xl">
                    {orderAndPatientData &&
                        `Orden #${orderAndPatientData?.uid} / Nombre: ${
                            orderAndPatientData?.name
                        } ${
                            orderAndPatientData?.lastName
                        } - Tel: +${orderAndPatientData?.phone.substring(
                            0,
                            2,
                        )} ${orderAndPatientData?.phone.substring(
                            2,
                        )} - Email: ${orderAndPatientData?.email} - Edad: ${
                            orderAndPatientData?.age
                        }`}
                </h2>
                <div className="overflow-auto custom-scrollbar max-h-min">
                    {typoFile === "image" || typoFile === "STL" ? (
                        <div className="flex flex-col justify-center items-center space-y-4">
                            <h3 className="text-white text-center">
                                {typoFile === "STL" ? "Archivo": "Imagen"}  {idFileSelected + 1}
                            </h3>
                            <Image
                                src={
                                    typoFile === "STL"
                                        ? "/assets/stl.png"
                                        : fileSrcSelected
                                }
                                width={0}
                                height={0}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{
                                    width: "50%",
                                    height: "auto",
                                }}
                                alt={"logo"}
                                placeholder="blur"
                                blurDataURL={fileSrcSelected}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col justify-center items-center space-y-4 h-screen max-h-min">
                            <h3 className="text-white text-center">
                                Documento {idFileSelected + 1}
                            </h3>
                            <iframe
                                src={fileSrcSelected}
                                width="100%"
                                height="100%"
                                className=""
                            />
                        </div>
                    )}
                </div>
                <Link
                    className="mx-auto rounded-xl bg-gray-500 hover:bg-gray-400 text-white flex justify-center items-center py-2 w-40 lg:w-64"
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
