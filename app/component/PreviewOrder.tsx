"use client";

import dynamic from "next/dynamic";
import OrderPDF from "./OrderPDF";
import Spinner from "./spinner/Spinner";
import PreviewOrderHook from "../dashboard/preview-order/hook/PreviewOrderHook";

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
        <div className="flex justify-center items-center shadow-lg bg-black h-screen w-full max-w-screen">
            <PDFViewer className="h-screen w-screen" showToolbar={true}>
                <OrderPDF
                    orderData={orderData}
                    formatearFecha={formatearFecha}
                    quadrant={quadrant}
                    optionsData={optionsData}
                />
            </PDFViewer>
        </div>
    );
}
