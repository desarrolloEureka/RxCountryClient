import { db } from "@/shared/firebase/firebase";
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { AllRefPropsFirebase, RefPropsFirebase } from "../types/userFirebase";
import moment from "moment";
import { AreasBd, AreasSelector } from "../types/areas";

const currentDate = moment().format();

const allRef = ({ ref }: AllRefPropsFirebase) => collection(db, ref);

const docRef = ({ ref, collection }: RefPropsFirebase) =>
    doc(db, ref, collection);

export const getAllOptions = async (ref?: string) => {
    const querySnapshot = await getDocs(allRef({ ref }));
    let allOptions = {};

    if (!querySnapshot.empty) {
        allOptions = querySnapshot.docs.reduce((acc, doc) => {
            const dataResult = doc.data();
            return Object.assign(acc, dataResult);
        }, {});
    }

    return allOptions;
};

export const getAllDocumentsFb = async (ref: string) => {
    const dataResult: any[] = [];
    const querySnapshot = await getDocs(allRef({ ref }));
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            dataResult.push(data);
        });
    }
    return dataResult;
};

export const getAllAreasOptions = async () => {
    const dataResult: AreasSelector[] = [];
    const querySnapshot = await getDocs(allRef({ ref: "areas" }));
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data() as AreasBd;
            const dataSelector = {
                value: data.uid,
                label: data.name,
                campus: data.availableCampus,
            };
            dataResult.push(dataSelector);
        });
    }
    return dataResult;
};

export const getAllPatients = async () => {
    const dataResult: any[] = [];
    const querySnapshot = await getDocs(allRef({ ref: "patients" }));
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            dataResult.push(data);
        });
    }
    return dataResult;
};

export const getAllOrders = async () => {
    const dataResult: any[] = [];
    const querySnapshot = await getDocs(allRef({ ref: "serviceOrders" }));
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            dataResult.push(data);
        });
    }
    return dataResult;
};

export const getAllSpecialties = async () => {
    const dataResult: any[] = [];
    const querySnapshot = await getDocs(allRef({ ref: "specialties" }));
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            dataResult.push(data);
        });
    }
    return dataResult;
};

export const getAllContracts = async () => {
    const dataResult: any = [];
    const querySnapshot = await getDocs(allRef({ ref: "agreements" }));
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            dataResult.push(data);
        });
    }
    return dataResult;
};

export const getDocumentRef = (reference: string, uid: string) => {
    const documentRef = doc(db, reference, uid);
    return documentRef;
};

export const getReference = (reference: string) => {
    const documentRef = doc(allRef({ ref: reference }));
    return documentRef;
};

export const saveOneDocumentFb = async (documentRef: any, data: any) => {
    await setDoc(documentRef, {
        ...data,
        timestamp: currentDate,
    });

    // console.log(documentRef,data);
    return documentRef;
};

export const updateDocumentsByIdFb = async (
    id: string,
    newData: any,
    reference: string,
) => {
    const document = docRef({ ref: reference, collection: id });
    return await updateDoc(document, {
        ...newData,
        timestamp: currentDate,
    });
};
