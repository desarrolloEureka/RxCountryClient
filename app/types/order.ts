export interface Order {
    orderId: string;
    patientId: string;
}

export interface OrdersByRol {
    [key: string]: {
        [subKey1: string]: [];
    };
}

export interface EditedOrderStatusByRol {
    [key: string]: string;
}

export interface PreviewOrderProps {
    backToOrder: () => void;
    backToDetail?: () => void;
    isEdit?: boolean;
    orderId?: number;
}
