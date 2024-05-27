import { DataPatientObject } from "../types/patient";

export const dataPatientObject = {
    uid: "",
    idType: "",
    id: "",
    name: "",
    lastName: "",
    birthDate: "",
    age: "",
    phone: "",
    phone2: "",
    address: "",
    country: "",
    state: "",
    city: "",
    email: "",
    rol: "Paciente",
    urlPhoto: "",
    serviceOrders: [],
    timestamp: new Date(),
    isActive: true,
    isDeleted: false,
} as DataPatientObject;
