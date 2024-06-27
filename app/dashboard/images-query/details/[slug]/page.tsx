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
    const { orderAndPatientData } = ImagesDetailsHook({ slug });
    return (
        <main className="relative min-h-[93vh] w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 flex flex-col min-h-[93vh] w-full p-16 space-y-16">
                <DashboardHeader selectedMenuItem="images-query" />
                {/* <ImageQueryDetailsContent /> */}
                <ImagesGroup orderAndPatientData={orderAndPatientData} />
            </div>
        </main>
    );
};

export default ImageQueryDetails;
