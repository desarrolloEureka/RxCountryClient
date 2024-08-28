"use client";
import { PreviewFile } from "@/app/types/order";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { LuDownload, LuFilePlus2 } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import InputFileUpload from "../UpLoadButton";
import { RiCloseLine } from "react-icons/ri";
import { IoIosSave } from "react-icons/io";
import { RolesBd } from "@/app/types/roles";

type Props = {
    orderAndPatientData: any;
    isModalOpen: boolean;
    previewImages: PreviewFile[];
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleRemoveImage: (indexToRemove: number) => void;
    openModal: () => void;
    closeModal: () => void;
    fileName: string;
    files: File[];
    userRol: RolesBd;
    handleModelType: (e: any) => void;
    setCurrentIndex: (e: any) => void;
    handleSelectFile: (item: any, index: number, typeFile: string) => void;
    modelType: string;
    handleDeleteFile: (urlFile: string, typeFile: string) => void;
    handleSaveFile: (typeFile: string) => void;
    fileSrcSelected: string;
    idFileSelected: number;
    typeFile: string;
    dropBoxUrl: string;
    weTransferUrl: string;
};

const ImagesGroup = ({
    orderAndPatientData,
    isModalOpen,
    previewImages,
    handleFileChange,
    handleRemoveImage,
    openModal,
    closeModal,
    fileName,
    files,
    userRol,
    handleModelType,
    modelType,
    handleDeleteFile,
    handleSaveFile,
    setCurrentIndex,
    fileSrcSelected,
    idFileSelected,
    typeFile,
    dropBoxUrl,
    weTransferUrl,
    handleSelectFile,
}: Props) => {
    return (
        <div className="mx-auto flex rounded-[2.5rem] bg-company-gray w-full">
            <div className="flex flex-col items-center w-80 p-5 bg-[#5E5E5E] rounded-[2.5rem] space-y-4">
                <div className="flex flex-col items-center space-y-3">
                    <h2 className="text text-company-blue text-xl">Archivos</h2>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            openModal();
                        }}
                        className="flex flex-row space-x-4 justify-center items-center p-2 w-auto mx-auto rounded-xl bg-gray-500 hover:bg-gray-400 text-white"
                    >
                        <LuFilePlus2 size={32} />
                        <span>Agregar</span>
                    </button>
                </div>
                <div className="flex flex-auto flex-col overflow-y-auto custom-scrollbar h-screen max-h-min px-10 w-full">
                    {orderAndPatientData?.orderPDFUrl &&
                        orderAndPatientData?.orderPDFUrl?.map(
                            (item: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center py-4 space-y-1 cursor-pointer"
                                        onClick={() =>
                                            handleSelectFile(item, index, "pdf")
                                        }
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
                                            blurDataURL={
                                                "/assets/icons/PDF.svg"
                                            }
                                        />
                                        <h3 className="text-white text-center">
                                            {`PDF ${index + 1}`}
                                        </h3>
                                    </div>
                                );
                            },
                        )}
                    {orderAndPatientData?.orderImagesUrl &&
                        orderAndPatientData?.orderImagesUrl?.map(
                            (item: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center py-4 space-y-1 cursor-pointer"
                                        onClick={() =>
                                            handleSelectFile(
                                                item,
                                                index,
                                                "images",
                                            )
                                        }
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
                    {orderAndPatientData?.orderSTLFiles &&
                        orderAndPatientData?.orderSTLFiles?.map(
                            (item: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center py-4 space-y-1 cursor-pointer"
                                        onClick={() =>
                                            handleSelectFile(item, index, "STL")
                                        }
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
            <div className="flex flex-col space-y-4 w-full p-12 max-h-min">
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
                    {typeFile === "images" || typeFile === "STL" ? (
                        <div className="flex flex-col justify-center items-center space-y-4">
                            <h3 className="text-white text-center">
                                {typeFile === "STL" ? "Archivo" : "Imagen"}{" "}
                                {idFileSelected + 1}
                            </h3>
                            <Image
                                src={
                                    typeFile === "STL"
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
                {fileSrcSelected !== "https://via.placeholder.com/1920" && (
                    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
                        <Link
                            className="flex flex-row space-x-4 justify-center items-center py-2 w-48 xl:w-64 mx-auto rounded-xl bg-gray-500 hover:bg-gray-400 text-white "
                            target="_blank"
                            href={fileSrcSelected}
                            download="download"
                        >
                            <LuDownload size={23} />
                            <span>Descargar</span>
                        </Link>
                        <button
                            type="button"
                            onClick={() =>
                                handleDeleteFile(fileSrcSelected, typeFile)
                            }
                            className="flex flex-row space-x-4 justify-center items-center py-2 w-48 xl:w-64 mx-auto rounded-xl bg-gray-500 hover:bg-gray-400 text-white"
                        >
                            <RiDeleteBin6Line size={20} />
                            <span>Eliminar</span>
                        </button>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="w-3/4 max-w-3xl mx-auto py-6 rounded-lg shadow-lg bg-[#1d1d1d]">
                            <div className="flex justify-between items-center border-b border-gray-500 pb-2 px-6">
                                <h2 className="text-xl font-bold">
                                    Actualizar Archivos
                                </h2>
                                <button
                                    type="button"
                                    className="text-white hover:text-blue-400"
                                    onClick={closeModal}
                                >
                                    <RiCloseLine size={32} />
                                </button>
                            </div>

                            <div className="my-4">
                                <InputFileUpload
                                    fileName={fileName}
                                    handleFileChange={handleFileChange}
                                    fileTypes="image/*"
                                />
                            </div>

                            {previewImages.length > 0 && (
                                <div className="flex flex-col p-8">
                                    <div className="flex flex-row border-b-2">
                                        <div className="w-1/3 text-center">
                                            Miniatura
                                        </div>
                                        <div className="w-1/3 text-center">
                                            Nombre del archivo
                                        </div>
                                        <div className="w-1/3 text-center">
                                            Acciones
                                        </div>
                                    </div>
                                    {previewImages.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-row items-center justify-center py-2"
                                        >
                                            <div className="flex flex-col items-center justify-center w-1/3">
                                                <Image
                                                    src={file.url}
                                                    width={0}
                                                    height={0}
                                                    sizes="200px"
                                                    style={{
                                                        width: "50%",
                                                        height: "auto",
                                                    }}
                                                    alt={file.name}
                                                    placeholder="blur"
                                                    blurDataURL={file.url}
                                                />
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-1/3">
                                                <span>{file.name}</span>
                                                {userRol?.uid ===
                                                    "g9xGywTJG7WSJ5o1bTsH" && (
                                                    <div className="flex flex-col py-2 justify-center items-center">
                                                        <h1 className="text-company-orange text-sm">
                                                            Tipo de Modelo:
                                                        </h1>
                                                        <div className="flex flex-row space-x-2 justify-around w-full">
                                                            <div className="flex space-x-1 justify-center items-center text-white">
                                                                <input
                                                                    id="radio-1"
                                                                    type="radio"
                                                                    value="E"
                                                                    checked={
                                                                        modelType ===
                                                                        "E"
                                                                    }
                                                                    onChange={
                                                                        handleModelType
                                                                    }
                                                                    className="w-4 h-4 border-2"
                                                                />
                                                                <label htmlFor="radio-1">
                                                                    Estudio
                                                                </label>
                                                            </div>
                                                            <div className="flex space-x-1 justify-center items-center text-white">
                                                                <input
                                                                    id="radio-2"
                                                                    type="radio"
                                                                    value="T"
                                                                    checked={
                                                                        modelType ===
                                                                        "T"
                                                                    }
                                                                    onChange={
                                                                        handleModelType
                                                                    }
                                                                    className="w-4 h-4 border-2"
                                                                />
                                                                <label htmlFor="radio-2">
                                                                    Trabajo
                                                                </label>
                                                            </div>
                                                            <div className="flex space-x-1 justify-center items-center text-white">
                                                                <input
                                                                    id="radio-3"
                                                                    type="radio"
                                                                    value="C"
                                                                    checked={
                                                                        modelType ===
                                                                        "C"
                                                                    }
                                                                    onChange={
                                                                        handleModelType
                                                                    }
                                                                    className="w-4 h-4 border-0"
                                                                />
                                                                <label htmlFor="radio-3">
                                                                    Copia
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-center w-1/3">
                                                <button
                                                    type="button"
                                                    className="text-company-orange"
                                                    onClick={() => {
                                                        handleRemoveImage(
                                                            index,
                                                        );
                                                        setCurrentIndex(index);
                                                    }}
                                                >
                                                    <RiDeleteBin6Line
                                                        size={32}
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="flex flex-row space-x-4 justify-end px-6 border-t border-gray-500 pt-2">
                                {files.length > 0 && (
                                    <button
                                        type="button"
                                        className="flex flex-row items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                                        onClick={() => {
                                            handleSaveFile(typeFile);
                                        }}
                                    >
                                        <IoIosSave />
                                        <span>Guardar</span>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                    onClick={closeModal}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagesGroup;
