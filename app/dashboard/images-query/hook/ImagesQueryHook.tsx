'use client';
import useAuth from '@/app/firebase/auth';
import {
  getAllFunctionaries,
  getAllOrders,
  getAllPatients,
  getAllProfessionals,
  getAllAreasOptions,
  getAllCampusOptions,
  
} from '@/app/firebase/documents';
import { Order, OrdersImagesByRol } from '@/app/types/order';
import { DataPatientObject } from '@/app/types/patient';
import { DataProfessionalObject } from '@/app/types/professionals';
import _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { AreasSelector } from '@/app/types/areas';
import { CampusSelector } from '@/app/types/campus';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

const ImagesQueryHook = () => {
  const router = useRouter();
  const { userData, userRol, user } = useAuth();
  const { campus = '', area = '', uid = '' } = userData || {};

  const [showFilter, setShowFilter] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [search, setSearch] = useState('');
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

  const [currentPage, setCurrentPage] = useState(1);

  const [helperText, setHelperText] = useState<string>('');

  const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);

  const [allCampus, setAllCampus] = useState<CampusSelector[]>([]);
  
  const [itemsPerPage, setItemsPerPage] = useState(30);

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const formatearFecha = (fechaISO: string): string => {
    return moment(fechaISO).format('DD/MM/YYYY HH:mm:ss');
  };

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

  const ordersImagesByRol: OrdersImagesByRol = {
    //Profesional
    ZWb0Zs42lnKOjetXH5lq: allDataOrders?.filter(
      (order: any) =>
        order.createdBy.userRol === userRol?.uid &&
        order.createdBy.userId === uid
      // order.modifiedBy.userRolId === userRol?.uid
      // order.status === "finalizada",
    ),

    //Recepción
    Ll6KGdzqdtmLLk0D5jhk: allDataOrders,

    //Modelos
    g9xGywTJG7WSJ5o1bTsH: allDataOrders,

    //Fotografía
    c24R4P0VcQmQT0VT6nfo: allDataOrders,

    //Laboratorio
    chbFffCzpRibjYRyoWIx: allDataOrders,

    //Radiología
    V5iMSnSlSYsiSDFs4UpI: allDataOrders,

    //Diagnostico
    wGU4GU8oDosW4ayQtxqT: allDataOrders,

    //Escáner Digital
    VEGkDuMXs2mCGxXUPCWI: allDataOrders,

    //Despacho
    ['9RZ9uhaiwMC7VcTyIzhl']: allDataOrders,

    //Paciente
    ShHQKRuKJfxHcV70XSvC: allDataOrders?.filter(
      (order: any) =>
        // order.status === "finalizada" &&
        // !_.isEmpty(order.orderImagesUrl) &&
        order.patientId === uid
    ),
  };

  const orderList = ordersImagesByRol[userRol?.uid!];

  // Nuevo estado para el área seleccionada
  const [selectedArea, setSelectedArea] = useState<string | null>(null);  
  
  // Nuevo estado para el área seleccionada
  const [selectedCampus, setSelectedSede] = useState<string | null>(null);  
  
  console.log("orderList", orderList);

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
      console.log("selectedArea", selectedArea);
       console.log("order.areaList:", order.areaList);
   

    // Filtro por Campus
    const matchesCampusSearch =
    !selectedCampus ||
    order.assignedCampus.toLowerCase().includes(selectedCampus.toLowerCase());
    // (Array.isArray(order.assignedCampus) &&
    //   order.assignedCampus.some((item: string) =>
    //     item.toLowerCase() === selectedCampus.toLowerCase()
    //   ));
       console.log("selectedCampus", selectedCampus);
      console.log("order.assignedCampus:", order.assignedCampus);
     return isWithinDateRange && matchesSearchTerm && matchesAreaSearch && matchesCampusSearch;
   });

   console.log("Pedidos filtrados:", filteredOrders);
   
  const filterByArea = (selectedOption : { value: string; label: string }| null ) => {
    setSelectedArea(selectedOption?.value || null);
    return selectedOption?.label ;
  }
  
  const filterBySede = (selectedOption : { value: string; label: string }| null ) => {
    setSelectedSede(selectedOption?.value || null);
    return selectedOption?.label ;
  }


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

  const getOrderStatus = (item: any) => {
    const isModifiedByUser = item.modifiedBy.userRolId === userRol?.uid;
    const isSentToUserArea = item.sendTo === area;

    if (!item.sendTo && userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq') {
      return isModifiedByUser ? 'leída' : 'recibida';
    }

    if (isSentToUserArea) {
      return isModifiedByUser ? 'leída' : 'recibida';
    }

    return item.status;
  };

  const getLastUserData = (id: string) => {
    const functionary: DataProfessionalObject = functionaryData?.find(
      (functionary: DataProfessionalObject) => functionary.uid === id
    );

    const professional: DataProfessionalObject = professionalsData?.find(
      (professional: DataProfessionalObject) => professional.uid === id
    );
    const result = functionary || professional;

    return result.name;
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

    const getCampus = useCallback(async () => {
      const allCampusData = await getAllCampusOptions();
      allCampusData && setAllCampus(allCampusData);
      console.log("allCampusData");
      console.log(allCampusData);
    }, []);


  useEffect(() => {
    getCampus();
    getAreas();
    getOrders();
    getPatients();
    getFunctionary();
    getProfessionals();
  }, [getOrders, getPatients, getFunctionary, getProfessionals]);

  useEffect(() => {
    const userRoleId = localStorage.getItem('userRoleId') ?? '';

    if (!user && !userRoleId) {
      router.replace('/sign-in');
      return;
    }
  }, [router, user]);

  return {
    handleSearchInputChange,
    handleValueChange,
    value,
    router,
    showFilter,
    setShowFilter,
    showHelp,
    setShowHelp,
    helperText,
    setHelperText,
    userData,
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
    downloadCSV,
    filteredOrders,
    handlePreviousPage,
    handleNextPage,
    currentPage,
    totalPages,
    setItemsPerPage,
    ordersData,
    setCurrentPage,
    formatearFecha,
    getLastUserData,
    getOrderStatus,
    user,
    allAreas,
    filterByArea,
    filterBySede,
  };
};

export default ImagesQueryHook;
