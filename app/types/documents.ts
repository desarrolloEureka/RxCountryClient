export interface allOptions {
    additionalDeliveryMethod: string[];
    background: string[];
    clinicalPhotographyDeliveryMethod: string[];
    diagnosis: string[];
    diagnosticPackage: string[];
    extraOralClinicalPhotography: string[];
    extraOralsOptions: string[];
    intraOralClinicalPhotography: string[];
    intraOralsOptions: string[];
    models: string[];
    presentation: string[];
    volumetricTomography: string[];
}

export type Options = {
    additionalDeliveryMethod: string[];
    background: string[];
    clinicalPhotographyDeliveryMethod: string[];
    diagnosis: string[];
    diagnosticPackage: string[];
    extraOralClinicalPhotography: string[];
    extraOralsOptions: string[];
    intraOralClinicalPhotography: string[];
    intraOralsOptions: string[];
    models: string[];
    presentation: string[];
    volumetricTomography: string[];
};

export type EmailContentProps = {
    to: string;
    message: {
        subject: string;
        text: string;
        html: string;
    };
};

export type SendCustomEmailProps = {
    email: string;
    subject: string;
    body: string;
};
