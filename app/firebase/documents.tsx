import { db } from "@/shared/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { AllRefPropsFirebase } from "../types/userFirebase";

const reference: string = "rxCountryFront";

const allRef = ({ ref }: AllRefPropsFirebase) => collection(db, ref);

export const getAllOptions = async () => {
    const querySnapshot = await getDocs(allRef({ ref: reference }));
    let allOptions = {};

    if (!querySnapshot.empty) {
        allOptions = querySnapshot.docs.reduce((acc, doc) => {
            const dataResult = doc.data();
            return Object.assign(acc, dataResult);
        }, {});
    }

    return allOptions;
};
