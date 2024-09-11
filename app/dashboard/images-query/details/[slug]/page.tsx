"use client";
import ImagesGroup from "@/app/component/ImageQuery/ImagesGroup";
import Spinner from "@/app/component/spinner/Spinner";
import ImagesDetailsHook from "../hook/ImagesDetailsHook";

const ImageQueryDetails = ({
    params: { slug },
}: {
    params: { slug: string };
}) => {
    const {
        orderAndPatientData,
        handleDeleteFile,
        handleSaveFile,
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
        setCurrentIndex,
        fileSrcSelected,
        idFileSelected,
        typeFile,
        dropBoxUrl,
        weTransferUrl,
        handleSelectFile,
        typeFileToUpLoad,
        allAreas,
        areaSelected,
        setAreaSelected,
        selectChangeHandlerSentTo,
        user,
    } = ImagesDetailsHook({
        slug,
    });
    if (!user) {
        return <Spinner />;
    }
    return (
        <main className="w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 min-h-screen w-full pb-10 pt-5 px-5 lg:p-16">
                <ImagesGroup
                    orderAndPatientData={orderAndPatientData}
                    isModalOpen={isModalOpen}
                    previewImages={previewImages}
                    handleFileChange={handleFileChange}
                    handleRemoveImage={handleRemoveImage}
                    openModal={openModal}
                    closeModal={closeModal}
                    fileName={fileName}
                    files={files}
                    userRol={userRol}
                    handleModelType={handleModelType}
                    modelType={modelType}
                    handleDeleteFile={handleDeleteFile}
                    handleSaveFile={handleSaveFile}
                    setCurrentIndex={setCurrentIndex}
                    handleSelectFile={handleSelectFile}
                    fileSrcSelected={fileSrcSelected}
                    idFileSelected={idFileSelected}
                    typeFile={typeFile}
                    dropBoxUrl={dropBoxUrl}
                    weTransferUrl={weTransferUrl}
                    typeFileToUpLoad={typeFileToUpLoad}
                    allAreas={allAreas}
                    areaSelected={areaSelected}
                    setAreaSelected={setAreaSelected}
                    selectChangeHandlerSentTo={selectChangeHandlerSentTo}
                />
            </div>
        </main>
    );
};

export default ImageQueryDetails;
