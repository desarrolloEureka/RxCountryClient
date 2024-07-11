export interface Order {
    orderId: string;
    patientId: string;
    createdBy?: {
        userId: string;
        userRol: string;
    };
}

export interface OrdersByRol {
    [key: string]: {
        [subKey1: string]: [];
    };
}

export interface OrdersImagesByRol {
    [key: string]: [];
}

export interface EditedOrderStatusByRol {
    [key: string]: string | undefined;
}

export interface PreviewOrderProps {
    // backToOrder: () => void;
    // backToDetail?: () => void;
    // isEdit?: boolean;
    // orderId?: number;
}

export interface updateOrderProps {
    [key: string]: any;
}

export interface datePickerProps {
    startDate: string | null;
    endDate: string | null;
}
