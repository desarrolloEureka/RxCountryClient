import {
    deleteObject,
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
} from "firebase/storage";
import moment from "moment";
import {
    DownloadFileProps,
    uploadFileImageProps,
    uploadProfilePhotoProps
} from "../types/files";

const currentDate = moment().format("YYYY-MM-DD");
const currentYear = moment().year();

// Create a root reference
const storage = getStorage();

const storageRefProfilePhoto = (
    reference: string,
    folder: string,
    fileName: string,
) =>
    //Crea la referencia o ruta a guardar
    ref(
        storage,
        `Media/profilePhotos/${reference}/${folder}-${currentDate}/${fileName}`,
    );

export const uploadProfilePhoto = async ({
    folder,
    fileName,
    file,
    reference,
}: uploadProfilePhotoProps) => {
    const storageRef = storageRefProfilePhoto(reference, folder, fileName);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};

const storageRefFile = (
    patientId: string,
    fileName: string,
    idOrder: string,
    area: string,
) =>
    ref(
        storage,
        `Media/ODS_${currentYear}/${currentDate}/${idOrder}-${patientId}/${area}/${fileName}`,
    );

export const uploadFile = async ({
    folder: patientId,
    fileName,
    idOrder,
    file,
    area,
}: uploadFileImageProps) => {
    const storageRef = storageRefFile(patientId, fileName, idOrder, area);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
};

export const urlFile = async ({
    folder,
    fileName,
    reference,
}: DownloadFileProps) => {
    return getDownloadURL(storageRefProfilePhoto(reference, folder, fileName));
};

export const deleteUrlFile = async ({
    folder,
    fileName,
    reference,
}: DownloadFileProps) => {
    return deleteObject(storageRefProfilePhoto(reference, folder, fileName));
};
