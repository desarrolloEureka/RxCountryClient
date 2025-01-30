"use client";
import { AreasSelector } from "@/app/types/areas";
import { PreviewFile } from "@/app/types/order";
import { RolesBd } from "@/app/types/roles";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { LuFilePlus2 } from "react-icons/lu";
import { RiCloseLine, RiDeleteBin6Line } from "react-icons/ri";
import SelectComponent from "../SelectComponent";
import InputFileUpload from "../UpLoadButton";

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
    setAreaSelected: (e: any) => void;
    selectChangeHandlerSentTo: (e: any) => void;
    areaSelected: any;
    handleSelectFile: (item: any, index: number, typeFile: string) => void;
    modelType: string;
    handleDeleteFile: (urlFile: string, typeFile: string) => void;
    handleSaveFile: (typeFile: string) => void;
    fileSrcSelected: string;
    idFileSelected: number;
    typeFile: string;
    dropBoxUrl: string;
    weTransferUrl: string;
    typeFileToUpLoad: string;
    allAreas: AreasSelector[];
    isFirstFile: boolean;
    isLastFile: boolean;
    nextImage: () => void;
    prevImage: () => void;
    downloadImagen: (urlFile: string) => void;
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
    typeFileToUpLoad,
    handleSelectFile,
    allAreas,
    areaSelected,
    setAreaSelected,
    selectChangeHandlerSentTo,
    isFirstFile,
    isLastFile,
    nextImage,
    prevImage,
    downloadImagen,
}: Props) => {
    return (
        <div className="mx-auto h-auto flex rounded-xl lg:rounded-[2.5rem] bg-company-gray w-full">
            <div className="flex flex-col items-center w-32 lg:w-80 p-2 lg:p-5 bg-[#5E5E5E] rounded-xl lg:rounded-[2.5rem] space-y-4">
                <div className="flex flex-col items-center space-y-3">
                    <h2 className="text text-company-blue text-base lg:text-xl">
                        Archivos
                    </h2>
                    {userRol?.uid !== "ShHQKRuKJfxHcV70XSvC" && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal();
                            }}
                            className="flex flex-row space-x-4 justify-center items-center p-2 w-auto mx-auto rounded-xl bg-gray-500 hover:bg-gray-400 text-white"
                        >
                            <LuFilePlus2 size={32} />
                            <span className="hidden lg:flex">Agregar</span>
                        </button>
                    )}
                </div>
                <div className="flex flex-auto flex-col overflow-y-auto custom-scrollbar h-96 px-0 lg:px-10 w-full text-xs lg:text-base">
                    {/* {orderAndPatientData?.orderImagesUrl &&
                        orderAndPatientData?.orderImagesUrl?.map(
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
                        )} */}
                    {orderAndPatientData?.orderImagesUrl &&
                        orderAndPatientData?.orderImagesUrl?.map(
                            (item: any, index: number) => {
                                console.log("-a-sdaas--d-s-d-a-d");
                                console.log(item);
                                if (item.includes(".pdf")){
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
                                }else if (item.includes(".stl")) {
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
                                }else if(item.includes(".ply")){
                                    return (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center py-4 space-y-1 cursor-pointer"
                                            onClick={() =>
                                                handleSelectFile(item, index, "STL")
                                            }
                                        >
                                            <Image
                                                src="/assets/PLYIcono.png"
                                                width={0}
                                                height={0}
                                                sizes="200px"
                                                style={{
                                                    width: "100%",
                                                    height: "auto",
                                                }}
                                                alt={"logo ply file"}
                                                placeholder="blur"
                                                blurDataURL={item}
                                            />
                                            <h3 className="text-white text-center">
                                                {`Archivo ${index + 1}`}
                                            </h3>
                                        </div>
                                    );
                                }else {
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
                                }                                 
                                
                            },
                        )}
                    {orderAndPatientData?.orderSTLFiles &&
                        orderAndPatientData?.orderSTLFiles?.map(
                            (item: any, index: number) => {
                                
                            },
                        )}
                    {orderAndPatientData?.urlWeTransfer && (
                        <div className="flex flex-col items-center cursor-pointer">
                            <Link
                                className="text-white flex flex-col justify-center items-center py-2 w-28 lg:w-64 space-y-2"
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
                        </div>
                    )}
                    {orderAndPatientData?.urlDropbox && (
                        <div className="flex flex-col items-center cursor-pointer">
                            <Link
                                className="text-white flex flex-col justify-center items-center py-2 w-28 lg:w-64 space-y-2"
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
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col space-y-4 w-full p-4 lg:p-12">
                <h2 className="text-company-orange text-sm lg:text-xl">
                    {orderAndPatientData &&
                    (
                        <>
                            {`Orden #${orderAndPatientData?.uid}`}
                            <br />
                            {`${orderAndPatientData?.name} ${orderAndPatientData?.lastName}`}
                        </>
                    )
                        }
                         {/*

                         `Orden #${orderAndPatientData?.uid} / Nombre: ${
                            orderAndPatientData?.name
                        } ${
                            orderAndPatientData?.lastName
                        }
                        `
                    - Tel: +${orderAndPatientData?.phone.substring(
                                0,
                                2,
                            )} ${orderAndPatientData?.phone.substring(
                                2,
                            )} - Email: ${orderAndPatientData?.email} - Edad: ${
                                orderAndPatientData?.age
                            }

                    /// si se solicitan de nuevo agregar antes de ´}

                    */}
                </h2>
               
                {typeFile === "images" || typeFile === "STL" ? (
                    <div className="flex flex-col justify-center items-center space-y-4 ">
                        <div className="flex flex-row items-center w-full justify-around">
                            <div className="">
                                {!isFirstFile && (
                                    <div
                                        onClick={() => {
                                            prevImage();
                                        }}
                                        className="text-company-blue text-center cursor-pointer p-3 rounded-full bg-gray-700 border border-company-blue hover:text-white hover:border-white"
                                    >
                                        <FaChevronLeft size={36} />
                                    </div>
                                )}
                            </div>

                            <div className="">
                                <h3 className="text-white text-center">
                                    {typeFile === "STL" ? "Archivo" : "Imagen"}{" "}
                                    {idFileSelected + 1}
                                </h3>
                                {fileSrcSelected.includes(".jpg") ? (
                                    <Link
                                        className="flex flex-1 items-center justify-center"
                                        href={fileSrcSelected}
                                        download="download"
                                        // target="_blank"
                                    >
                                        <Image
                                            src={fileSrcSelected}
                                            width={0}
                                            height={0}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            style={{
                                                width: "90%",
                                                height: "auto",
                                            }}
                                            alt={typeFile}
                                            placeholder="blur"
                                            blurDataURL={fileSrcSelected}
                                        />
                                    </Link>
                                ) : fileSrcSelected.includes(".stl")?(
                                    <div className="flex flex-1 items-center justify-center">
                                        <Image
                                        src="/assets/stl.png"
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
                                    
                                ):fileSrcSelected.includes(".ply")?(
                                    <div className="flex flex-1 items-center justify-center">
                                        <Image
                                        src="/assets/PLYIcono.png"
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
                                    ):fileSrcSelected.includes(".pdf")?(
                                        <div className="flex flex-1 items-center justify-center">
                                            <Image
                                            src="/assets/icons/PDF.svg"
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
                                        ):null
                                }
                            </div>

                            <div className="">
                                {!isLastFile && (
                                    <div
                                        onClick={() => {
                                            nextImage();
                                        }}
                                        className="text-company-blue text-center cursor-pointer p-3 rounded-full bg-gray-700 border border-company-blue hover:text-white hover:border-white"
                                    >
                                        <FaChevronRight size={36} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-4 h-[65vh] min-h-max">
                        <h3 className="text-white text-center">
                            Documento {idFileSelected + 1}
                        </h3>
                        <div className="flex flex-row items-center w-full justify-around">
                            <div className="px-4">
                                {!isFirstFile && (
                                    <div
                                        onClick={() => {
                                            prevImage();
                                        }}
                                        className="text-company-blue text-center cursor-pointer p-3 rounded-full border hover:bg-gray-700"
                                    >
                                        <FaChevronLeft size={36} />
                                    </div>
                                )}
                            </div>
                            <div className="h-[65vh] min-h-max w-full">
                                <iframe
                                    src={fileSrcSelected}
                                    width="100%"
                                    height="100%"
                                    className=""
                                />
                            </div>
                            <div className="px-4">
                                {!isLastFile && (
                                    <div
                                        onClick={() => {
                                            nextImage();
                                        }}
                                        className="text-company-blue text-center cursor-pointer p-3 rounded-full border hover:bg-gray-700"
                                    >
                                        <FaChevronRight size={36} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {fileSrcSelected !== "https://via.placeholder.com/1920" && (
                    <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0">
                        <button  
                            className="flex justify-center items-center py-2 w-48 xl:w-64 mx-auto rounded-xl bg-gray-500 hover:bg-gray-400 text-white"
                            //target="_blank"
                            onClick={() =>
                                downloadImagen(fileSrcSelected)
                            }
                            //href={fileSrcSelected}
                            //download="download"
                        >
                            <span>Descargar</span>
                        </button>

                        {userRol?.uid !== "ShHQKRuKJfxHcV70XSvC" && (
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
                        )}
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
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

                            <div className="my-4 flex items-center justify-center">
                                <InputFileUpload
                                    fileName={fileName}
                                    handleFileChange={handleFileChange}
                                    fileTypes=".jpg, .jpeg, .png, .pdf, .stl"
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
                                    {previewImages.map(
                                        (file: PreviewFile, index) => (
                                            <div
                                                key={index}
                                                className="flex flex-row items-center justify-center py-2"
                                            >
                                                <div className="flex flex-col items-center justify-center w-1/3">
                                                    <Image
                                                        src={
                                                            file.type?.includes(
                                                                "pdf",
                                                            )
                                                                ? "/assets/icons/PDF.svg"
                                                                : file.name?.includes(
                                                                      "stl",
                                                                  )
                                                                ? "/assets/stl.png"
                                                                : file.url
                                                        }
                                                        width={0}
                                                        height={0}
                                                        sizes="200px"
                                                        style={{
                                                            width: file.type?.includes(
                                                                "pdf",
                                                            )
                                                                ? "30%"
                                                                : file.name?.includes(
                                                                      "stl",
                                                                  )
                                                                ? "50%"
                                                                : "50%",
                                                            height: "auto",
                                                        }}
                                                        alt={file.name}
                                                        placeholder="blur"
                                                        blurDataURL={
                                                            typeFile === "pdf"
                                                                ? "/assets/icons/PDF.svg"
                                                                : typeFile ===
                                                                  "pdf"
                                                                ? "/assets/stl.png"
                                                                : file.url
                                                        }
                                                    />
                                                </div>
                                                <div className="flex flex-col items-center justify-center w-1/3 space-y-4">
                                                    <span>{file.name}</span>
                                                    {/* Modelos y Despacho respectivamente */}
                                                    {(userRol?.uid ===
                                                        "g9xGywTJG7WSJ5o1bTsH" ||
                                                        userRol?.uid ===
                                                            "9RZ9uhaiwMC7VcTyIzhl") &&
                                                        file.type?.includes(
                                                            "image",
                                                        ) && (
                                                            <div className="flex flex-col py-2 justify-center items-center">
                                                                <h1 className="text-company-orange text-sm">
                                                                    Tipo de
                                                                    Modelo:
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
                                                <div className="flex flex-col items-center justify-center w-1/3 space-y-4">
                                                    <button
                                                        type="button"
                                                        className="text-company-orange"
                                                        onClick={() => {
                                                            handleRemoveImage(
                                                                index,
                                                            );
                                                            setCurrentIndex(
                                                                index,
                                                            );
                                                        }}
                                                    >
                                                        <RiDeleteBin6Line
                                                            size={32}
                                                        />
                                                    </button>
                                                    {userRol?.uid ===
                                                        "9RZ9uhaiwMC7VcTyIzhl" && (
                                                        <div className="flex flex-col justify-center items-center">
                                                            <label className="text-company-orange text-base">
                                                                Área de destino:
                                                            </label>
                                                            <SelectComponent
                                                                options={allAreas.filter(
                                                                    (area) =>
                                                                        orderAndPatientData?.areaList
                                                                            ? orderAndPatientData?.areaList?.includes(
                                                                                  area.value,
                                                                              )
                                                                            : area,
                                                                )}
                                                                selectChangeHandler={(
                                                                    e,
                                                                ) => {
                                                                    selectChangeHandlerSentTo(
                                                                        e?.value,
                                                                    );
                                                                    setAreaSelected(
                                                                        e,
                                                                    );
                                                                }}
                                                                optionSelected={
                                                                    areaSelected
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            )}

                            <div className="flex flex-row space-x-4 justify-end px-6 border-t border-gray-500 pt-2">
                                {files.length > 0 && (
                                    <button
                                        type="button"
                                        className="flex flex-row items-center justify-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                                        onClick={() => {
                                            handleSaveFile(typeFileToUpLoad);
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
