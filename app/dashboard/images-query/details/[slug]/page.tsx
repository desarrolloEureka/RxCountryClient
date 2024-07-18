"use client";
import DashboardFooter from "@/app/component/DashboardFooter";
import DashboardHeader from "@/app/component/DashboardHeader";
import ImagesGroup from "@/app/component/ImageQuery/ImagesGroup";
import ImageQueryDetailsContent from "@/app/component/ImageQueryDetailsContent";
import ImagesDetailsHook from "../hook/ImagesDetailsHook";

const ImageQueryDetails = ({
    params: { slug },
}: {
    params: { slug: string };
}) => {
    const { orderAndPatientData, downloadImage, linkRef } = ImagesDetailsHook({
        slug,
    });
    return (
        <main className="w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 min-h-[93vh] w-full p-16">
                {/* <DashboardHeader selectedMenuItem="images-query" /> */}
                {/* <ImageQueryDetailsContent /> */}
                <ImagesGroup
                    orderAndPatientData={orderAndPatientData}
                    downloadImage={downloadImage}
                    linkRef={linkRef}
                />
            </div>
        </main>
    );
};

export default ImageQueryDetails;
