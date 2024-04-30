export interface UploadFileProps {
    folder: string;
    fileName: string;
    file: any;
    reference?: any;
}

export interface DownloadFileProps {
    reference: string;
    folder: string;
    fileName: string;
}

export interface saveFilesDocumentsQueryProps {
    code: string;
    record: any;
    data: any;
}
export interface saveFilesDocumentsProps {
    urlName: string;
    record: any;
    uid: string;
    reference?: any;
}
