"use client";

import PDFViewer from "@/app/component/PDFViewer";
import { PreviewOrderProps } from "@/app/types/order";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdPictureAsPdf } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";

export default function PreviewOrder({
    // backToDetail,
    // backToOrder,
    // isEdit,
    // orderId,
}: PreviewOrderProps) {
    const [urlPDF, setUrlPDF] = useState<string>(
        "/assets/documents/RXOrdenFinal.pdf",
    );

    const router = useRouter();

    return (
        <div className="flex flex-col shadow-lg bg-black w-full max-w-screen mx-auto relative">
            {/* <div className="flex justify-between items-center w-full p-8">
                <div className="flex items-center space-x-8">
                    <button
                        onClick={() => {
                            // backToDetail !== undefined
                            //     ? backToDetail()
                            //     :
                            backToOrder();
                        }}
                    >
                        <IoArrowBackCircleOutline
                            className="text-company-blue"
                            size={32}
                        />
                    </button>
                </div>
            </div> */}
            <div className="flex flex-col mb-20 mx-20">
                <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col space-y-4 p-4">
                        <PDFViewer fileUrl={urlPDF} />
                        {/* {isEdit && (
                            <>
                                <div className="grid grid-cols-2 xl:grid-cols-2">
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={() => {
                                                router.replace(
                                                    `/dashboard/orders-historial/edit-order/${orderId}`,
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
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}
