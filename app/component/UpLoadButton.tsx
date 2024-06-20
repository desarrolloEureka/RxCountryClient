import { AiFillFileAdd } from "react-icons/ai";

export default function InputFileUpload({
    fileName,
    handleFileChange,
}: {
    fileName?: string;
    handleFileChange?: (e: any) => void;
}) {
    return (
        <div className="flex items-center justify-center">
            <label
                htmlFor="urlImage"
                className="relative cursor-pointer bg-blue-500 text-white font-semibold rounded-md py-2 px-4 flex items-center space-x-2"
            >
                <AiFillFileAdd size={45} />
                <span>{fileName}</span>
                <input
                    id="urlImage"
                    name="urlImage"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
}
