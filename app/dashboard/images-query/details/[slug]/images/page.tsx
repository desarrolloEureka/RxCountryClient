import DashboardFooter from "@/app/component/DashboardFooter";
import DashboardHeader from "@/app/component/DashboardHeader";
import ImagesGroup from "@/app/component/ImageQuery/ImagesGroup";

const ImageQueryDetails = ({ params }: { params: { slug: string } }) => {
  return (
    <main className="relative min-h-[93vh] w-full bg-gray-image bg-fixed bg-cover">
      <div className="bg-black bg-opacity-60 flex flex-col min-h-[93vh] w-full p-16 space-y-16">
        <DashboardHeader selectedMenuItem="images-query" />
        <ImagesGroup />
      </div>
      <DashboardFooter />
    </main>
  );
};

export default ImageQueryDetails;
