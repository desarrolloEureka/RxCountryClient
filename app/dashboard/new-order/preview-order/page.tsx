"use client";
import DashboardHeader from "@/app/component/DashboardHeader";
import PDFViewer from "@/app/component/PDFViewer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdPictureAsPdf } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";

export interface IPreviewOrderProps {}

export default function PreviewOrder(props: IPreviewOrderProps) {
    const [urlPDF, setUrlPDF] = useState<string>(
        "/assets/documents/RXOrdenFinal.pdf",
    );

    //*Aquí para cambiar de vista de edición
    const router = useRouter();
    const [isEdit, setIsEdit] = useState(true);

    return (
        <main className="relative min-h-screen w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 flex flex-col w-full min-h-screen p-16 space-y-16">
                <DashboardHeader selectedMenuItem="create-order" />
                <div className="flex flex-col rounded-3xl shadow-lg bg-black bg-opacity-30 w-full max-w-[1440px] mx-auto relative">
                    <div className="flex justify-between items-center w-full p-8">
                        <div className="flex items-center space-x-8">
                            <Link href={"/dashboard/images-query"}>
                                <IoArrowBackCircleOutline
                                    className="text-company-blue"
                                    size={32}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col mx-20">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="flex flex-col space-y-4 p-4">
                                <PDFViewer fileUrl={urlPDF} />
                                {isEdit && (
                                    <>
                                        <div className="grid grid-cols-2 xl:grid-cols-2">
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => {
                                                        router.replace(
                                                            "/dashboard/new-order",
                                                        );
                                                    }}
                                                    className="w-48 flex items-center justify-center bg-gray-800 hover:bg-gray-700 shadow-md space-x-2 px-1 py-2 border border-company-blue rounded-xl text-company-blue hover:text-white"
                                                >
                                                    <RiEditBoxFill size={24} />
                                                    <span>Editar Orden</span>
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-center">
                                                <button
                                                    onClick={() => {}}
                                                    className="w-48 flex items-center justify-center bg-gray-800 hover:bg-gray-700 shadow-md space-x-2 px-1 py-2 border border-company-blue rounded-xl text-company-blue hover:text-white"
                                                >
                                                    <MdPictureAsPdf size={24} />
                                                    <span>Descargar PDF</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
