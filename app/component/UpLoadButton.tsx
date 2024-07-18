import { FaFileCirclePlus } from "react-icons/fa6";
import { LuImagePlus } from "react-icons/lu";
import { FaRegFilePdf } from "react-icons/fa6";

export default function InputFileUpload({
    fileName,
    fileTypes = ".jpg, .jpeg, .png",
    handleFileChange,
}: {
    fileName?: string;
    handleFileChange?: (e: any) => void;
    fileTypes?: string;
}) {
    return (
        <div className="flex items-center justify-center text-center">
            <label
                htmlFor="urlImage"
                className="relative cursor-pointer bg-blue-500 text-white font-semibold rounded-md py-2 px-4 flex items-center space-x-2 h-16"
            >
                {/* {fileTypes === "application/pdf" ? (
                    <FaRegFilePdf size={35} />
                ) : (
                    <LuImagePlus size={45} />
                )} */}

                {fileName === "SUBIR ARCHIVO" && <FaFileCirclePlus size={45} />}
                <span>{fileName}</span>
                <input
                    multiple
                    id="urlImage"
                    name="urlImage"
                    type="file"
                    accept={fileTypes}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
}
