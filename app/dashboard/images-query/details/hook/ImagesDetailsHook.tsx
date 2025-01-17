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

    const arrayWithAllUrls: string[] = allOrderData && [
        ...allOrderData?.orderPDFUrl,
        ...allOrderData?.orderImagesUrl,
        ...allOrderData?.orderSTLFiles,
    ];
    const storage = getStorage();

    const getIndexOfCurrentImage = (): number => {
        return arrayWithAllUrls?.indexOf(fileSrcSelected);
    };

    // console.log("Prueba", 0+1 % arrayWithAllUrls?.length);

    const isFirstFile: boolean = getIndexOfCurrentImage() === 0;
    const isLastFile: boolean =
        getIndexOfCurrentImage() === arrayWithAllUrls?.length - 1;

    // Función para avanzar al siguiente archivo
    const nextImage = () => {
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
    };

    // Función para retroceder al archivo anterior
    const prevImage = () => {
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
        console.log("URL file: ",urlFile);
        confirmSaveAlert(() => deleteFile(urlFile, typeFile));
    };

    const handleSaveFile = (typeFile: string) => {
        console.log(typeFile);
        confirmSaveAlert(() =>
            saveFile(typeFile).then(() => {
                setTypeFileToUpLoad("");
                setSentToArea("");
            }),
        );
    };

    // const downloadImagen = async (urlFile: string) => {
    //     console.log("URL del archivo a descargar:", urlFile);
        
    //     try {
    //         console.log("prueba",fileSrcSelected)
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
    
    //         //console.log("Descarga completada.");
    //     } catch (err) {
    //         //console.error("Error al descargar la imagen:", err);
    //         alert("Hubo un error al intentar descargar el archivo. Revisa la consola para más detalles.");
    //     }
        
    // };
    const downloadImagen = async (urlFile: string) => {
        //console.log("URL del archivo a descargar:", urlFile);
    
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
    
           // console.log("Descarga completada.");
        } catch (err) {
            console.error("Error al descargar la imagen:", err);
            alert("Hubo un error al intentar descargar el archivo. Revisa la consola para más detalles.");
        }
    };
    

    
    

    const deleteFile = async (urlFile: string, typeFile: string) => {
        
        console.log("urlFile  y typeFile");
        console.log(urlFile);
        console.log(typeFile);
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
            console.log("fileName");
            console.log(fileName);
            // Create a reference to the file to delete
            const desertRef = ref(storage, deletPatch);
            console.log("deletPatch");
            console.log(deletPatch);
            
            
            // Delete the file
            deleteObject(desertRef).then(() => {
                console.log("archivo eliminado");
            // File deleted successfully
            }).catch((error) => {
                console.log("error al eliminar.")
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
        console.log("fileURLS",filesUrls);
        console.log("SLUG",slug);
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
        const areaFolder = allAreas?.find((item) => item.value === (area??sentToArea))
            ?.label as string

        console.log(files);
        if (files.length > 0) {
            for (const record of files) {
                    console.log("Folder:",allOrderData?.id);
                    console.log("filename:",record.name.split(' ').join('_'));
                    console.log("file:",record);
                    console.log(" area:", areaFolder);
                    console.log(" idOrder:", idOrder);
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
                            console.log(err);
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
        if (allOrderData?.orderImagesUrl) {
            setFileSrcSelected(
                allOrderData?.orderImagesUrl[0] ??
                    "https://via.placeholder.com/1920",
            );
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
                // console.log("doc.data", data, source);
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
