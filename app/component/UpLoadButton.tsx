import { FaFileCirclePlus } from "react-icons/fa6";

export default function InputFileUpload({
    fileName,
    fileTypes = ".jpg, .jpeg, .png, .pdf, .stl, .ply",
    handleFileChange,
    multiple,
}: {
    fileName?: string;
    handleFileChange?: (e: any) => void;
    fileTypes?: string;
    multiple?: boolean;
}) {
    return (
        <div className="flex items-center justify-center text-center">
            <label
                htmlFor="urlImage"
                // className="relative cursor-pointer bg-blue-500 text-white font-semibold rounded-md py-2 px-4 flex items-center space-x-2 h-16"
                className="relative flex items-center w-full bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
            >
                {/* {fileTypes === "application/pdf" ? (
                    <FaRegFilePdf size={35} />
                ) : (
                    <LuImagePlus size={45} />
                )} */}

                {fileName === "Subir Archivo" && <FaFileCirclePlus size={26} />}
                <span className="text-xs lg:text-base">{fileName}</span>
                <input
                    multiple={multiple}
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
