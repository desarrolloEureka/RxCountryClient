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
    await uploadBytes(storageRefProfile(reference, folder, fileName), file);
    
    return await getDownloadURL(storageRefProfile(reference, folder, fileName));
};

const storageRefImage = (
    reference: string,
    folder: string,
    fileName: string,
) => ref(storage, `${reference}Images/${folder}/${fileName}`);

export const uploadFileImage = async ({
    folder,
    fileName,
    file,
    reference,
}: UploadFileProps) => {
    // 'file' comes from the Blob or File API
    await uploadBytes(storageRefImage(reference, folder, fileName), file);
    
    return await getDownloadURL(storageRefImage(reference, folder, fileName));
};

export const urlFile = async ({
    folder,
    fileName,
    reference,
}: DownloadFileProps) => {
    return getDownloadURL(storageRefProfile(reference, folder, fileName));
};

export const deleteUrlFile = async ({
    folder,
    fileName,
    reference,
}: DownloadFileProps) => {
    return deleteObject(storageRefProfile(reference, folder, fileName));
};
