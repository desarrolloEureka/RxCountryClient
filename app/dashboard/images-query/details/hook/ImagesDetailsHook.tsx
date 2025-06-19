"use client";
import useAuth from "@/app/firebase/auth";
import {
    arrayRemoveFb,
    getAllAreasOptions,
    getAllCampusOptions,
    getAllPatients,
    updateDocumentsByIdFb,
} from "@/app/firebase/documents";
import { uploadFile, urlFile } from "@/app/firebase/files";
import { AreasSelector } from "@/app/types/areas";
import { CampusSelector } from "@/app/types/campus";
import { ImagesDetailsHookProps, PreviewFile } from "@/app/types/order";
import { Patient } from "@/app/types/patient";
import { db } from "@/shared/firebase/firebase";
import { Console } from "console";
import { doc, onSnapshot } from "firebase/firestore";
import _ from "lodash";
import moment from "moment";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getStorage, ref, deleteObject } from "firebase/storage";

const ImagesDetailsHook = ({ slug }: ImagesDetailsHookProps) => {
    const router = useRouter();

    const { userRol, userData, user } = useAuth();
    const { campus = "", area = "" } = userData || {};

    const [ordersData, setOrdersData] = useState<any>();
    const [patientsData, setPatientsData] = useState<any>();

    const [previewImages, setPreviewImages] = useState<PreviewFile[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [fileName, setFileName] = useState("Subir Archivo");
    const [files, setFiles] = useState<File[]>([]);

    const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);
    const [allCampus, setAllCampus] = useState<CampusSelector[]>([]);

    const [modelType, setModelType] = useState<string>("T");
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const [fileSrcSelected, setFileSrcSelected] = useState<string>(
        "https://via.placeholder.com/1920",
    );
    const [idFileSelected, setIdFileSelected] = useState<number>(0);
    const [typeFile, setTypeFile] = useState<string>("images");
    const [typeFileToUpLoad, setTypeFileToUpLoad] = useState<string>("");

    const [allOrderData, setAllOrderData] = useState<any>();

    const dropBoxUrl: string = allOrderData?.urlDropbox as string;
    const weTransferUrl: string = allOrderData?.urlWeTransfer as string;

    const [areaSelected, setAreaSelected] = useState<any>(null);
    const [sentToArea, setSentToArea] = useState<string>("");

    const arrayWithAllUrls: string[] = allOrderData ? [
        ...(allOrderData?.orderPDFUrl||[]),
        ...(allOrderData?.orderImagesUrl||[]),
        ...(allOrderData?.orderSTLFiles||[]),
    ]:[];
    const storage = getStorage();

    const getIndexOfCurrentImage = (): number => {
        return arrayWithAllUrls?.indexOf(fileSrcSelected);
    };
    //console.log("arrayWithAllUrls");
    //console.log(arrayWithAllUrls);
    // //console.log("Prueba", 0+1 % arrayWithAllUrls?.length);

    const isFirstFile: boolean = getIndexOfCurrentImage() === 0;
    const isLastFile: boolean =
        getIndexOfCurrentImage() === arrayWithAllUrls?.length - 1;

    // Función para avanzar al siguiente archivo
    const nextImage = () => {
        if (arrayWithAllUrls.length > 0){
            setCurrentImageIndex((prevIndex) => {
                const getIndex: number = (prevIndex + 1) % arrayWithAllUrls?.length;
                const urlFile: string = arrayWithAllUrls[getIndex];
                if (allOrderData?.orderImagesUrl.includes(urlFile)) {
                    const getIdFile: number =
                        allOrderData?.orderImagesUrl.indexOf(urlFile);
                    setIdFileSelected(getIdFile);
                    setTypeFile("images");
                } else if (allOrderData?.orderSTLFiles.includes(urlFile)) {
                    const getIdFile: number =
                        allOrderData?.orderSTLFiles.indexOf(urlFile);
                    setIdFileSelected(getIdFile);
                    setTypeFile("STL");
                } else if (allOrderData?.orderSTLFiles.includes(urlFile)) {
                    const getIdFile: number =
                        allOrderData?.orderSTLFiles.indexOf(urlFile);
                    setIdFileSelected(getIdFile);
                    setTypeFile("STL");
                } else {
                    const getIdFile: number =
                        allOrderData?.orderPDFUrl.indexOf(urlFile);
                    setIdFileSelected(getIdFile);
                    setTypeFile("pdf");
                }
                
                setFileSrcSelected(urlFile);
                return getIndex;
            });
        }
        
    };

    // Función para retroceder al archivo anterior
    const prevImage = () => {
        if (arrayWithAllUrls.length > 0){
            setCurrentImageIndex((prevIndex) => {
                const getIndex: number =
                    (prevIndex - 1 + arrayWithAllUrls?.length) %
                    arrayWithAllUrls?.length;
                const urlFile: string = arrayWithAllUrls[getIndex];
                if (allOrderData?.orderImagesUrl.includes(urlFile)) {
                    const getIdFile: number =
                        allOrderData?.orderImagesUrl.indexOf(urlFile);
                    setIdFileSelected(getIdFile);
                    setTypeFile("images");
                } else if (allOrderData?.orderSTLFiles.includes(urlFile)) {
                    const getIdFile: number =
                        allOrderData?.orderSTLFiles.indexOf(urlFile);
                    setIdFileSelected(getIdFile);
                    setTypeFile("STL");
                } else {
                    const getIdFile: number =
                        allOrderData?.orderPDFUrl.indexOf(urlFile);
                    setIdFileSelected(getIdFile);
                    setTypeFile("pdf");
                }
                setFileSrcSelected(urlFile);
                return getIndex;
            });
        }
        
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (!files || files.length === 0) {
            resetFileInput();
            return;
        }

        if (files) {
            const fileArray = Array.from(files);
            const cloneFiles: File[] = [...files];

            const newPreviews = fileArray.map((file) => {
                const uploadTypeFile = file.type.includes("pdf")
                    ? "pdf"
                    : file.name.includes("stl")
                    ? "STL"
                    : "images";
                setTypeFileToUpLoad(uploadTypeFile);
                return {
                    url: URL.createObjectURL(file),
                    name: file.name,
                    type: file.type,
                };
            });

            setPreviewImages((prevPreviews) => [
                // ...prevPreviews,
                ...newPreviews,
            ]);

            setFileName(cloneFiles.map((file) => file.name).join(", "));

            setFiles(cloneFiles);
        }
    };

    const resetFileInput = () => {
        setFileName("Subir Archivo");
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

    const selectChangeHandlerSentTo = (value: any) => {
        setSentToArea(value);
    };

    const handleDeleteFile = (urlFile: string, typeFile: string) => {
        //console.log("URL file: ",urlFile);
        confirmSaveAlert(() => deleteFile(urlFile, typeFile));
    };

    const handleSaveFile = (typeFile: string) => {
        //console.log(typeFile);
        confirmSaveAlert(() =>
            saveFile(typeFile).then(() => {
                setTypeFileToUpLoad("");
                setSentToArea("");
            }),
        );
    };

    // const downloadImagen = async (urlFile: string) => {
    //     //console.log("URL del archivo a descargar:", urlFile);

    //     try {
    //         //console.log("prueba",fileSrcSelected)
    //         // Realiza la solicitud fetch para obtener el archivo
    //         const response = await fetch(fileSrcSelected);

    //         // Verifica si la respuesta es exitosa
    //         if (!response.ok) {
    //             throw new Error(`Error al descargar el archivo. Código HTTP: ${response.status}`);
    //         }

    //         // Convierte la respuesta en un Blob
    //         const blob = await response.blob();

    //         // Crea una URL temporal para descargar el Blob
    //         const url = URL.createObjectURL(blob);

    //         // Crea un enlace para forzar la descarga
    //         const a = document.createElement("a");
    //         a.href = url;
    //         a.download = fileName; // Establece el nombre del archivo (predeterminado si no se pasa)
    //         document.body.appendChild(a); // Añade temporalmente el enlace al DOM
    //         a.click(); // Simula el clic para descargar
    //         document.body.removeChild(a); // Remueve el enlace del DOM

    //         // Libera la URL temporal
    //         URL.revokeObjectURL(url);

    //         ////console.log("Descarga completada.");
    //     } catch (err) {
    //         //console.error("Error al descargar la imagen:", err);
    //         alert("Hubo un error al intentar descargar el archivo. Revisa la consola para más detalles.");
    //     }

    // };
    const downloadImagen = async (urlFile: string) => {
        ////console.log("URL del archivo a descargar:", urlFile);

        try {
            // Realiza la solicitud fetch para obtener el archivo
            const response = await fetch(urlFile);

            // Verifica si la respuesta es exitosa
            if (!response.ok) {
                throw new Error(`Error al descargar el archivo. Código HTTP: ${response.status}`);
            }

            // Extrae el nombre del archivo desde la URL
            const decodedUrl = decodeURIComponent(urlFile); // Decodifica caracteres especiales
            const fileName = decodedUrl.split("/").pop()?.split("?")[0] || "archivo-descargado";

            // Convierte la respuesta en un Blob
            const blob = await response.blob();

            // Crea una URL temporal para descargar el Blob
            const url = URL.createObjectURL(blob);

            // Crea un enlace para forzar la descarga
            const a = document.createElement("a");
            a.href = url;
            a.download = fileName; // Usa el nombre del archivo extraído
            document.body.appendChild(a); // Añade temporalmente el enlace al DOM
            a.click(); // Simula el clic para descargar
            document.body.removeChild(a); // Remueve el enlace del DOM

            // Libera la URL temporal
            URL.revokeObjectURL(url);

           // //console.log("Descarga completada.");
        } catch (err) {
            console.error("Error al descargar la imagen:", err);
            alert("Hubo un error al intentar descargar el archivo. Revisa la consola para más detalles.");
        }
    };





    const deleteFile = async (urlFile: string, typeFile: string) => {

        //console.log("urlFile  y typeFile");
        //console.log(urlFile);
        //console.log(typeFile);
        const orderRef = "serviceOrders";

        const typeOfCollection: { [key: string]: string } = {
            images: "orderImagesUrl",
            pdf: "orderImagesUrl",
            STL: "orderImagesUrl",
            PLY: "orderImagesUrl",
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

            const currentYear = urlFile.match(/ODS_(\d{4})/)?.[1]||"";
            const currentDate = currentYear ? urlFile.match(new RegExp(`${currentYear}-\\d{2}-\\d{2}`))?.[0] || "" : "";
            const areaFolder = allAreas?.find((item) => item.value === (area??sentToArea))
            ?.label as string

            // Extrae el nombre del archivo desde la URL
            const decodedUrl = decodeURIComponent(urlFile); // Decodifica caracteres especiales
            const fileName = decodedUrl.split("/").pop()?.split("?")[0] || "archivo-descargado";

            const deletPatch =  `/Media/ODS_${currentYear}/${currentDate}/${slug}-${allOrderData?.id}/${areaFolder}/${fileName}`;
            //console.log("fileName");
            //console.log(fileName);
            // Create a reference to the file to delete
            const desertRef = ref(storage, deletPatch);
            //console.log("deletPatch");
            //console.log(deletPatch);


            // Delete the file
            deleteObject(desertRef).then(() => {
                //console.log("archivo eliminado");
            // File deleted successfully
            }).catch((error) => {
                //console.log("error al eliminar.")
            // Uh-oh, an error occurred!
            });
        });
    };

    const saveFile = async (typeFile: string) => {
        const orderRef = "serviceOrders";

        const typeOfCollection: { [key: string]: string } = {
            images: "orderImagesUrl",
            pdf: "orderImagesUrl",
            STL: "orderImagesUrl",
            PLY: "orderImagesUrl",
        };

        const filesUrls = await getOrdersUrls(slug);
        //console.log("fileURLS",filesUrls);
        //console.log("SLUG",slug);
        // const newData = {
        //     [typeOfCollection[typeFile]]: allOrderData?.[
        //         typeOfCollection[typeFile]
        //     ]
        //         ? [
        //               ...allOrderData?.[typeOfCollection[typeFile]],
        //               ...filesUrls[typeFile],
        //           ]
        //         : filesUrls[typeFile],
        // };

        const newData = { [typeOfCollection[typeFile]]:
        [
            ...allOrderData?.[typeOfCollection[typeFile]],
            ...filesUrls?.images,
        ]}

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
            //console.log("error----->: ", error);
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
                //console.log("Entró");

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
                //console.log("error ----> :", error);
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
        const areaFolder = allAreas?.find((item) => item.value === (area??sentToArea))
            ?.label as string

        //console.log(files);
        if (files.length > 0) {
            for (const record of files) {
                    //console.log("Folder:",allOrderData?.id);
                    //console.log("filename:",record.name.split(' ').join('_'));
                    //console.log("file:",record);
                    //console.log(" area:", areaFolder);
                    //console.log(" idOrder:", idOrder);
                    await uploadFile({
                        folder: allOrderData?.id,
                        fileName: record.name.split(' ').join('_'),
                        file: record,
                        area: areaFolder,
                        idOrder,
                    })
                        .then((res: string) => {
                            urlFiles.images.push(res);
                        })
                        .catch((err: any) => {
                            //console.log(err);
                        });


            }
        }

        return urlFiles;
    };

    // const getOrders = useCallback(async () => {
    //     const allOrdersData = await getAllOrders();
    //     allOrdersData && setOrdersData(allOrdersData);
    // }, []);

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
        if (Array.isArray(arrayWithAllUrls) && arrayWithAllUrls[0] ) {
            setFileSrcSelected(
                arrayWithAllUrls[0] ??
                    "https://via.placeholder.com/1920",
            );
            //setFileSrcSelected("data:image/jpeg;base64,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")
            setIdFileSelected(0);
            setCurrentImageIndex(0);
            // setTypeFile("images");
        }
    }, [allOrderData?.orderImagesUrl]);

    useEffect(() => {
        const patient = patientsData?.find(
            (patient: Patient) => patient.uid === ordersData.patientId,
        );

        if (patient) {
            const { id, name, lastName, phone, email, age } = patient;

            const orderAndPatientData = {
                ...ordersData,
                id,
                name,
                lastName,
                phone,
                email,
                age,
            };
            //console.log("orderAndPatientData");
            //console.log(orderAndPatientData);
            //console.log("patient");
            //console.log(patient);
            //console.log("ordersData");
            //console.log(ordersData);

            setAllOrderData(orderAndPatientData);
        }

    }, [ordersData, patientsData]);

    useEffect(() => {
        const docRef = doc(db, "serviceOrders", slug);

        const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
            if (querySnapshot.exists()) {
                const source = querySnapshot.metadata.hasPendingWrites
                    ? "Local"
                    : "Server";
                const data = querySnapshot.data();
                // //console.log("doc.data", data, source);
                setOrdersData(data);
            }
        });

        return () => unsubscribe();
    }, [slug]);

    useEffect(() => {
        // getOrders();
        getPatients();
        getCampus();
        getAreas();
    }, [getAreas, getCampus, getPatients]);

    useEffect(() => {
        const userRoleId = localStorage.getItem("userRoleId") ?? "";

        if (!user && !userRoleId) {
            router.replace("/sign-in");
            return;
        }
    }, [router, user]);

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
        typeFileToUpLoad,
        allAreas,
        areaSelected,
        setAreaSelected,
        selectChangeHandlerSentTo,
        user,
        isFirstFile,
        isLastFile,
        currentImageIndex,
        nextImage,
        prevImage,
        downloadImagen,
    };
};

export default ImagesDetailsHook;
