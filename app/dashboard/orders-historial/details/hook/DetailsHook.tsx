import useAuth from "@/app/firebase/auth";
import {
    getAllAreasOptions,
    getAllCampusOptions,
    getAllOrders,
    getAllPatients,
    getDocumentRef,
    saveOneDocumentFb,
} from "@/app/firebase/documents";
import { AreasSelector } from "@/app/types/areas";
import { CampusSelector } from "@/app/types/campus";
import { EditedOrderStatusByRol, Order } from "@/app/types/order";
import { Patient } from "@/app/types/patient";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

type Props = {
    // setDataSelected: (e: any) => void;
    slug: string;
};

const DetailsHook = ({ slug }: Props) => {
    const { userRol, userData } = useAuth();

    const { campus } = userData;

    const [expandReceptionData, setExpandReceptionData] = useState(false);
    const [expandSpecialist, setExpandSpecialist] = useState(false);
    const [expandRx1, setExpandRx1] = useState(false);
    const [expandRx2, setExpandRx2] = useState(false);
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

    const selectChangeHandlerSentTo = (e: any) => {
        setSentToArea(e?.value);
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
        Profesional: "enviada",
        Recepción: "leída",
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

        // console.log({
        //     ...currentOrderData,
        //     status: editedOrderStatusByRol[userRol],
        //     sendTo: sentToArea ? sentToArea : currentOrderData.sendTo,
        //     modifiedBy: userRol,
        //     assignedCampus: campus,
        //     [userRol?.substring(0, 3).toLocaleLowerCase() +
        //     "ObservationComment"]: observationComment
        //         ? observationComment
        //         : currentOrderData?.[
        //               userRol?.substring(0, 3).toLocaleLowerCase() +
        //                   "ObservationComment"
        //           ]
        //         ? currentOrderData?.[
        //               userRol?.substring(0, 3).toLocaleLowerCase() +
        //                   "ObservationComment"
        //           ]
        //         : "",
        //     diagnosticImpressionComment: diagnosticImpressionComment
        //         ? diagnosticImpressionComment
        //         : currentOrderData.diagnosticImpressionComment,
        // });

        await saveOneDocumentFb(documentEditOrderRef, {
            ...currentOrderData,
            status: editedOrderStatusByRol[userRol],
            sendTo: sentToArea ? sentToArea : currentOrderData.sendTo,
            modifiedBy: userRol,
            assignedCampus: campus,
            [userRol?.substring(0, 3).toLocaleLowerCase() +
            "ObservationComment"]: observationComment
                ? observationComment
                : currentOrderData?.[
                      userRol?.substring(0, 3).toLocaleLowerCase() +
                          "ObservationComment"
                  ]
                ? currentOrderData?.[
                      userRol?.substring(0, 3).toLocaleLowerCase() +
                          "ObservationComment"
                  ]
                : "",
            diagnosticImpressionComment: diagnosticImpressionComment
                ? diagnosticImpressionComment
                : currentOrderData.diagnosticImpressionComment,
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

    return {
        userRol,
        allAreas: _.sortBy(areasByCampus(), "label"),
        expandReceptionData,
        setExpandReceptionData,
        expandSpecialist,
        setExpandSpecialist,
        expandRx1,
        setExpandRx1,
        expandRx2,
        setExpandRx2,
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
        setObservationComment,
        setDiagnosticImpressionComment,
        observationComment,
        diagnosticImpressionComment,
    };
};

export default DetailsHook;
