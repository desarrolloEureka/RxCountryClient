import Image from "next/image";
import Link from "next/link";

const DashboardFooter = () => {
  return (
    <footer className="flex justify-between items-center w-full p-4 bg-company-blue">
      <Link href="" className="underline text-white text-sm">
        Acerca de RxCountry
      </Link>
      <Link href="" className="underline text-white text-sm">
        www.Rxcontry/eurekadreams.com
      </Link>
      <Link href="" className="underline text-white text-sm">
        <Image src={"/assets/logo.png"} width={100} height={24} alt={"logo"} />
      </Link>
    </footer>
  );
};

export default DashboardFooter;
