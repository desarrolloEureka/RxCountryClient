import { titles, widthSlider } from '@/app/component/constants/formConstants';
import { dataAllOptions } from '@/app/data/documentsData';
import { dataPatientObject } from '@/app/data/patientData';
import useAuth from '@/app/firebase/auth';
import {
  getAllAreasOptions,
  getAllCampusOptions,
  getAllDiagnosesOptions,
  getAllDiagnosticianOptions,
  getAllOptions,
  getAllPatients,
  getDocumentRef,
  saveOneDocumentFb,
  updateDocumentsByIdFb,
} from '@/app/firebase/documents';
import { AreasSelector } from '@/app/types/areas';
import { CampusSelector } from '@/app/types/campus';
// import { EditedOrderStatusByRol } from "@/app/types/order";
import { uploadFile } from '@/app/firebase/files';
import useDebounce from '@/app/hook/useDebounce';
import { DiagnosesSelector } from '@/app/types/diagnoses';
import { DiagnosticianSelector } from '@/app/types/diagnostician';
import {
  datePickerProps,
  EditedOrderStatusByRol,
  updateOrderProps,
} from '@/app/types/order';
import { DataPatientObject } from '@/app/types/patient';
import { handleSendFinishedOrderEmail } from '@/lib/brevo/handlers/actions';
import { db } from '@/shared/firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import _ from 'lodash';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { getAllDocumentsFb } from '@/app/firebase/documents';

type Props = {
  // setDataSelected: (e: any) => void;
  slug: string;
};

const calculateAge = (birthDate: Date | string): number => {
  // Convierte el birthDate a un objeto de tipo moment
  const birthDay = moment(birthDate);
  const today = moment(); // Fecha actual

  // Calcula la diferencia en años
  let age = today.diff(birthDay, 'years');

  // Verifica si la fecha de cumpleaños ya ocurrió este año
  if (today.isBefore(birthDay.add(age, 'years'))) {
    age--;
  }

  // Si la edad es negativa, ajustarla a 0
  if (age < 0) {
    age = 0;
  }

  return age;
};


