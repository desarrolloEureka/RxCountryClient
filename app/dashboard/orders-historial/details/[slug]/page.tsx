"use client";
import DashboardHeader from "@/app/component/DashboardHeader";
import OrderDetailsContent from "@/app/component/OrderDetailsContent";
import DetailsHook from "../hook/DetailsHook";
import { Suspense } from "react";
import Spinner from "@/app/component/spinner/Spinner";

const OrderDetails = ({ params: { slug } }: { params: { slug: string } }) => {
    const {
        fromDetails,
        userRol,
        area,
        expandReceptionData,
        setExpandReceptionData,
        expandSpecialist,
        setExpandSpecialist,
        expandRx1,
        setExpandRx1,
        expandRx2,
        setExpandRx2,
        expandRx3,
        setExpandRx3,
        expandRx4,
        setExpandRx4,
        expandRx5,
        setExpandRx5,
        expandRx6,
        setExpandRx6,
        expandRx7,
        setExpandRx7,
        orderAndPatientData,
        detailStep,
        // setDetailStep,
        formatearFecha,
        getLastUserData,
        areasSelected,
    } = DetailsHook({ slug });

    return (
        <main className="relative min-h-screen w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 flex flex-col min-h-screen w-full py-16 px-5 lg:p-16 space-y-16">
                <DashboardHeader selectedMenuItem="orders-historial" />
                <OrderDetailsContent
                    fromDetails={fromDetails}
                    expandReceptionData={expandReceptionData}
                    userRol={userRol}
                    setExpandReceptionData={setExpandReceptionData}
                    expandSpecialist={expandSpecialist}
                    setExpandSpecialist={setExpandSpecialist}
                    expandRx1={expandRx1}
                    setExpandRx1={setExpandRx1}
                    expandRx2={expandRx2}
                    setExpandRx2={setExpandRx2}
                    expandRx3={expandRx3}
                    setExpandRx3={setExpandRx3}
                    expandRx4={expandRx4}
                    setExpandRx4={setExpandRx4}
                    expandRx5={expandRx5}
                    setExpandRx5={setExpandRx5}
                    expandRx6={expandRx6}
                    setExpandRx6={setExpandRx6}
                    expandRx7={expandRx7}
                    setExpandRx7={setExpandRx7}
                    orderAndPatientData={orderAndPatientData}
                    detailStep={detailStep}
                    // setDetailStep={setDetailStep}
                    area={area}
                    areasSelected={areasSelected}
                    formatearFecha={formatearFecha}
                    getLastUserData={getLastUserData}
                />
            </div>
        </main>
    );
};

export default function Page({
    params: { slug },
}: {
    params: { slug: string };
}) {
    return (
        <Suspense fallback={<Spinner background="bg-gray-image" />}>
            <OrderDetails
                params={{
                    slug,
                }}
            />
        </Suspense>
    );
}

// export default OrderDetails;
