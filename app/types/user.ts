export type LoginParams = {
    email: string | null;
    password: string;
};

export type UserData = {
    uid: string;
    icon: string;
    idType: string;
    id: string;
    name: string;
    description: string;
    personType: string;
    discount: string;
    rut: string;
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
    specialty: string;
    contract: string;
    rol: string;
    campus: string;
    availableCampus: string[];
    area: string;
    availableAreas: string[];
    urlPhoto: string;
    timestamp: string;
    isActive: boolean;
    isDeleted: boolean;
};

// export interface DemoChangerElement extends HTMLElement {
//   style: CSSStyleDeclaration;
// }
