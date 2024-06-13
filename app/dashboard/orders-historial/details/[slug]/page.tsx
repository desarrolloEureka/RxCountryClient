"use client";
import DashboardHeader from "@/app/component/DashboardHeader";
import OrderDetailsContent from "@/app/component/OrderDetailsContent";
import DetailsHook from "../hook/DetailsHook";

const OrderDetails = ({ params: { slug } }: { params: { slug: string } }) => {
    const {
        userRol,
        area,
        allAreas,
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
        selectedDiagnosis,
        setSelectedDiagnosis,
        selectedSuppliers,
        setSelectedSuppliers,
        orderAndPatientData,
        handleChecks,
        selectChangeHandlerSentTo,
        detailStep,
        setDetailStep,
        handleSendForm,
        commentChangeHandler,
        setDiagnosticImpressionComment,
        observationComment,
        diagnosticImpressionComment,
        areaSelected,
        setAreaSelected,
        backToOrder,
        backToDetail,
        fileName,
        handleFileChange,
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
                    selectedDiagnosis={selectedDiagnosis}
                    setSelectedDiagnosis={setSelectedDiagnosis}
                    selectedSuppliers={selectedSuppliers}
                    setSelectedSuppliers={setSelectedSuppliers}
                    orderAndPatientData={orderAndPatientData}
                    handleChecks={handleChecks}
                    selectChangeHandlerSentTo={selectChangeHandlerSentTo}
                    detailStep={detailStep}
                    setDetailStep={setDetailStep}
                    handleSendForm={handleSendForm}
                    commentChangeHandler={commentChangeHandler}
                    setDiagnosticImpressionComment={
                        setDiagnosticImpressionComment
                    }
                    allAreas={allAreas}
                    observationComment={observationComment}
                    diagnosticImpressionComment={diagnosticImpressionComment}
                    areaSelected={areaSelected}
                    setAreaSelected={setAreaSelected}
                    backToOrder={backToOrder}
                    backToDetail={backToDetail}
                    area={area}
                    fileName={fileName}
                    handleFileChange={handleFileChange}
                />
            </div>
        </main>
    );
};

export default OrderDetails;
