import { db } from "@/shared/firebase/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { AllRefPropsFirebase } from "../types/userFirebase";
import moment from "moment";

const currentDate = moment().format();

const allRef = ({ ref }: AllRefPropsFirebase) => collection(db, ref);

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

export const getAllSpecialties = async () => {
    const dataResult: any = [];
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

export const saveOneDocumentFb = async (documentRef: any, data: any) => {
    await setDoc(documentRef, {
        ...data,
        timestamp: currentDate,
    });

    // console.log(documentRef,data);
    return documentRef;
};
