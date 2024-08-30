"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { IoEye } from "react-icons/io5";
import PreviewOrderHook from "../dashboard/preview-order/hook/PreviewOrderHook";
import OrderPDF from "./OrderPDF";
import Spinner from "./spinner/Spinner";
import { IoMdDownload } from "react-icons/io";

const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    {
        ssr: false,
        loading: () => <Spinner background="bg-transparent" />,
    },
);

export default function PreviewOrder({
    params: { slug },
}: {
    params: { slug: string };
}) {
    const { orderData, formatearFecha, quadrant, optionsData } =
        PreviewOrderHook({ slug });

    if (!orderData) {
        return <Spinner background="bg-transparent" />;
    }

    return (
        <>
            <div className="flex justify-center items-center shadow-lg bg-black h-screen w-full max-w-screen">
                <PDFViewer
                    className="h-screen w-screen hidden lg:flex"
                    showToolbar={true}
                >
                    <OrderPDF
                        orderData={orderData}
                        formatearFecha={formatearFecha}
                        quadrant={quadrant}
                        optionsData={optionsData}
                    />
                </PDFViewer>
                <PDFDownloadLink
                    className="h-screen w-screen flex lg:hidden"
                    document={
                        <OrderPDF
                            orderData={orderData}
                            formatearFecha={formatearFecha}
                            quadrant={quadrant}
                            optionsData={optionsData}
                        />
                    }
                    fileName={`Orden_N${orderData?.uid}.pdf`}
                >
                    {({ blob, url, loading, error }) =>
                        loading ? (
                            <div className="flex justify-center items-center shadow-lg bg-black h-screen w-full max-w-screen">
                                <button
                                    disabled
                                    type="button"
                                    className="flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                                >
                                    <span>Cargando documento...</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center shadow-lg bg-black h-screen w-full max-w-screen">
                                <button
                                    type="button"
                                    className="flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                                >
                                    <IoMdDownload
                                        className="text-company-blue"
                                        size={24}
                                    />

                                    <span>Descargar PDF</span>
                                </button>
                            </div>
                        )
                    }
                </PDFDownloadLink>
            </div>
        </>
    );
}
