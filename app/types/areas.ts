export interface AreasBd {
    name: string;
    uid: string;
    availableCampus?: string[];
}

export interface AreasSelector {
    value: string;
    label: string;
    campus?: string[];
}
