import DashboardFooter from "@/app/component/DashboardFooter";
import DashboardHeader from "@/app/component/DashboardHeader";
import ImageQueryDetailsContent from "@/app/component/ImageQueryDetailsContent";

const ImageQueryDetails = ({ params }: { params: { slug: string } }) => {
    return (
        <main className="relative min-h-[93vh] w-full bg-gray-image bg-fixed bg-cover">
            <div className="bg-black bg-opacity-60 flex flex-col min-h-[93vh] w-full p-16 space-y-16">
                <DashboardHeader selectedMenuItem="images-query" />
                <ImageQueryDetailsContent />
            </div>
        </main>
    );
};

export default ImageQueryDetails;
