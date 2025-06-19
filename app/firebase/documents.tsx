import { db } from "@/shared/firebase/firebase";
import {
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    getDocs,
    onSnapshot,
    setDoc,
    updateDoc,
    query,
    where,
    getDoc,
} from "firebase/firestore";
import moment from "moment";
import { AreasBd, AreasSelector } from "../types/areas";
import { CampusBd, CampusSelector } from "../types/campus";
import { DiagnosesBd, DiagnosesSelector } from "../types/diagnoses";
import { DiagnosticianBd, DiagnosticianSelector } from "../types/diagnostician";
import { AllRefPropsFirebase, RefPropsFirebase } from "../types/userFirebase";

const currentDate = moment().format();

const allRef = ({ ref }: AllRefPropsFirebase) => collection(db, ref);

export const arrayUnionFb = (data: any) => arrayUnion(data);

export const arrayRemoveFb = (data: any) => arrayRemove(data);

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

export const getAllDiagnosesOptions = async () => {
    const dataResult: DiagnosesSelector[] = [];
    const querySnapshot = await getDocs(allRef({ ref: "diagnoses" }));
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data() as DiagnosesBd;
            const dataSelector = {
                value: data.uid,
                label: data.name,
            };
            dataResult.push(dataSelector);
        });
    }
    return dataResult;
};

export const getAllDiagnosticianOptions = async () => {
    const dataResult: DiagnosticianSelector[] = [];
    const querySnapshot = await getDocs(allRef({ ref: "diagnostician" }));
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data() as DiagnosticianBd;
            const dataSelector = {
                value: data.uid,
                label: data.name,
            };
            dataResult.push(dataSelector);
        });
    }
    return dataResult;
};

export const getAllCampusOptions = async () => {
    const dataResult: CampusSelector[] = [];
    const querySnapshot = await getDocs(allRef({ ref: "campus" }));
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data() as CampusBd;
            const dataSelector = {
                value: data.uid,
                label: data.name,
                areas: data.availableAreas,
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

export const getAllRoles = async () => {
    const dataResult: any[] = [];
    const querySnapshot = await getDocs(allRef({ ref: "roles" }));
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            dataResult.push(data);
        });
    }
    return dataResult;
};

export const getAllFunctionaries = async () => {
    const dataResult: any[] = [];
    const querySnapshot = await getDocs(allRef({ ref: "functionary" }));
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            dataResult.push(data);
        });
    }
    return dataResult;
};

export const getAllProfessionals = async () => {
    const dataResult: any[] = [];
    const querySnapshot = await getDocs(allRef({ ref: "professionals" }));
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

export const getOrderById = async (id: string) => {
    const q = query(collection(db, "serviceOrders"), where("uid", "==", id));
    const querySnapshot = await getDocs(q);

    const order = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
    }));
    return order;
};

export const getOrderByIdInRealTime = (id: string) => {
    const dataResult: any[] = [];
    let source: string = "";

    // const q = query(collection(db, "serviceOrders"), where("uid", "==", id));

    const docRef = doc(db, "serviceOrders", id);

    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
        // if (!querySnapshot.empty) {
        if (querySnapshot.exists()) {
            // querySnapshot.forEach((doc: any) => {
            source = querySnapshot.metadata.hasPendingWrites
                ? "Local"
                : "Server";
            const data = querySnapshot.data();
            //console.log("doc.data", data, source);
            dataResult.push(data);
            // });
        }
    });

    return { unsubscribe, dataResult, source };
};

export const getAllOrdersOnSub = () => {
    const dataResult: any[] = [];

    onSnapshot(allRef({ ref: "serviceOrders" }), (querySnapshot) => {
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc: any) => {
                const data = doc.data();
                dataResult.push(data);
            });
        }
    });

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
        timestamp: data.timestamp ? data.timestamp : currentDate,
    });

    // //console.log(documentRef,data);
    return documentRef;
};

export const updateDocumentsByIdFb = async (
    id: string,
    newData: any,
    reference: string,
) => {
    const document = docRef({ ref: reference, collection: id });
    return await updateDoc(document, newData);
};

export const checkIfUserExists = async (id: string) => {
    const patientsRef = collection(db, "patients");
    const q = query(patientsRef, where("id", "==", id));
    const querySnapshot = await getDocs(q);
    //console.log("querySnapshot",!querySnapshot.empty);
    return !querySnapshot.empty;
};
