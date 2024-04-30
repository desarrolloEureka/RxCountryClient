import Image from "next/image";
import Link from "next/link";

const DashboardFooter = () => {
    return (
        <footer className="flex justify-between items-center w-full p-4 md:p-2 bg-company-blue">
            <Link href="" className="underline text-white text-sm">
                Acerca de RxCountry
            </Link>
            <Link href="" className="underline text-white text-sm">
                www.Rxcontry/eurekadreams.com
            </Link>
            <Link href="" className="underline text-white text-sm">
                <Image
                    src={"/assets/logo.png"}
                    width={0}
                    height={0}
                    sizes="100px"
                    style={{ width: "100%", height: "auto" }}
                    alt={"logo"}
                    placeholder="blur"
                    blurDataURL={"/assets/logo.png"}
                />
            </Link>
        </footer>
    );
};

export default DashboardFooter;
