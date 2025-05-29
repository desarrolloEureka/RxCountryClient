'use client';
import useAuth from '@/app/firebase/auth';
import {
  arrayUnionFb,
  getAllAreasOptions,
  getAllFunctionaries,
  getAllOrders,
  getAllPatients,
  getAllProfessionals,
  updateDocumentsByIdFb,
} from '@/app/firebase/documents';
import { AreasSelector } from '@/app/types/areas';
import { Order, OrdersByRol } from '@/app/types/order';
import { DataPatientObject } from '@/app/types/patient';
import { DataProfessionalObject } from '@/app/types/professionals';
import _ from 'lodash';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

const OrderHistorialHook = () => {
  const { userData, userRol, user } = useAuth();

  const { campus = '', area = '', uid = '' } = userData || {};

  const searchParams = useSearchParams();

  const fromEdit = searchParams.get('to');

  const router = useRouter();

  const currentDate = moment().format();

  const [showFilter, setShowFilter] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('send');
  const [search, setSearch] = useState('');
  const [orderId, setOrderId] = useState<any>();
  // const [defaultOption, setDefaultOption] = useState<any>("uid");

  // filters
  const [orderMinorMajor, setOrderMinorMajor] = useState(false);
  const [nameAZ, setNameAZ] = useState(false);
  const [dateMinorMajor, setDateMinorMajor] = useState(false);
  const [dateMajorMinor, setDateMajorMinor] = useState(false);
  const [all, setAll] = useState(false);

  const [ordersData, setOrdersData] = useState<any>();
  const [patientsData, setPatientsData] = useState<any>();
  const [functionaryData, setFunctionaryData] = useState<any>();
  const [professionalsData, setProfessionalsData] = useState<any>();
  const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [helperText, setHelperText] = useState<string>('');

  const totalItems: number = 30;

  // const [itemsPerPage, setItemsPerPage] = useState<number>(totalItems);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const formatearFecha = (fechaISO: string): string => {
    return moment(fechaISO).format('DD/MM/YYYY HH:mm:ss');
  };

  // console.log('ordersData???????', ordersData);

  const allDataOrders = ordersData?.flatMap((order: Order) => {
    const patient = patientsData?.find(
      (patient: DataPatientObject) => patient.uid === order.patientId
    );

    if (patient) {
      const { id, name, lastName, phone, email, idType } = patient;
      return { ...order, id, name, lastName, phone, email, idType };
    }

    return [];
  });

  // console.log('allDataOrders>>>', allDataOrders);

  const ordersByRol: OrdersByRol = {
    //Profesional
    ZWb0Zs42lnKOjetXH5lq: {
      // received: allDataOrders?.filter(
      //     (order: any) => order.status === "enviada",
      // ),
      send: allDataOrders?.filter(
        (order: any) =>
          order.createdBy.userRol === userRol?.uid &&
          order.createdBy.userId === uid
      ),
    },
    //Recepción
    Ll6KGdzqdtmLLk0D5jhk: {
      received: allDataOrders?.filter(
        (order: any) =>
          // order.modifiedBy.userRolId === userRol?.uid &&
          // order.assignedCampus === campus &&
          order.status === 'enviada'
      ),
      send: allDataOrders?.filter(
        (order: any) =>
          // order.createdBy.userRol === userRol?.uid &&
          order.status === 'asignada' || order.status === 'reasignada' || order.status === 'finalizada'
      ),
    },
    //Modelos
    g9xGywTJG7WSJ5o1bTsH: {
      received: allDataOrders?.filter(
        (order: any) =>
          order.assignedCampus === campus &&
          (order.status === 'asignada' || order.status === 'reasignada') &&
          (Array.isArray(order.sendTo)
            ? order.sendTo.some(
                (item: any) => item.value === area && !item.edited
              ) // Validación para array
            : order.sendTo === area) // Validación para string
      ),
      send: allDataOrders?.filter((order: any) => {
        console.log('area>>>>>>><', area);
        console.log('order.completedAreas', order.completedAreas);

        // Validaciones adicionales para `sendTo`
        return Array.isArray(order.sendTo)
          ? order.sendTo.some((item: any) => item.value === area && item.edited) // Validación para array
          : order.sendTo === area; // Validación para string
      }),
    },
    //Fotografía
    c24R4P0VcQmQT0VT6nfo: {
      received: allDataOrders?.filter(
        (order: any) =>
          order.assignedCampus === campus &&
          (order.status === 'asignada' || order.status === 'reasignada') &&
          (Array.isArray(order.sendTo)
            ? order.sendTo.some(
                (item: any) => item.value === area && !item.edited
              ) // Validación para array
            : order.sendTo === area) // Validación para string
      ),
      send: allDataOrders?.filter((order: any) => {
        console.log('area>>>>>>><', area);
        console.log('order.completedAreas', order.completedAreas);

        // Validaciones adicionales para `sendTo`
        return Array.isArray(order.sendTo)
          ? order.sendTo.some((item: any) => item.value === area && item.edited) // Validación para array
          : order.sendTo === area; // Validación para string
      }),
    },
    //Laboratorio
    chbFffCzpRibjYRyoWIx: {
      received: allDataOrders?.filter(
        (order: any) =>
          order.assignedCampus === campus &&
          (order.status === 'asignada' || order.status === 'reasignada') &&
          (Array.isArray(order.sendTo)
            ? order.sendTo.some(
                (item: any) => item.value === area && !item.edited
              ) // Validación para array
            : order.sendTo === area) // Validación para string
      ),
      send: allDataOrders?.filter((order: any) => {
        console.log('area>>>>>>><', area);
        console.log('order.completedAreas', order.completedAreas);

        // Validaciones adicionales para `sendTo`
        return Array.isArray(order.sendTo)
          ? order.sendTo.some((item: any) => item.value === area && item.edited) // Validación para array
          : order.sendTo === area; // Validación para string
      }),
    },
    //Radiología
    V5iMSnSlSYsiSDFs4UpI: {
      received: allDataOrders?.filter(
        (order: any) =>
          order.assignedCampus === campus &&
          (order.status === 'asignada' || order.status === 'reasignada') &&
          (Array.isArray(order.sendTo)
            ? order.sendTo.some(
                (item: any) => item.value === area && !item.edited
              ) // Validación para array
            : order.sendTo === area) // Validación para string
      ),
      send: allDataOrders?.filter((order: any) => {
        console.log('area>>>>>>><', area);
        console.log('order.completedAreas', order.completedAreas);

        // Validaciones adicionales para `sendTo`
        return Array.isArray(order.sendTo)
          ? order.sendTo.some((item: any) => item.value === area && item.edited) // Validación para array
          : order.sendTo === area; // Validación para string
      }),
    },
    //Diagnostico
    wGU4GU8oDosW4ayQtxqT: {
      received: allDataOrders?.filter(
        (order: any) =>
          order.assignedCampus === campus &&
          (order.status === 'asignada' || order.status === 'reasignada') &&
          (Array.isArray(order.sendTo)
            ? order.sendTo.some(
                (item: any) => item.value === area && !item.edited
              ) // Validación para array
            : order.sendTo === area) // Validación para string
      ),
      send: allDataOrders?.filter((order: any) => {
        console.log('area>>>>>>><', area);
        console.log('order.completedAreas', order.completedAreas);

        // Validaciones adicionales para `sendTo`
        return Array.isArray(order.sendTo)
          ? order.sendTo.some((item: any) => item.value === area && item.edited) // Validación para array
          : order.sendTo === area; // Validación para string
      }),
    },
    //Escáner Digital
    VEGkDuMXs2mCGxXUPCWI: {
      received: allDataOrders?.filter(
        (order: any) =>
          order.assignedCampus === campus &&
          (order.status === 'asignada' || order.status === 'reasignada') &&
          (Array.isArray(order.sendTo)
            ? order.sendTo.some(
                (item: any) => item.value === area && !item.edited
              ) // Validación para array
            : order.sendTo === area) // Validación para string
      ),
      send: allDataOrders?.filter((order: any) => {
        console.log('area>>>>>>><', area);
        console.log('order.completedAreas', order.completedAreas);

        // Validaciones adicionales para `sendTo`
        return Array.isArray(order.sendTo)
          ? order.sendTo.some((item: any) => item.value === area && item.edited) // Validación para array
          : order.sendTo === area; // Validación para string
      }),
    },
    //Despacho
    ['9RZ9uhaiwMC7VcTyIzhl']: {
      received: allDataOrders?.filter(
        (order: any) =>
          order.assignedCampus === campus &&
          order.status === 'asignada' &&
          (Array.isArray(order.sendTo)
            ? order.sendTo.some((item: any) => item.value === area) // Validación para array
            : order.sendTo === area) // Validación para string
      ),
      send: allDataOrders?.filter(
        (order: any) =>
          order.assignedCampus === campus &&
          order.status === 'finalizada' &&
          (Array.isArray(order.sendTo)
            ? order.sendTo.some((item: any) => item.value === area) // Validación para array
            : order.sendTo === area) // Validación para string
      ),
      reassigned: allDataOrders?.filter(
        (order: any) =>
          order.modifiedBy.userRolId === userRol?.uid &&
          order.assignedCampus === campus &&
          order.status === 'reasignada' &&
          (Array.isArray(order.sendTo)
            ? order.sendTo.some((item: any) => item.value === area) // Validación para array
            : order.sendTo === area) // Validación para string
      ),
    },
  };

  // console.log('area??????', area);

  // console.log('campus', campus);

  // console.log('ordersByRol', ordersByRol);
  const orderList = ordersByRol[userRol?.uid!]?.[selectedOrder];

  // Nuevo estado para el área seleccionada
  const [selectedArea, setSelectedArea] = useState<string | null>(null);  
  
  // Nuevo estado para el área seleccionada
  const [selectedCampus, setSelectedSede] = useState<string | null>(null);  
  
  let filteredOrders: any[] = orderList?.filter((order: any) => {
    const itemDate = moment(order.timestamp);
    const start = value.startDate ? moment(value.startDate) : null;
    const end = value.endDate ? moment(value.endDate) : null;

    const isWithinDateRange =
      (!start || itemDate.isSameOrAfter(start, 'day')) &&
      (!end || itemDate.isSameOrBefore(end, 'day'));

    const matchesSearchTerm =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.lastName.toLowerCase().includes(search.toLowerCase()) ||
      order.uid.toLowerCase().includes(search.toLowerCase());

    // Filtro por área
    const matchesAreaSearch =
    !selectedArea ||
    (Array.isArray(order.areaList) &&
      order.areaList.some((item: string) =>
        item.toLowerCase() === selectedArea.toLowerCase()
      ));

    // Filtro por Campus
    // const matchesCampusSearch =
    // !selectedCampus ||
    // order.assignedCampus.toLowerCase().includes(selectedCampus.toLowerCase());
    const matchesCampusSearch =
    selectedCampus === "sin_sede"
      ? !order.assignedCampus // Incluye registros sin sede (null, undefined o "")
      : !selectedCampus || 
        order.assignedCampus.toLowerCase().includes(selectedCampus.toLowerCase());


    return isWithinDateRange && matchesSearchTerm && matchesAreaSearch && matchesCampusSearch;
  });
  console.log("Pedidos filtrados:", filteredOrders);
  const totalOrders = filteredOrders?.length || 0;
  console.log("Total órdenes:", totalOrders);


  const filterByArea = (selectedOption : { value: string; label: string }| null ) => {
    setSelectedArea(selectedOption?.value || null);
    return selectedOption?.label ;
  }
  
  // const filterBySede = (selectedOption : { value: string; label: string }| null ) => {
  //   setSelectedSede(selectedOption?.value || null);
  //   return selectedOption?.label ;
  // }
  const filterBySede = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption?.value === "sin_sede") {
      setSelectedSede("sin_sede"); // Valor específico para registros sin sede
    } else {
      setSelectedSede(selectedOption?.value || null);
    }
    return selectedOption?.label;
  };
  


  filteredOrders = _.sortBy(filteredOrders, (obj) =>
    parseInt(obj.uid, 10)
  ).reverse();

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  filteredOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  if (orderMinorMajor) {
    filteredOrders = _.sortBy(filteredOrders, (obj) => parseInt(obj.uid, 10));
  }

  if (nameAZ) {
    filteredOrders = _.sortBy(filteredOrders, (obj) => obj.name);
  }

  if (dateMinorMajor) {
    filteredOrders = _.sortBy(filteredOrders, (obj) => obj.timestamp);
  }
  if (dateMajorMinor) {
    filteredOrders = _.sortBy(filteredOrders, (obj) => obj.timestamp).reverse();
  }

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (!value) {
      setHelperText('');
    }
  };

  const setStatusOpenOrder = async (uid: string) => {
    const orderRef = 'serviceOrders';
    const modifiedBy = {
      userRolId: userRol?.uid,
      userId: userData?.uid,
    };
    console.log('si se modificó al abrir');
    await updateDocumentsByIdFb(
      uid,
      {
        modifiedBy,
        assignedCampus: campus ? campus : '',
        updateLog: arrayUnionFb({
          lastUserId: userData?.uid,
          lastUpdate: currentDate,
          lastComment: 'La orden fue abierta',
        }),
        // timestamp,
      },
      orderRef
    );
  };

  const getOrderStatus = (item: any) => {
    const isModifiedByUser = item.modifiedBy.userRolId === userRol?.uid;
    const isEditingByUser = '';
    const isSentToUserArea = item.sendTo === area;

    if (item.status !== 'finalizada') {
      if (!item.sendTo && userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq') {
        return isModifiedByUser ? 'leída' : 'recibida';
      }

      if (isSentToUserArea) {
        return isModifiedByUser ? 'leída' : 'recibida';
      }
    }

    return item.status;
  };

  const getAreaNameOld = (areaId: string): string | undefined => {
    const result: string | undefined = allAreas?.find(
      (item) => item.value === areaId
    )?.label;
    return result;
  }; // esta funcion es reemplazada con getAreaName se podría eliminar

  const getAreaName = (areaId: any[] | any): string | undefined => {
    if (Array.isArray(areaId)) {
      const result = areaId.map((item: any) => item.label).join(', ');
      return result;
    } else {
      const result: string | undefined = allAreas?.find(
        (item) => item.value === areaId
      )?.label;
      return result;
    }
  };

  const getLastUserData = (id: string) => {
    const functionary: DataProfessionalObject = functionaryData?.find(
      (functionary: DataProfessionalObject) => functionary.uid === id
    );

    const professional: DataProfessionalObject = professionalsData?.find(
      (professional: DataProfessionalObject) => professional.uid === id
    );
    const result = functionary || professional;

    return result ? result.name : 'Sin nombre';

  };

  const downloadCSV = (array: any[], tableTitle: string) => {
    const link = document.createElement('a');
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv == null) return;

    const filename = `${tableTitle}.csv`;

    // Codificar el contenido del CSV
    const encodedCSV = encodeURIComponent(csv);

    // Crear el enlace de descarga con la cadena codificada
    const dataURI = `data:text/csv;charset=utf-8,${encodedCSV}`;

    link.setAttribute('href', dataURI);
    link.setAttribute('download', filename);
    link.click();
  };

  const convertArrayOfObjectsToCSV = (array: object[]): string => {
    let result: string;

    const columnDelimiter = ',';
    const lineDelimiter = '\n';
    const keys = Object.keys(array[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item: any) => {
      let ctr = 0;
      keys.forEach((key: string) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };

  const getOrders = useCallback(async () => {
    const allOrdersData = await getAllOrders();
    allOrdersData && setOrdersData(allOrdersData);
  }, []);

  const getPatients = useCallback(async () => {
    const allPatientsData = await getAllPatients();
    allPatientsData && setPatientsData(allPatientsData);
  }, []);

  const getFunctionary = useCallback(async () => {
    const allFunctionaryData = await getAllFunctionaries();
    allFunctionaryData && setFunctionaryData(allFunctionaryData);
  }, []);

  const getProfessionals = useCallback(async () => {
    const allProfessionalsData = await getAllProfessionals();
    allProfessionalsData && setProfessionalsData(allProfessionalsData);
  }, []);

  const getAreas = useCallback(async () => {
    const allAreasData = await getAllAreasOptions();
    allAreasData && setAllAreas(allAreasData);
    console.log("allAreasData");
    console.log(allAreasData);
  }, []);

  useEffect(() => {
    getAreas();
    getOrders();
    getPatients();
    getFunctionary();
    getProfessionals();
  }, [getOrders, getPatients, getFunctionary, getProfessionals, getAreas]);

  useEffect(() => {
    if (
      userRol?.uid &&
      userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
      !searchParams.has('to')
    ) {
      setSelectedOrder('received');
    } else {
      setSelectedOrder('send');
    }
  }, [userRol, searchParams, userData]);

  useEffect(() => {
    if (searchParams.has('to') && fromEdit === 'send') {
      setSelectedOrder(fromEdit);
    }
  }, [fromEdit, searchParams]);

  useEffect(() => {
    const allowedRoles: string[] = [
      'wGU4GU8oDosW4ayQtxqT',
      'g9xGywTJG7WSJ5o1bTsH',
      'chbFffCzpRibjYRyoWIx',
      'c24R4P0VcQmQT0VT6nfo',
      'ZWb0Zs42lnKOjetXH5lq',
      '1cxJ0a8uCX7OTesEHT2G',
      '9RZ9uhaiwMC7VcTyIzhl',
      'FHSly0jguw1lwYSj8EHV',
      'Ll6KGdzqdtmLLk0D5jhk',
      'V5iMSnSlSYsiSDFs4UpI',
      'VEGkDuMXs2mCGxXUPCWI',
    ];

    const userRoleId = localStorage.getItem('userRoleId') ?? '';

    if (userData && !allowedRoles.includes(userRoleId as string)) {
      router.replace('/dashboard');
      return;
    }

    if (!user && !userRoleId) {
      router.replace('/sign-in');
      return;
    }
  }, [router, user, userData]);

  return {
    userArea: area,
    getAreaName,
    router,
    showFilter,
    setShowFilter,
    showHelp,
    setShowHelp,
    setHelperText,
    selectedOrder,
    setSelectedOrder,
    userRol,
    orderMinorMajor,
    setOrderMinorMajor,
    nameAZ,
    setNameAZ,
    dateMinorMajor,
    setDateMinorMajor,
    dateMajorMinor,
    setDateMajorMinor,
    all,
    setAll,
    allDataOrders,
    ordersByRol,
    formatearFecha,
    handleSearchInputChange,
    filteredOrders,
    helperText,
    showPdf,
    setShowPdf,
    orderId,
    setOrderId,
    downloadCSV,
    value,
    handleValueChange,
    // backToOrder,
    handlePreviousPage,
    handleNextPage,
    currentPage,
    totalPages,
    setItemsPerPage,
    ordersData,
    setCurrentPage,
    setStatusOpenOrder,
    getOrderStatus,
    getLastUserData,
    itemsPerPage,
    totalItems,
    user,
    orderList,
    allAreas,
    filterByArea,
    filterBySede,
    totalOrders,
  };
};

export default OrderHistorialHook;