const EditOrderHook = ({ slug }: Props) => {

  const [professionals, setProfessionals] = useState<any[]>([]);

  const [flag, setFlag] = useState<boolean>(false);

  const { userRol, userData, user } = useAuth();

  const router = useRouter();

  const { campus = '', area = '', uid = '' } = userData || {};
 
  const currentDate = moment().format();

  const [showHelp, setShowHelp] = useState(false);

  const [formStep, setFormStep] = useState(0);

  //*Aquí para cambiar de vista de edición
  const [isEdit, setIsEdit] = useState(true);

  const [isDataSelected, setIsDataSelected] = useState(false);

  // const [isLoaded, setIisLoaded] = useState(false);

  const [isOrderIncomplete, setIsOrderIncomplete] = useState<boolean>(false);

  const [selectedOptions, setSelectedOptions] = useState<any>();

  const [optionsData, setOptionsData] = useState<any>(dataAllOptions);

  const [orderData, setOrderData] = useState<any>();

  const [patientData, setPatientData] = useState(dataPatientObject);

  const [oldPatientData, setOldPatientData] = useState(dataPatientObject);

  const [currentOrderId, setCurrentOrderId] = useState<number>(1);

  const [sentToArea, setSentToArea] = useState<any[]>([]);


  const [areaList, setAreaList] = useState<string[]>([]);

  const [diagnoses, setDiagnoses] = useState<string>('');

  const [diagnostician, setDiagnostician] = useState<string>('');

  const [uploadUrl, setUploadUrl] = useState<string>('');

  const [urlWeTransfer, setUrlWeTransfer] = useState<string>('');

  const [urlDropbox, setUrlDropbox] = useState<string>('');

  const [modelType, setModelType] = useState<string>('T');

  // const [error, setError] = useState(false);

  const [allAreas, setAllAreas] = useState<AreasSelector[]>([]);

  const [allDiagnoses, setAllDiagnoses] = useState<DiagnosesSelector[]>([]);

  const [allDiagnostician, setAllDiagnostician] = useState<
    DiagnosticianSelector[]
  >([]);

  const [allCampus, setAllCampus] = useState<CampusSelector[]>([]);

  const [allPatients, setAllPatients] = useState<any>();

  const [showSave, setShowSave] = useState<boolean>(false);

  const [fileName, setFileName] = useState('Subir Archivo');
  const [fileNameSTL, setFileNameSTL] = useState('Subir Archivo');

  const [errorImg, setErrorImg] = useState<string | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [filesSTL, setFilesSTL] = useState<File[]>([]);

  const [selectedDiagnosisTwo, setSelectedDiagnosisTwo] = useState<string[]>(
    []
  );

  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);

  const [value, setValue] = useState<datePickerProps>({
    startDate: null,
    endDate: null,
  });

  const [suggestions, setSuggestions] = useState<DataPatientObject[]>([]);

  const oldDataOrder = orderData;

  const reference = 'serviceOrders';
  const patientRef = 'patients';

  const areasByCampus = () => {
    const filteredIdAreas = allCampus?.find(
      (item) => item.value === campus
    )?.areas;

    const completedAreas = (): string[] => {
      let result: string[] = [];
      if (
        oldDataOrder?.completedAreas &&
        !_.isEmpty(oldDataOrder?.completedAreas) &&
        area &&
        area !== '' &&
        userRol?.uid !== '9RZ9uhaiwMC7VcTyIzhl' &&
        userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk'
      ) {
        const areasCompleted = oldDataOrder?.completedAreas as string[];
        result = [
          'qxdH34kAupnAPSuVIIvn',
          'Wxdi41YreLGK0UiL2YQU',
          area,
          ...areasCompleted,
        ];
        return result;
      }
      result = ['qxdH34kAupnAPSuVIIvn', 'Wxdi41YreLGK0UiL2YQU', area];
      return result;
    };

    const areasOmitted: string[] = completedAreas();

    const availableAreasIds = filteredIdAreas?.filter(
      (item) => !areasOmitted?.includes(item)
    );

    const result = allAreas?.filter((area) =>
      availableAreasIds?.includes(area.value)
    );
    return result;
  };

  const changeHandler = (e: any) => {
    setPatientData({ ...patientData, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPatientData({ ...patientData, [e.target.name]: value });
    if (value.length > 0) {
      const filteredPatients = allPatients?.filter(
        (patient: DataPatientObject) => patient.id.includes(value)
      );
      setSuggestions(filteredPatients);
    } else {
      setSuggestions([]);
    }
  };

  const handleInputUrl = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    userRol?.uid !== 'VEGkDuMXs2mCGxXUPCWI' // Rol de Escáner Modelos Digital
      ? setUrlWeTransfer(value)
      : setUploadUrl(value);
  };

  const handleInputUrlDropbox = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrlDropbox(value);
  };

  const handleModelType = (e: any) => {
    const value = e.target.value;
    setModelType(value);
  };

  const selectChangeHandlerSentTo = (value: any) => {
    const arrayValue = Array.isArray(value) ? value : [value];
    setSentToArea(arrayValue);
  };
  

  const handleAreaList = (value: { label: string; value: string }[]) => {
    const list: string[] = value.map(
      (item: { value: string; label: string }) => item.value
    );
    setAreaList([...list, '0OaigBxmSmUa90dvawB1']);
  };

  const selectChangeHandlerDiagnoses = (value: any) => {
    setDiagnoses(value);
  };

  const selectChangeHandlerDiagnostician = (value: any) => {
    setDiagnostician(value);
  };

  const selectChangeHandlerIdType = (e: any) => {
    setPatientData({ ...patientData, ['idType']: e?.target.value });
  };

  const idChangeHandler = (id: string) => {
    const patient = suggestions?.find(
      (patient: DataPatientObject) => patient.id === id
    );

    patient && setPatientData({ ...patient });
    setSuggestions([]);
  };

  const dateChangeHandler = (e: any) => {
    setValue(e);
    // const dateFormat = moment(e.target.value).format("YYYY-MM-DD");
    const dateFormat = value ? e.startDate : '';
    setPatientData({
      ...patientData,
      ['birthDate']: dateFormat,
      ['age']: dateFormat ? `${calculateAge(dateFormat)}` : '',
    });
  };

  const phoneChangeHandler = (e: any) => {
    setPatientData({ ...patientData, ['phone']: e });
  };

  const handleClose = () => {
    // setPatientData(dataPatientObject);
    // setError(false);
  };

  const handleChecks = (
    option: string,
    selected: string[],
    setSelected: (e: any) => void
  ) => {
    if (selected?.includes(option)) {
      let selectedList = selected.filter((item) => item !== option);
      setSelected(selectedList);
    } else {
      setSelected([...selected, option]);
    }
  };

  const MAX_FILE_SIZES = {
    image: 3000000,
    pdf: 10000000,
  };

  const handleFileChangeSTL = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files;

    if (!uploadFiles || uploadFiles.length === 0) {
      setFileNameSTL('Subir Archivo');
      setFilesSTL([]);
      return;
    }

    const validatedFiles: File[] = [...uploadFiles];

    setFileNameSTL(validatedFiles.map((file) => file.name).join(', '));
    setFilesSTL(validatedFiles);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadFiles = e.target.files;

    if (!uploadFiles || uploadFiles.length === 0) {
      resetFileInput();
      return;
    }

    // const validatedFiles: File[] = [];
    const validatedFiles: File[] = [...uploadFiles];
    const errors: string[] = [];

    // Array.from(uploadFiles).forEach((file) => {
    //     const fileType = file.type.split("/");
    //     if (
    //         userRol?.uid === "V5iMSnSlSYsiSDFs4UpI" || // Radiología
    //         userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl" // Despacho
    //     ) {
    //         handleUserRoleFile(file, fileType, validatedFiles, errors);
    //     } else if (userRol?.uid === "wGU4GU8oDosW4ayQtxqT") {
    //         // Diagnostico
    //         handleDefaultUserPDF(file, fileType, validatedFiles, errors);
    //     } else {
    //         handleDefaultUserFile(file, fileType, validatedFiles, errors);
    //     }
    // });

    if (errors.length > 0) {
      setErrorImg(errors.join('; '));
      resetFileInput();
    } else {
      setErrorImg(null);
      setFileName(validatedFiles.map((file) => file.name).join(', '));
      setFiles(validatedFiles);
    }
  };

  const handleUserRoleFile = (
    file: File,
    fileType: string[],
    validatedFiles: File[],
    errors: string[]
  ) => {
    if (fileType[0] === 'image') {
      validateFileSize(file, MAX_FILE_SIZES.image, validatedFiles, errors);
    } else if (fileType[1] === 'pdf') {
      validateFileSize(file, MAX_FILE_SIZES.pdf, validatedFiles, errors);
    } else {
      errors.push(`${file.name}: Solo se permite imágenes o PDF`);
    }
  };

  const handleDefaultUserFile = (
    file: File,
    fileType: string[],
    validatedFiles: File[],
    errors: string[]
  ) => {
    if (fileType[0] === 'image') {
      validateFileSize(file, MAX_FILE_SIZES.image, validatedFiles, errors);
    } else {
      errors.push(`${file.name}: Solo se permite imágenes`);
    }
  };

  const handleDefaultUserPDF = (
    file: File,
    fileType: string[],
    validatedFiles: File[],
    errors: string[]
  ) => {
    if (fileType[1] === 'pdf') {
      validateFileSize(file, MAX_FILE_SIZES.pdf, validatedFiles, errors);
    } else {
      setErrorImg('Solo se permite PDF');
      resetFileInput();
    }
  };

  const validateFileSize = (
    file: File,
    maxSize: number,
    validatedFiles: File[],
    errors: string[]
  ) => {
    if (file.size > maxSize) {
      const sizeInMb = maxSize / 1000000;
      errors.push(`${file.name}: El tamaño máximo es ${sizeInMb} MB`);
    } else {
      validatedFiles.push(file);
    }
  };

  const resetFileInput = () => {
    setFileName('Subir Archivo');
    setFiles([]);
  };

  // const handleCheckOrderIncomplete = (e: any) => {
  //   const value = e.target.checked;
  //   setIsOrderIncomplete(value);
  // };

  const handleCheckOrderIncomplete = (value: boolean) => {
    setIsOrderIncomplete(value);
  };
  

  const confirmAlert = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Se guardó correctamente en la información del paciente ${patientData.name} ${patientData.lastName}`,
      width: '900',
      confirmButtonColor: '#1f2937',
      background: '#404040',
      color: '#e9a225',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setFormStep((prevStep: number) => prevStep + 1);
        setOldPatientData(patientData);
        setPatientData(patientData);
      }
    });
  };

  const confirmAlertTwo = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Guardando...`,
      showConfirmButton: false,
      timer: 2000,
      background: '#404040',
      color: '#e9a225',
    }).then(() => {
      setFormStep((prevStep: number) => prevStep + 1);
    });
  };

  const editedOrderStatusByRol: EditedOrderStatusByRol = {
    //Profesional
    ZWb0Zs42lnKOjetXH5lq: 'enviada',
    //Recepción
    Ll6KGdzqdtmLLk0D5jhk: 'asignada',
    //Modelos
    g9xGywTJG7WSJ5o1bTsH: 'asignada',
    //Fotografía
    c24R4P0VcQmQT0VT6nfo: 'asignada',
    //Laboratorio
    chbFffCzpRibjYRyoWIx: 'asignada',
    //Radiología
    V5iMSnSlSYsiSDFs4UpI: 'asignada',
    //Diagnostico
    wGU4GU8oDosW4ayQtxqT: 'asignada',
    //Escáner Digital
    VEGkDuMXs2mCGxXUPCWI: 'asignada',
    //Despacho
    '9RZ9uhaiwMC7VcTyIzhl': isOrderIncomplete ? 'reasignada' : 'finalizada',
  };

  /**
   * Returns an array of property names that are unique to each object.
   * @param obj1 The first object.
   * @param obj2 The second object.
   * @returns An object with properties that are unique for each object.
   */
  const updateOrder = ({ obj1, obj2 }: updateOrderProps) => {
    // Get the union of keys from both objects
    const keys = _.union(Object.keys(obj1), Object.keys(obj2));

    // Find keys where the values are different
    const changedKeys = keys.filter((key) => !_.isEqual(obj1[key], obj2[key]));

    // Create an object with unique keys which will be saved
    const objectOmittedProp = _.pick(obj2, changedKeys);

    //Verify that the property has data
    const objectOmittedPropIsEmpty = _.omitBy(objectOmittedProp, _.isEmpty);

    //Ignores the property and returns the object
    return _.omit(objectOmittedPropIsEmpty, 'status');
  };

  const updateOrderData = useDebounce({
    callback: async ({ obj1, obj2 }) => {
      const orderRef = 'serviceOrders';
      const dataUpdated = updateOrder({ obj1, obj2 });
      // //console.log(dataUpdated);
      // await updateDocumentsByIdF(obj2?.uid, dataUpdated, orderRef);
    },
    wait: 600,
  });

  const getOrdersUrls = async (
    idOrder: string
  ): Promise<{
    images: string[];
    pdf: string[];
    STL: string[];
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
      (item) => item.value === campus
    )?.label;

    const areaFolder = allAreas?.find((item) => item.value === (area??sentToArea[0]?.value))
        ?.label as string
    
    const firstLetterCampus =
      campus && currentCampusName && currentCampusName.substring(0, 1);

    if (files.length > 0) {
      for (const record of files) {
        
          await uploadFile({
            folder: patientData?.id,
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

  const handleSendForm = async (e?: any,  areaSelected?: any) => {
    //console.log('areaSelected', areaSelected);
    e.preventDefault();
    e.stopPropagation();
    //console.log('Editó', showSave);
    // setIisLoaded(true);
    showSave ? await updatePatientData() : await uploadHandle(areaSelected);
    // handleClose();
  };

  const updatePatientData = async () => {
    await updateDocumentsByIdFb(
      oldPatientData.uid,
      { ...patientData, timestamp: currentDate },
      patientRef
    ).then(() => {
      setShowSave(false);
      confirmAlert();
    });
  };

  const uploadHandle = async (areaSelected: any) => {
    //console.log('oldDataOrder.uid', oldDataOrder.uid);
    //console.log('oldDataOrder?.completedAreas', oldDataOrder?.completedAreas);
    //console.log('area', area);
    //console.log('oldDataOrder?.sendTo', oldDataOrder?.sendTo);
    //console.log('userRol?.uid', userRol?.uid);
    //console.log('sentToArea', sentToArea);

    //para que no se totee el map por no ser un array sendToArray
    const rawSendTo = userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' ? sentToArea : oldDataOrder?.sendTo;
    const sendToArray = Array.isArray(rawSendTo) ? rawSendTo : [];

    const addEdited = () =>
      sendToArray?.map((val: any) => {
        //console.log('addddddddd', val.value, area);
        //console.log('addddddddd1', val);
        val.value == area && (val.edited = true);
        //console.log('areaSelected', areaSelected);
        areaSelected && areaSelected.value && val.value == areaSelected.value && (val.edited = false); // se valida el area a donde se va a redirigir y se cambia a false
        return val;
      });

    const removeEdited = () =>
      sendToArray?.map((val: any) => {
        //console.log('removeEditeddddddd', val.value, area);
        val.edited = false;
        return val;
      });

    const newSendTo =
      userRol?.uid == 'qxdH34kAupnAPSuVIIvn' ||
      userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk'
        ? removeEdited()
        : addEdited();

    const documentEditOrderRef: any = getDocumentRef(
      reference,
      oldDataOrder.uid
    );

    const filesUrls = await getOrdersUrls(oldDataOrder.uid);

    const newOrderData = {
      ...oldDataOrder,
      ...selectedOptions,
      uid: oldDataOrder?.uid,
      patientId: oldDataOrder?.patientId,
      status: editedOrderStatusByRol[userRol?.uid!],
      assignedCampus: campus || '',
      completedAreas:
        userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq'
          ? oldDataOrder?.completedAreas &&
            !_.isEmpty(oldDataOrder?.completedAreas)
            ? oldDataOrder?.completedAreas.includes(area)
              ? oldDataOrder?.completedAreas
              : (area === '0OaigBxmSmUa90dvawB1' && isOrderIncomplete) ||
                area === 'qxdH34kAupnAPSuVIIvn'
              ? oldDataOrder?.completedAreas
              : [...oldDataOrder.completedAreas, area]
            : area === 'qxdH34kAupnAPSuVIIvn' ||
              (area === '0OaigBxmSmUa90dvawB1' && isOrderIncomplete)
            ? []
            : [area]
          : [],
      areaList,
      // oldDataOrder?.areaList && !_.isEmpty(oldDataOrder?.areaList)
      //     ? oldDataOrder?.areaList
      //     : areaList,
      // sendTo:
      //   sentToArea ||
      //   (userRol?.uid === 'VEGkDuMXs2mCGxXUPCWI' ||
      //   userRol?.uid === 'g9xGywTJG7WSJ5o1bTsH'
      //     ? '0OaigBxmSmUa90dvawB1'
      //     : oldDataOrder?.sendTo),
      // : userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl"
      // ? ""
      sendTo: newSendTo,
      isActive: true,
      isDeleted: false,
      modifiedBy: {
        userRolId: userRol?.uid,
        userId: userData?.uid,
      },
      orderImagesUrl: oldDataOrder?.orderImagesUrl
        ? [...oldDataOrder.orderImagesUrl, ...filesUrls.images]
        : filesUrls.images,
      orderPDFUrl: oldDataOrder?.orderPDFUrl
        ? [...oldDataOrder.orderPDFUrl, ...filesUrls.pdf]
        : filesUrls.pdf,
      orderSTLFiles: oldDataOrder?.orderSTLFiles
        ? [...oldDataOrder.orderSTLFiles, ...filesUrls.STL]
        : filesUrls.STL,
      urlDropbox:
        urlDropbox ||
        (oldDataOrder?.urlDropbox ? oldDataOrder?.urlDropbox : ''),
      urlWeTransfer:
        urlWeTransfer ||
        (oldDataOrder?.urlWeTransfer ? oldDataOrder?.urlWeTransfer : ''),
      fileLocation:
        uploadUrl ||
        (oldDataOrder?.fileLocation ? oldDataOrder?.fileLocation : ''),
      diagnoses:
        diagnoses || (oldDataOrder?.diagnoses ? oldDataOrder?.diagnoses : ''),
      diagnostician:
        diagnostician ||
        (oldDataOrder?.diagnostician ? oldDataOrder?.diagnostician : ''),
      updateLog: oldDataOrder?.updateLog
        ? [
            ...oldDataOrder.updateLog,
            {
              lastUserId: userData?.uid,
              lastUpdate: currentDate,
              lastComment:
                userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq'
                  ? selectedOptions?.observationComment?.message
                  : selectedOptions?.[
                      userRol?.name.substring(0, 3).toLocaleLowerCase() +
                        'ObservationComment'
                    ]?.message,
            },
          ]
        : [
            {
              lastUserId: userData?.uid,
              lastUpdate: currentDate,
              lastComment:
                userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq'
                  ? selectedOptions?.observationComment?.message
                  : selectedOptions?.[
                      userRol?.name.substring(0, 3).toLocaleLowerCase() +
                        'ObservationComment'
                    ]?.message,
            },
          ],
    };
    //console.log('newSendTo', newSendTo);

    const patientAndOrderData = {
      ...newOrderData,
      name: patientData.name,
      lastName: patientData.lastName,
      email: patientData.email,
      orderDate: moment(newOrderData.timestamp).format('DD/MM/YYYY HH:mm:ss'),
    };

    confirmAlertTwo();

    await saveOneDocumentFb(documentEditOrderRef, newOrderData).then(
      async (res: any) => {
        //console.log('res>>>>', res);

        !isOrderIncomplete &&
          userRol?.uid === '9RZ9uhaiwMC7VcTyIzhl' &&
          (await handleSendFinishedOrderEmail(patientAndOrderData));
        setCurrentOrderId(parseInt(res.id));
      }
    );
  };

  const getOptions = useCallback(async () => {
    const allOptionsData = await getAllOptions('rxCountryFront');
    allOptionsData && setOptionsData(allOptionsData);
  }, []);

  // const getOrder = useCallback(async () => {
  //     const order = await getOrderById(slug);
  //     order && setOrdersData(order);
  // }, [slug]);

  const getAreas = useCallback(async () => {
    const allAreasData = await getAllAreasOptions();
    allAreasData && setAllAreas(allAreasData);
  }, []);

  const getDiagnoses = useCallback(async () => {
    const allDiagnosesData = await getAllDiagnosesOptions();
    allDiagnosesData && setAllDiagnoses(allDiagnosesData);
  }, []);

  const getDiagnostician = useCallback(async () => {
    const allDiagnosticianData = await getAllDiagnosticianOptions();
    allDiagnosticianData && setAllDiagnostician(allDiagnosticianData);
  }, []);

  const getCampus = useCallback(async () => {
    const allCampusData = await getAllCampusOptions();
    allCampusData && setAllCampus(allCampusData);
  }, []);

  const getPatients = useCallback(async () => {
    const allPatientsData = await getAllPatients();
    allPatientsData && setAllPatients(allPatientsData);
  }, []);

  const saveNewPatientData = useCallback(() => {
    patientData &&
      oldPatientData &&
      setShowSave(!_.isEqual(patientData, oldPatientData));
  }, [patientData, oldPatientData]);

  const getData = useCallback(() => {
    if (isEdit) {
      const oldData = allPatients?.find(
        (patient: DataPatientObject) => patient.uid === oldDataOrder?.patientId
      );
      if (oldData) {
        setOldPatientData(oldData);
        setPatientData(oldData);
      }
    }
  }, [allPatients, isEdit, oldDataOrder?.patientId]);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const list = await getAllDocumentsFb("professionals"); // <-- ahora sí funcionará
        //console.log("Profesionales traídos:", list);
        setProfessionals(list);
      } catch (err) {
        console.error("No pude leer profesionales:", err);
      }
    };

    fetchProfessionals();
  }, []);


  useEffect(() => {
    const docRef = doc(db, 'serviceOrders', slug);

    const unsubscribe = onSnapshot(docRef, (querySnapshot) => {
      if (querySnapshot.exists()) {
        // const source = querySnapshot.metadata.hasPendingWrites
        //   ? 'Local'
        //   : 'Server';
        const data = querySnapshot.data();
        // //console.log("doc.data", data, source);
        setOrderData(data);
      }
    });

    return () => unsubscribe();
  }, [slug]);

  useEffect(() => {
    getOptions();
    // getOrder();
    getAreas();
    getCampus();
    getPatients();
    getDiagnoses();
    getDiagnostician();
  }, [
    getOptions,
    // getOrder,
    getAreas,
    getCampus,
    getPatients,
    getDiagnoses,
    getDiagnostician,
  ]);

  useEffect(() => {
    if (oldDataOrder) {
      setAreaList(oldDataOrder?.areaList);
    }
  }, [oldDataOrder]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    saveNewPatientData();
  }, [saveNewPatientData]);

  useEffect(() => {
    if (patientData?.birthDate) {
      setValue({
        startDate: patientData?.birthDate,
        endDate: patientData?.birthDate,
      });
    }
  }, [patientData?.birthDate]);

  // useEffect(() => {
  //     if (
  //         oldDataOrder?.sendTo === area &&
  //         newDataOrder &&
  //         oldDataOrder &&
  //         !_.isEqual(oldDataOrder, newDataOrder)
  //     ) {
  //         updateOrderData({
  //             obj1: oldDataOrder,
  //             obj2: newDataOrder,
  //         });
  //     }
  // }, [area, newDataOrder, oldDataOrder, updateOrderData]);

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

    if (userData && !allowedRoles.includes(userRoleId)) {
      router.replace('/dashboard');
      return;
    }

    if (!user && !userRoleId) {
      router.replace('/sign-in');
    }
  }, [router, user, userData]);

  return {
    setFlag,
    flag,
    router,
    value,
    area,
    uidUser: uid,
    showSave,
    showHelp,
    allAreas: _.sortBy(areasByCampus(), (obj) => obj.label.toLocaleLowerCase()),
    setShowHelp,
    formStep,
    setFormStep,
    userRol,
    isEdit,
    oldData: oldDataOrder,
    setIsEdit,
    isDataSelected,
    setIsDataSelected,
    widthSlider,
    optionsData,
    patientData,
    titles,
    currentOrderId,
    selectedDiagnosisTwo,
    setSelectedDiagnosisTwo,
    selectedSuppliers,
    setSelectedSuppliers,
    changeHandler,
    selectChangeHandlerIdType,
    dateChangeHandler,
    phoneChangeHandler,
    setSelectedOptions,
    handleSendForm,
    selectChangeHandlerSentTo,
    handleChecks,
    fileName,
    fileNameSTL,
    handleFileChange,
    handleFileChangeSTL,
    allDiagnoses: _.sortBy(allDiagnoses, (obj) =>
      obj.label.toLocaleLowerCase()
    ),
    allDiagnostician: _.sortBy(allDiagnostician, (obj) => obj.label),
    selectChangeHandlerDiagnoses,
    selectChangeHandlerDiagnostician,
    handleInputChange,
    suggestions,
    idChangeHandler,
    isOrderIncomplete,
    handleCheckOrderIncomplete,
    handleAreaList,
    areaList,
    errorImg,
    handleInputUrl,
    urlWeTransfer,
    uploadUrl,
    urlDropbox,
    handleInputUrlDropbox,
    handleModelType,
    modelType,
    user,
    setShowSave,
    professionals
  };
};

export default EditOrderHook;
