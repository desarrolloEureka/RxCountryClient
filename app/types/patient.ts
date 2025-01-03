export type DataPatientObject = {
    uid: string;
    idType: string;
    id: string;
    name: string;
    lastName: string;
    birthDate: string;
    age: string;
    phone: any;
    phone2: any;
    address: string;
    country: string;
    state: any;
    city: string;
    email: string;
    confirmEmail: string;
    rol: string;
    urlPhoto: string;
    serviceOrders: string[];
    timestamp: string;
    isActive: boolean;
    isDeleted: boolean;
};

export interface Patient {
    uid: string;
    id: string;
    name: string;
    lastName: string;
    phone: string;
    email: string;
    serviceOrders: string[];
}
