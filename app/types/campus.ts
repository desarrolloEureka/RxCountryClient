export interface CampusBd {
    name: string;
    uid: string;
    availableAreas?: string[];
}

export interface CampusSelector {
    value: string;
    label: string;
    areas?: string[];
}
