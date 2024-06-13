import { UserData } from "../types/user";

export const loginData = {
    fullName: "",
    email: "",
    password: "",
    newPassword: "",
};

export const dataUserObject = {
    uid: "",
    icon: "",
    idType: "",
    id: "",
    name: "",
    description: "",
    personType: "",
    discount: "",
    rut: "",
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
    specialty: "",
    contract: "",
    rol: "",
    campus: "",
    availableCampus: [],
    area: "",
    availableAreas: [],
    urlPhoto: "",
    timestamp: new Date(),
    isActive: true,
    isDeleted: false,
} as UserData;

// export const ProfileData = {
//     displayName: "",
//     name: "",
//     lastName: "",
//     email: "",
//     rol: "admin",
//     emailVerified: false,
//     address: "",
//     phone: "",
//     position: "",
//     aboutMe: "",
// };
