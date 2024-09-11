import { colombianCitiesData } from "@/app/data/colombianCitiesData";

export const roles = [
    { value: "Super Administrador", label: "Super Administrador" },
    { value: "Administrador", label: "Administrador" },
    { value: "Funcionario", label: "Funcionario" },
    { value: "Profesional", label: "Profesional" },
    { value: "Paciente", label: "Paciente" },
];

export const idTypes = [
    { value: "CC", label: "CC" },
    { value: "NIT", label: "NIT" },
    { value: "RC", label: "RC" },
    { value: "TI", label: "TI" },
    { value: "CN", label: "CN" },
    { value: "CD", label: "CD" },
    { value: "CE", label: "CE" },
    { value: "PA", label: "PA" },
    { value: "SC", label: "SC" },
    { value: "PE", label: "PE" },
    { value: "AS", label: "AS" },
    { value: "MS", label: "MS" },
];

export const countries = [{ value: "CO", label: "Colombia" }];

export const personTypes = [
    { value: "Jurídico", label: "Jurídico" },
    { value: "Natural", label: "Natural" },
];

export const colombianStates = colombianCitiesData.map((state) => ({
    value: state.id + 1,
    label: state.departamento,
}));

export const getCities = (id: number) =>
    colombianCitiesData[id - 1].ciudades.map((city) => ({
        value: city,
        label: city,
    }));

export const specialties = [{ value: "Example", label: "Example" }];

export const contracts = [{ value: "Example", label: "Example" }];

const isActiveData = [
    {
        value: "Activo",
        label: "Activo",
        // statusInfo: "success",
        // color: "#198754",
    },
    {
        value: "Inactivo",
        label: "Inactivo",
        // statusInfo: "danger",
        // color: "#dc3545",
    },
];

export const campus = [
    { value: "Marly", label: "Marly" },
    { value: "Santa Barbara", label: "Santa Barbara" },
    { value: "Country", label: "Country" },
];

export const areas = [
    { value: "Administrativo", label: "Administrativo" },
    { value: "Despachos", label: "Despachos" },
    { value: "Diagnósticos", label: "Diagnósticos" },
    { value: "Escáner Modelos", label: "Escáner Modelos" },
    { value: "Modelos", label: "Modelos" },
    { value: "Radiología", label: "Radiología" },
    { value: "Recepción", label: "Recepción" },
];

export const widthSlider = [
    "w-0",
    "w-1/5",
    "w-2/5",
    "w-3/5",
    "w-4/5",
    "w-full",
];

export const titles: string[] = [
    "Información",
    "Radiografías",
    "Tomografía Volumétrica 3D en las Sedes Country-Santa Bárbara-Marly",
    "Diagnósticos/Modelos",
    "Fotografía Clínica",
    "Entregas y Observaciones",
];
