"use client";
import useAuth from "@/app/firebase/auth";
import {
    arrayRemoveFb,
    getAllAreasOptions,
    getAllCampusOptions,
    getAllOrders,
    getAllPatients,
    updateDocumentsByIdFb,
} from "@/app/firebase/documents";
import { uploadFile } from "@/app/firebase/files";
import { AreasSelector } from "@/app/types/areas";
import { CampusSelector } from "@/app/types/campus";
import { ImagesDetailsHookProps, Order, PreviewFile } from "@/app/types/order";
import { Patient } from "@/app/types/patient";
import moment from "moment";
import _ from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const ImagesDetailsHook = ({ slug }: ImagesDetailsHookProps) => {
    const { userRol, userData } = useAuth();
    const { campus, area } = userData;

    const [ordersData, setOrdersData] = useState<any>();
    const [patientsData, setPatientsData] = useState<any>();

    const [previewImages, setPreviewImages] = useState<PreviewFile[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [fileName, setFileName] = useState("SUBIR ARCHIVO");
    const [files, setFiles] = useState<File[]>([]);

    const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);
    const [allCampus, setAllCampus] = useState<CampusSelector[]>([]);

    const [modelType, setModelType] = useState<string>("T");
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const [fileSrcSelected, setFileSrcSelected] = useState<string>(
        "https://via.placeholder.com/1920",
    );
    const [idFileSelected, setIdFileSelected] = useState<number>(0);
    const [typeFile, setTypeFile] = useState<string>("images");

    const [allOrderData, setAllOrderData] = useState<any>();

    const dropBoxUrl: string = allOrderData?.urlDropbox as string;
    const weTransferUrl: string = allOrderData?.urlWeTransfer as string;

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            resetFileInput();
            return;
        }

        if (files) {
            const fileArray = Array.from(files);
            const cloneFiles: File[] = [...files];

            const newPreviews = fileArray.map((file) => ({
                url: URL.createObjectURL(file),
                name: file.name,
            }));

            setPreviewImages((prevPreviews) => [
                // ...prevPreviews,
                ...newPreviews,
            ]);

            setFileName(cloneFiles.map((file) => file.name).join(", "));

            setFiles(cloneFiles);
        }
    };

    const resetFileInput = () => {
        setFileName("SUBIR ARCHIVO");
        setFiles([]);
        setModelType("T");
    };

    const handleRemoveImage = (indexToRemove: number) => {
        setPreviewImages((prevPreviews) => {
            const updatedPreviews = prevPreviews.filter(
                (_, index) => index !== indexToRemove,
            );
            URL.revokeObjectURL(prevPreviews[indexToRemove].url);
            return updatedPreviews;
        });
        resetFileInput();
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectFile = (item: any, index: number, typeFile: string) => {
        setFileSrcSelected(item);
        setIdFileSelected(index);
        setTypeFile(typeFile);
    };

    const handleModelType = (e: any) => {
        const value = e.target.value;
        setModelType(value);
    };

    const handleDeleteFile = (urlFile: string, typeFile: string) => {
        confirmSaveAlert(() => deleteFile(urlFile, typeFile));
    };

    const handleSaveFile = (typeFile: string) => {
        confirmSaveAlert(() => saveFile(typeFile));
    };

    const deleteFile = async (urlFile: string, typeFile: string) => {
        const orderRef = "serviceOrders";

        const typeOfCollection: { [key: string]: string } = {
            images: "orderImagesUrl",
            pdf: "orderPDFUrl",
            STL: "orderSTLFiles",
        };

        await updateDocumentsByIdFb(
            slug,
            {
                [typeOfCollection[typeFile]]: arrayRemoveFb(urlFile),
            },
            orderRef,
        ).then(() => {
            const newData = _.cloneDeep(allOrderData);
            newData[typeOfCollection[typeFile]] = _.filter(
                newData[typeOfCollection[typeFile]],
                (item: string) => item !== urlFile,
            );
            setAllOrderData(newData);
        });
    };

    const saveFile = async (typeFile: string) => {
        const orderRef = "serviceOrders";

        const typeOfCollection: { [key: string]: string } = {
            images: "orderImagesUrl",
            pdf: "orderPDFUrl",
            STL: "orderSTLFiles",
        };

        const filesUrls = await getOrdersUrls(slug);

        const newData = {
            [typeOfCollection[typeFile]]: allOrderData?.[
                typeOfCollection[typeFile]
            ]
                ? [
                      ...allOrderData?.[typeOfCollection[typeFile]],
                      ...filesUrls[typeFile],
                  ]
                : filesUrls[typeFile],
        };

        try {
            await updateDocumentsByIdFb(slug, newData, orderRef).then(() => {
                handleRemoveImage(currentIndex);
                allOrderData[typeOfCollection[typeFile]] = allOrderData?.[
                    typeOfCollection[typeFile]
                ]
                    ? [
                          ...allOrderData?.[typeOfCollection[typeFile]],
                          ...filesUrls[typeFile],
                      ]
                    : filesUrls[typeFile];
            });
        } catch (error) {
            console.log("error----->: ", error);
        }
    };

    const confirmSaveAlert = (callbackFc: () => Promise<void>) => {
        Swal.fire({
            title:
                previewImages.length > 0
                    ? "¿Desea subir este archivo?"
                    : "¿Desea eliminar este archivo?",
            // text: "Después no podrá recuperar la información.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1f2937",
            // cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí!",
            cancelButtonText: "¡No!",
            background: "#404040",
            color: "#e9a225",
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log("Entró");

                saveAlert(callbackFc);
            }
        });
    };

    const saveAlert = async (callbackFc: () => Promise<void>) => {
        Swal.fire({
            position: "center",
            title: `Guardando...`,
            text: "Por favor espera",
            allowOutsideClick: false,
            background: "#404040",
            color: "#e9a225",
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            await callbackFc();

            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "El archivo se modificó con éxito",
                background: "#404040",
                color: "#e9a225",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Ocurrió un error, intente más tarde: ${error}.`,
                background: "#404040",
                color: "#e9a225",
                showConfirmButton: false,
                // confirmButtonColor: "#1f2937",
                // confirmButtonText: "Volver a intentar",
            }).then(() => {
                console.log("error ----> :", error);
            });
        }
    };

    const getOrdersUrls = async (
        idOrder: string,
    ): Promise<{
        images: string[];
        pdf: string[];
        STL: string[];
        [key: string]: string[];
    }> => {
        const urlFiles: {
            images: string[];
            pdf: string[];
            STL: string[];
        } = {
            images: [],
            pdf: [],
            STL: [],
        };

        const currentCampusName = allCampus?.find(
            (item) => item.value === campus,
        )?.label;

        const firstLetterCampus =
            campus && currentCampusName && currentCampusName.substring(0, 1);

        if (files.length > 0) {
            let count = 1;
            for (const record of files) {
                const urlName = record.name.split(".")[0];
                const fileType = record.type.split("/");
                if (fileType[0] === "image") {
                    await uploadFile({
                        folder: allOrderData?.id,
                        fileName:
                            userRol?.uid === "g9xGywTJG7WSJ5o1bTsH"
                                ? `${firstLetterCampus}${modelType}-${moment().format(
                                      "YYYYMMDD",
                                  )}-${allOrderData?.id}-${moment().format(
                                      "HHmmss",
                                  )}`
                                : urlName.split(" ").join("_"),
                        file: record,
                        area: allAreas?.find((item) => item.value === area)
                            ?.label as string,
                        idOrder,
                    })
                        .then((res: string) => {
                            urlFiles.images.push(res);
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                } else if (fileType[1] === "pdf") {
                    await uploadFile({
                        folder: allOrderData?.id,
                        fileName: urlName.split(" ").join("_"),
                        file: record,
                        area: allAreas?.find((item) => item.value === area)
                            ?.label as string,
                        idOrder,
                    })
                        .then((res: string) => {
                            urlFiles.pdf.push(res);
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                } else {
                    await uploadFile({
                        folder: allOrderData?.id,
                        fileName: record.name.split(" ").join("_"),
                        file: record,
                        area: allAreas?.find((item) => item.value === area)
                            ?.label as string,
                        idOrder,
                    })
                        .then((res: string) => {
                            urlFiles.STL.push(res);
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                }
            }
        }

        return urlFiles;
    };

    const getOrders = useCallback(async () => {
        const allOrdersData = await getAllOrders();
        allOrdersData && setOrdersData(allOrdersData);
    }, []);

    const getPatients = useCallback(async () => {
        const allPatientsData = await getAllPatients();
        allPatientsData && setPatientsData(allPatientsData);
    }, []);

    const getCampus = useCallback(async () => {
        const allCampusData = await getAllCampusOptions();
        allCampusData && setAllCampus(allCampusData);
    }, []);

    const getAreas = useCallback(async () => {
        const allAreasData = await getAllAreasOptions();
        allAreasData && setAllAreas(allAreasData);
    }, []);

    useEffect(() => {
        if (allOrderData?.orderImagesUrl) {
            setFileSrcSelected(
                allOrderData?.orderImagesUrl[0] ??
                    "https://via.placeholder.com/1920",
            );
            setIdFileSelected(0);
            // setTypeFile("images");
        }
    }, [allOrderData?.orderImagesUrl]);

    useEffect(() => {
        const allDataOrders = ordersData?.flatMap((order: Order) => {
            const patient = patientsData?.find(
                (patient: Patient) => patient.uid === order.patientId,
            );

            if (patient) {
                const { id, name, lastName, phone, email, age } = patient;
                return { ...order, id, name, lastName, phone, email, age };
            }

            return [];
        });
        const orderAndPatientData = allDataOrders?.find(
            (item: any) => item.uid === slug,
        );
        if (orderAndPatientData) {
            setAllOrderData(orderAndPatientData);
        }
    }, [ordersData, patientsData, slug]);

    useEffect(() => {
        getOrders();
        getPatients();
        getCampus();
        getAreas();
    }, [getAreas, getCampus, getOrders, getPatients]);

    return {
        orderAndPatientData: allOrderData,
        handleDeleteFile,
        handleSaveFile,
        isModalOpen,
        previewImages,
        handleFileChange,
        handleRemoveImage,
        openModal,
        closeModal,
        fileName,
        files,
        userRol,
        handleModelType,
        modelType,
        setCurrentIndex,
        fileSrcSelected,
        idFileSelected,
        typeFile,
        dropBoxUrl,
        weTransferUrl,
        handleSelectFile,
    };
};

export default ImagesDetailsHook;
