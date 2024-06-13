import useAuth from "@/app/firebase/auth";
import {
    getAllAreasOptions,
    getAllCampusOptions,
    getAllOrders,
    getAllPatients,
    getDocumentRef,
    saveOneDocumentFb,
} from "@/app/firebase/documents";
import { uploadFileImage } from "@/app/firebase/files";
import { AreasSelector } from "@/app/types/areas";
import { CampusSelector } from "@/app/types/campus";
import { EditedOrderStatusByRol, Order } from "@/app/types/order";
import { Patient } from "@/app/types/patient";
import _ from "lodash";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";

type Props = {
    // setDataSelected: (e: any) => void;
    slug: string;
};

const DetailsHook = ({ slug }: Props) => {
    const { userRol, userData } = useAuth();

    const { campus, area } = userData;

    const currentDate = moment().format();

    const [expandReceptionData, setExpandReceptionData] = useState(false);
    const [expandSpecialist, setExpandSpecialist] = useState(false);
    const [expandRx1, setExpandRx1] = useState(false);
    const [expandRx2, setExpandRx2] = useState(false);
    const [expandRx3, setExpandRx3] = useState(false);
    const [expandRx4, setExpandRx4] = useState(false);
    const [expandRx5, setExpandRx5] = useState(false);
    const [selectedDiagnosis, setSelectedDiagnosis] = useState<string[]>([]);
    const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
    const [sentToArea, setSentToArea] = useState<string>("");
    const [detailStep, setDetailStep] = useState(0);
    const [observationComment, setObservationComment] = useState<string>("");
    const [diagnosticImpressionComment, setDiagnosticImpressionComment] =
        useState<string>("");

    const [ordersData, setOrdersData] = useState<any>();
    const [patientsData, setPatientsData] = useState<any>();
    const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);
    const [allCampus, setAllCampus] = useState<CampusSelector[]>([]);

    const [fileName, setFileName] = useState("SUBIR ARCHIVO");
    const [files, setFiles] = useState<any[]>([]);

    const [areaSelected, setAreaSelected] = useState<any>();

    const allDataOrders = ordersData?.flatMap((order: Order) => {
        const patient = patientsData?.find(
            (patient: Patient) => patient.uid === order.patientId,
        );

        if (patient) {
            const { id, name, lastName, phone, email } = patient;
            return { ...order, id, name, lastName, phone, email };
        }

        return [];
    });

    const orderAndPatientData = allDataOrders?.find(
        (item: any) => item.uid === slug,
    );

    const currentOrderData = ordersData?.find((item: any) => item.uid === slug);

    const areasByCampus = () => {
        const filteredIdAreas = allCampus?.find(
            (item) => item.value === campus,
        )?.areas;

        const result = allAreas?.filter((area) =>
            filteredIdAreas?.includes(area.value),
        );
        return result;
    };

    const backToOrder = () => {
        setDetailStep(1);
    };

    const backToDetail = () => {
        setDetailStep(0);
    };

    const handleFileChange = (e: any) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setFiles([...e.target.files]);
        } else {
            setFileName("SUBIR ARCHIVO");
            setFiles([]);
        }
    };

    const selectChangeHandlerSentTo = (value: any) => {
        setSentToArea(value);
    };

    const commentChangeHandler = (e: any) => {
        setObservationComment(e.target.value);
    };

    const handleChecks = (
        option: string,
        selected: string[],
        setSelected: (e: any) => void,
    ) => {
        if (selected.includes(option)) {
            let selectedList = selected.filter((item) => item !== option);
            setSelected(selectedList);
        } else {
            setSelected([...selected, option]);
        }
    };

    const editedOrderStatusByRol: EditedOrderStatusByRol = {
        //Profesional
        ZWb0Zs42lnKOjetXH5lq: "enviada",
        //Recepción
        Ll6KGdzqdtmLLk0D5jhk: "asignada",
        //Modelos
        g9xGywTJG7WSJ5o1bTsH: "asignada",
        //Laboratorio
        chbFffCzpRibjYRyoWIx: "asignada",
        //Radiología
        V5iMSnSlSYsiSDFs4UpI: "asignada",
        //Escáner Digital
        VEGkDuMXs2mCGxXUPCWI: "asignada",
        //Despacho
        "9RZ9uhaiwMC7VcTyIzhl": "asignada",
    };

    const handleSendForm = async (e?: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Editó");
        await uploadHandle();
    };

    const uploadHandle = async () => {
        const reference = "serviceOrders";

        const documentEditOrderRef: any = getDocumentRef(
            reference,
            currentOrderData.uid,
        );

        const orderImagesUrl: string[] = [];

        for (const record of files) {
            const urlName = record.name.split(".")[0];
            await uploadFileImage({
                folder: currentOrderData.patientId,
                fileName: urlName.split(" ").join("_"),
                file: record,
                reference,
            })
                .then((res) => {
                    orderImagesUrl.push(res);
                })
                .catch((err: any) => {
                    console.log(err);
                });
        }

        // console.log({
        //     ...currentOrderData,
        //     status: editedOrderStatusByRol[userRol?.uid!],
        //     sendTo: sentToArea
        //          ? sentToArea
        //          : userRol?.uid === "VEGkDuMXs2mCGxXUPCWI" ||
        //          userRol?.uid === "g9xGywTJG7WSJ5o1bTsH"
        //          ? "9RZ9uhaiwMC7VcTyIzhl"
        //          : currentOrderData.sendTo,
        //     modifiedBy: {
        //         userRolId: userRol?.uid,
        //         userId: userData?.uid,
        //     },
        //     orderImagesUrl,
        //     selectedSuppliers: selectedSuppliers ? selectedSuppliers : "",
        //     selectedDiagnosis: selectedDiagnosis ? selectedDiagnosis : "",
        //     assignedCampus: campus ? campus : "",
        //     [userRol?.name.substring(0, 3).toLocaleLowerCase() +
        //     "ObservationComment"]: observationComment,
        //     diagnosticImpressionComment: diagnosticImpressionComment
        //         ? diagnosticImpressionComment
        //         : currentOrderData.diagnosticImpressionComment,
        //     updateLog: currentOrderData.updateLog
        //         ? [
        //               ...currentOrderData.updateLog,
        //               {
        //                   lastUserId: userData?.uid,
        //                   lastUpdate: currentDate,
        //                   lastComment: observationComment,
        //               },
        //           ]
        //         : [
        //               {
        //                   lastUserId: userData?.uid,
        //                   lastUpdate: currentDate,
        //                   lastComment: observationComment,
        //                   // lastComment:
        //                   //     userRol?.uid === "ZWb0Zs42lnKOjetXH5lq"
        //                   //         ? currentOrderData.observationComment
        //                   //         : currentOrderData?.[
        //                   //               userRol?.name
        //                   //                   .substring(0, 3)
        //                   //                   .toLocaleLowerCase() +
        //                   //                   "ObservationComment"
        //                   //           ],
        //               },
        //           ],
        // });

        await saveOneDocumentFb(documentEditOrderRef, {
            ...currentOrderData,
            status: editedOrderStatusByRol[userRol?.uid!],
            sendTo: sentToArea
                ? sentToArea
                : userRol?.uid === "VEGkDuMXs2mCGxXUPCWI" ||
                  userRol?.uid === "g9xGywTJG7WSJ5o1bTsH"
                ? "0OaigBxmSmUa90dvawB1"
                : currentOrderData.sendTo,
            modifiedBy: {
                userRolId: userRol?.uid,
                userId: userData?.uid,
            },
            orderImagesUrl,
            selectedSuppliers: selectedSuppliers ? selectedSuppliers : "",
            selectedDiagnosis: selectedDiagnosis ? selectedDiagnosis : "",
            assignedCampus: campus ? campus : "",
            [userRol?.name.substring(0, 3).toLocaleLowerCase() +
            "ObservationComment"]: observationComment,
            // [userRol?.name.substring(0, 3).toLocaleLowerCase() +
            // "ObservationComment"]: observationComment
            //     ? observationComment
            //     : currentOrderData?.[
            //           userRol?.name.substring(0, 3).toLocaleLowerCase() +
            //               "ObservationComment"
            //       ]
            //     ? currentOrderData?.[
            //           userRol?.name.substring(0, 3).toLocaleLowerCase() +
            //               "ObservationComment"
            //       ]
            //     : "",
            diagnosticImpressionComment: diagnosticImpressionComment
                ? diagnosticImpressionComment
                : currentOrderData.diagnosticImpressionComment,
            updateLog: currentOrderData.updateLog
                ? [
                      ...currentOrderData.updateLog,
                      {
                          lastUserId: userData?.uid,
                          lastUpdate: currentDate,
                          lastComment: observationComment,
                      },
                  ]
                : [
                      {
                          lastUserId: userData?.uid,
                          lastUpdate: currentDate,
                          lastComment: observationComment,
                      },
                  ],
        });
    };

    const getOrders = useCallback(async () => {
        const allOrdersData = await getAllOrders();
        allOrdersData && setOrdersData(allOrdersData);
    }, []);

    const getPatients = useCallback(async () => {
        const allPatientsData = await getAllPatients();
        allPatientsData && setPatientsData(allPatientsData);
    }, []);

    const getAreas = useCallback(async () => {
        const allAreasData = await getAllAreasOptions();
        allAreasData && setAllAreas(allAreasData);
    }, []);

    const getCampus = useCallback(async () => {
        const allCampusData = await getAllCampusOptions();
        allCampusData && setAllCampus(allCampusData);
    }, []);

    useEffect(() => {
        getOrders();
        getPatients();
        getAreas();
        getCampus();
    }, [getOrders, getPatients, getAreas, getCampus]);

    useEffect(() => {
        currentOrderData?.[
            userRol?.name.substring(0, 3).toLocaleLowerCase() +
                "ObservationComment"
        ] &&
            setObservationComment(
                currentOrderData?.[
                    userRol?.name.substring(0, 3).toLocaleLowerCase() +
                        "ObservationComment"
                ],
            );
    }, [currentOrderData, userRol?.name]);

    return {
        userRol,
        area,
        allAreas: _.sortBy(areasByCampus(), "label"),
        expandReceptionData,
        setExpandReceptionData,
        expandSpecialist,
        setExpandSpecialist,
        expandRx1,
        setExpandRx1,
        expandRx2,
        setExpandRx2,
        expandRx3,
        setExpandRx3,
        expandRx4,
        setExpandRx4,
        expandRx5,
        setExpandRx5,
        selectedDiagnosis,
        setSelectedDiagnosis,
        selectedSuppliers,
        setSelectedSuppliers,
        orderAndPatientData,
        handleChecks,
        selectChangeHandlerSentTo,
        detailStep,
        setDetailStep,
        handleSendForm,
        commentChangeHandler,
        setDiagnosticImpressionComment,
        observationComment,
        diagnosticImpressionComment,
        areaSelected,
        setAreaSelected,
        backToOrder,
        backToDetail,
        fileName,
        handleFileChange,
    };
};

export default DetailsHook;
