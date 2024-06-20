"use client";
import DashboardHeader from "@/app/component/DashboardHeader";
import OrderDetailsContent from "@/app/component/OrderDetailsContent";
import DetailsHook from "../hook/DetailsHook";

const OrderDetails = ({ params: { slug } }: { params: { slug: string } }) => {
    const {
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
        orderAndPatientData,
        detailStep,
        // setDetailStep,
        formatearFecha,
        getLastUserData,
    } = DetailsHook({ slug });

    return (
        <main className="relative min-h-screen w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 flex flex-col min-h-screen w-full p-16 space-y-16">
                <DashboardHeader selectedMenuItem="orders-historial" />
                <OrderDetailsContent
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
                    orderAndPatientData={orderAndPatientData}
                    detailStep={detailStep}
                    // setDetailStep={setDetailStep}
                    area={area}
                    formatearFecha={formatearFecha}
                    getLastUserData={getLastUserData}
                />
            </div>
        </main>
    );
};

export default OrderDetails;
