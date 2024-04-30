import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { DownloadFileProps, UploadFileProps } from "../types/files";

// Create a root reference
const storage = getStorage();

const storageRefProfile = (
    reference: string,
    folder: string,
    fileName: string,
) => ref(storage, `${reference}Photos/${folder}/${fileName}`);

export const uploadFile = async ({
    folder,
    fileName,
    file,
    reference,
}: UploadFileProps) => {
    // 'file' comes from the Blob or File API
    return uploadBytes(storageRefProfile(reference, folder, fileName), file);
};

export const urlFile = async ({ folder, fileName, reference }: DownloadFileProps) => {
    return getDownloadURL(storageRefProfile(reference, folder, fileName));
};

export const deleteUrlFile = async ({
    folder,
    fileName,
    reference,
}: DownloadFileProps) => {
    return deleteObject(storageRefProfile(reference, folder, fileName));
};
