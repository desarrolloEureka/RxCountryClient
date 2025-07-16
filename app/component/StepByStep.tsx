import _ from 'lodash';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import {
  BsCardList,
  BsFillGeoAltFill,
  BsFillPersonVcardFill,
  BsTerminalFill,
} from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import {
  IoCheckmark,
  IoCloseSharp,
  IoEye,
  IoMail,
  IoPerson,
} from 'react-icons/io5';
import { MdOutlineDateRange, MdOutlineImageSearch } from 'react-icons/md';
import PhoneInput from 'react-phone-input-2';
import Datepicker from 'react-tailwindcss-datepicker';
import '../style.css';
import { AreasSelector } from '../types/areas';
import { DiagnosesSelector } from '../types/diagnoses';
import { DiagnosticianSelector } from '../types/diagnostician';
import { RolesBd } from '../types/roles';
import { idTypes } from './constants/formConstants';
import DentalSelect from './orders/dental-select';
import SelectComponent from './SelectComponent';
import SelectWithCheckbox from './SelectWithCheckbox';
import InputFileUpload from './UpLoadButton';
import DoctorVector from './vectors/DoctorVector';
import Swal from 'sweetalert2';
import { DataPatientObject } from '../types/patient';

interface Props {
  value: {
    startDate: string | null;
    endDate: string | null;
  };
  userData?: any;
  uidUser?: string;
  area?: string;
  errorImg?: string | null;
  formStep: number;
  setFormStep: (e: any) => void;
  userRol?: RolesBd;
  currentOrderId: number;
  suggestions?: any[];
  isEdit?: boolean;
  isVerificated?: boolean;
  setIsDataSelected: (e: any) => void;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputUrl?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputUrlDropbox?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectChangeHandlerIdType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  dateChangeHandler: (e: any) => void;
  phoneChangeHandler: (phone: string) => void;
  idChangeHandler: (id: string) => void;
  setSelectedOptions: (e: any) => void;
  handleSendForm: (e: any, areaSelected: any) => Promise<void>;
  selectChangeHandlerSentTo: (e: any) => void;
  handleAreaList: (e: any) => void;
  areaList?: string[];
  handleClose: (e: any) => void;
  data: DataPatientObject;
  optionsData: any;
  oldData?: any;
  wrapperRef?: any;
  allAreas: AreasSelector[];
  handleChecks: (
    option: string,
    selected: string[],
    setSelected: (e: any) => void
  ) => void;
  fileName?: string;
  fileNameSTL?: string;
  handleFileChange?: (e: any) => void;
  isOrderIncomplete?: boolean;
  handleCheckOrderIncomplete: (e: any) => void;
  allDiagnoses?: DiagnosesSelector[];
  allDiagnostician?: DiagnosticianSelector[];
  selectChangeHandlerDiagnoses: (value: any) => void;
  selectChangeHandlerDiagnostician: (value: any) => void;
  uploadUrl?: string;
  urlWeTransfer?: string;
  urlDropbox?: string;
  modelType?: string;
  handleModelType?: (e: any) => void;
  handleFileChangeSTL?: (e: any) => void;
  flag: boolean;
  professionals: any[]; 
}

function StepByStep({
  userData,
  value,
  area,
  formStep,
  uidUser,
  allAreas,
  setFormStep,
  userRol,
  isEdit,
  isVerificated,
  setIsDataSelected,
  optionsData,
  data,
  oldData,
  currentOrderId,
  suggestions,
  errorImg,
  wrapperRef,
  handleClose,
  handleChecks,
  changeHandler,
  idChangeHandler,
  selectChangeHandlerIdType,
  dateChangeHandler,
  phoneChangeHandler,
  setSelectedOptions,
  handleSendForm,
  selectChangeHandlerSentTo,
  handleAreaList,
  areaList,
  handleInputChange,
  fileName,
  fileNameSTL,
  handleFileChange,
  allDiagnoses,
  allDiagnostician,
  selectChangeHandlerDiagnoses,
  selectChangeHandlerDiagnostician,
  isOrderIncomplete,
  handleCheckOrderIncomplete,
  handleInputUrl,
  urlWeTransfer,
  uploadUrl,
  urlDropbox,
  handleInputUrlDropbox,
  handleModelType,
  modelType,
  handleFileChangeSTL,
  flag,
  professionals = [],
}: Props) {

  
  const router = useRouter();

  const currentDate = moment().format();

  const [professionalObservation, setProfessionalObservation] = useState('');
  const [receptionObservation, setReceptionObservation] = useState('');

  const [professionalUid, setprofessionalUid] = useState('');
  const [professionalName, setProfessionalName] = useState('');
  const [professionalSpecialty, setProfessionalSpecialty] = useState('');
  const [professionalEmail, setProfessionalEmail] = useState('');
  const [areaSelected, setAreaSelected] = useState<any>(null);
  const [areasListSelected, setAreasListSelected] = useState<any>(null);
  const [diagnosesSelected, setDiagnosesSelected] = useState<any>(null);
  const [diagnosticianSelected, setDiagnosticianSelected] = useState<any>(null);

  const [observationComment, setObservationComment] = useState<string>('');

  const [diagnosticImpressionComment, setDiagnosticImpressionComment] =
    useState<string>('');

  const [dentalSelectBoneScan, setDentalSelectBoneScan] = useState<number[]>(
    []
  );

  const [dentalSelectTomography, setDentalSelectTomography] = useState<
    number[]
  >([]);

  const [selectedIntraOrals, setSelectedIntraOrals] = useState<string[]>([]);

  const [selectedExtraOrals, setSelectedExtraOrals] = useState<string[]>([]);

  const [selected3DVolumetricTomography, setSelected3DVolumetricTomography] =
    useState<string[]>([]);

  const [
    selectedAdditionalDeliveryMethod,
    setSelectedAdditionalDeliveryMethod,
  ] = useState<string[]>([]);

  const [selectedDiagnosis, setSelectedDiagnosis] = useState<string[]>([]);

  const [selectedModels, setSelectedModels] = useState<string[]>([]);

  const [
    selectedIntraOralClinicalPhotography,
    setSelectedIntraOralClinicalPhotography,
  ] = useState<string[]>([]);

  const [
    selectedExtraOralClinicalPhotography,
    setSelectedExtraOralClinicalPhotography,
  ] = useState<string[]>([]);

  const [selectedPresentation, setSelectedPresentation] = useState<string[]>(
    []
  );

  const [selectedBackground, setSelectedBackground] = useState<string[]>([]);

  const [
    selectedClinicalPhotographyDeliveryMethod,
    setSelectedClinicalPhotographyDeliveryMethod,
  ] = useState<string[]>([]);

  const [selectedDiagnosticPackage, setSelectedDiagnosticPackage] = useState<
    string[]
  >([]);
  console.log('profesionalUid', professionalUid);
  const allDataSelected = useMemo(() => {
    return {
      // professionalName:
      //   userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq'
      //     ? `${userData?.name} ${userData?.lastName}`
      //     : oldData?.professionalName
      //     ? oldData?.professionalName
      //     : professionalName,
      // professionalSpecialty:
      //   userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq'
      //     ? userData?.specialty || ""
      //     : oldData?.professionalSpecialty
      //     ? oldData?.professionalSpecialty
      //     : professionalSpecialty,
      // professionalEmail:
      //   userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq'
      //     ? userData?.email || ""
      //     : oldData?.professionalEmail
      //     ? oldData?.professionalEmail
      //     : professionalEmail,

      professionalUid:
        professionalName?.trim() !== ''
          ? professionals.find(p => `${p.name} ${p.lastName}` === professionalName)?.uid || ''
          : userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq'
          ? uidUser
          : oldData?.professionalUid || '',

      professionalName:
      professionalName?.trim() !== ''
        ? professionalName
        : userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq'
        ? `${userData?.name} ${userData?.lastName}`
        : oldData?.professionalName || '',

    professionalSpecialty:
      professionalSpecialty?.trim() !== ''
        ? professionalSpecialty
        : userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq'
        ? userData?.specialty || ''
        : oldData?.professionalSpecialty || '',

    professionalEmail:
      professionalEmail?.trim() !== ''
        ? professionalEmail
        : userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq'
        ? userData?.email || ''
        : oldData?.professionalEmail || '',

      dentalSelectBoneScan,
      selectedIntraOrals,
      selectedExtraOrals,
      dentalSelectTomography,
      selected3DVolumetricTomography,
      selectedAdditionalDeliveryMethod,
      selectedDiagnosis,
      selectedModels,
      selectedIntraOralClinicalPhotography,
      selectedExtraOralClinicalPhotography,
      selectedPresentation,
      selectedBackground,
      selectedClinicalPhotographyDeliveryMethod,
      selectedDiagnosticPackage,
      observationComment:
        userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq'
          ? observationComment
          : oldData?.observationComment
          ? oldData?.observationComment
          : '',
      diagnosticImpressionComment,
      createdByRole: oldData?.createdByRole || '',

    };
  }, [
    userRol?.uid,
    userData?.name,
    userData?.lastName,
    userData?.specialty,
    userData?.email,
    oldData?.professionalName,
    oldData?.professionalSpecialty,
    oldData?.professionalEmail,
    oldData?.observationComment,
    professionalName,
    professionalSpecialty,
    professionalEmail,
    dentalSelectBoneScan,
    selectedIntraOrals,
    selectedExtraOrals,
    dentalSelectTomography,
    selected3DVolumetricTomography,
    selectedAdditionalDeliveryMethod,
    selectedDiagnosis,
    selectedModels,
    selectedIntraOralClinicalPhotography,
    selectedExtraOralClinicalPhotography,
    selectedPresentation,
    selectedBackground,
    selectedClinicalPhotographyDeliveryMethod,
    selectedDiagnosticPackage,
    observationComment,
    diagnosticImpressionComment,
  ]);

  const valData = useCallback(async () => {
    const dataSelected: {
      [key: string]: string | number[] | string[] | any;
    } = { ...allDataSelected };
  
    if (userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq') {
      // Profesional
      dataSelected.observationComment = {
        timestamp: currentDate,
        userId: uidUser,
        message: professionalObservation,
      };
      if (allDataSelected?.createdByRole === 'Ll6KGdzqdtmLLk0D5jhk') {
        dataSelected.specialistEdited = true;
      }
    } else if (userRol?.uid === 'Ll6KGdzqdtmLLk0D5jhk') {
      // Recepción edita ambos campos
      dataSelected.observationComment = {
        timestamp: currentDate,
        userId: uidUser,
        message: professionalObservation,
      };
      dataSelected.recObservationComment = {
        timestamp: currentDate,
        userId: uidUser,
        message: receptionObservation,
      };
    } else {
      // Otros roles (si aplica)
      dataSelected[
        userRol?.name.substring(0, 3).toLocaleLowerCase() + 'ObservationComment'
      ] = {
        timestamp: currentDate,
        userId: uidUser,
        message: observationComment,
      };
    }
    // Solo asignar el rol que creó la ODS si no está ya registrado
    if (!allDataSelected?.createdByRole && userRol?.uid) {
      dataSelected.createdByRole = userRol.uid;
    }


    setIsDataSelected(_.some(dataSelected, (value) => !_.isEmpty(value)));
    console.log('dataSelected', dataSelected);
    setSelectedOptions(dataSelected);
  }, [
    allDataSelected,
    currentDate,
    professionalObservation,
    receptionObservation,
    observationComment,
    setIsDataSelected,
    setSelectedOptions,
    uidUser,
    userRol?.name,
    userRol?.uid,
  ]);
  

  const getObservationComment = (
    oldData: Record<string, any>,
    userRol?: RolesBd
  ) => {
    const isProfessional = userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq';
    const userRoleKey =
      userRol?.name.substring(0, 3).toLocaleLowerCase() + 'ObservationComment';
    const userRoleComment = oldData?.[userRoleKey];
    const generalComment = oldData?.observationComment;

    if (!isProfessional && userRoleComment) {
      return userRoleComment?.message;
    }

    if (
      (userRoleComment && generalComment !== userRoleComment) ||
      isProfessional
    ) {
      return generalComment?.message;
    }

    return '';
  };

  const userComment = getObservationComment(oldData, userRol);

  useEffect(() => {
    if (oldData) {
      setProfessionalName(oldData.professionalName);
      setProfessionalSpecialty(oldData.professionalSpecialty);
      setProfessionalEmail(oldData.professionalEmail);
      setObservationComment(userComment);

      setProfessionalObservation(oldData?.observationComment?.message || '');
      setReceptionObservation(oldData?.recObservationComment?.message || '');

      setDiagnosticImpressionComment(oldData.diagnosticImpressionComment);
      setDentalSelectBoneScan(oldData.dentalSelectBoneScan);
      setDentalSelectTomography(oldData.dentalSelectTomography);
      setSelectedIntraOrals(oldData.selectedIntraOrals);
      setSelectedExtraOrals(oldData.selectedExtraOrals);
      setSelected3DVolumetricTomography(oldData.selected3DVolumetricTomography);
      setSelectedAdditionalDeliveryMethod(
        oldData.selectedAdditionalDeliveryMethod
      );
      setSelectedDiagnosis(oldData.selectedDiagnosis);
      setSelectedModels(oldData.selectedModels);
      setSelectedIntraOralClinicalPhotography(
        oldData.selectedIntraOralClinicalPhotography
      );
      setSelectedExtraOralClinicalPhotography(
        oldData.selectedExtraOralClinicalPhotography
      );
      setSelectedPresentation(oldData.selectedPresentation);
      setSelectedBackground(oldData.selectedBackground);
      setSelectedClinicalPhotographyDeliveryMethod(
        oldData.selectedClinicalPhotographyDeliveryMethod
      );
      setSelectedDiagnosticPackage(oldData.selectedDiagnosticPackage);
      setAreasListSelected(
        allAreas.filter((area) => oldData?.areaList?.includes(area.value))
      );
      setAreaSelected(allAreas.find((area) => area.value === oldData?.sendTo));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oldData, userComment, userRol]);

  useEffect(() => {
    valData();
  }, [valData]);

  useEffect(() => {
    areasListSelected && selectChangeHandlerSentTo(areasListSelected);
  }, [areasListSelected, selectChangeHandlerSentTo]);
  
  
  // const handleProfessionalSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const uid = e.target.value;
  //   const selected = professionals.find(p => p.uid === uid);

  //   if (selected) {
  //     setProfessionalName(`${selected.name} ${selected.lastName}`);
  //     setProfessionalSpecialty(selected.specialty);
  //     setProfessionalEmail(selected.email);
  //   } else {
  //     setProfessionalName("");
  //     setProfessionalSpecialty("");
  //     setProfessionalEmail("");
  //   }
  // };
  const handleProfessionalSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const uid = e.target.value;
    const selected = professionals.find(p => p.uid === uid);

    if (selected) {
      setProfessionalName(`${selected.name} ${selected.lastName}`);
      setProfessionalSpecialty(selected.specialty);
      setProfessionalEmail(selected.email);

      //  Guardar en selectedOptions también
      setSelectedOptions((prev: any) => ({
        ...prev,
        professionalUid: selected.uid,
        professionalName: `${selected.name} ${selected.lastName}`,
        professionalSpecialty: selected.specialty,
        professionalEmail: selected.email,
      }));
    } else {
      setProfessionalName("");
      setProfessionalSpecialty("");
      setProfessionalEmail("");

      // Limpiar también si no hay profesional
      setSelectedOptions((prev: any) => ({
        ...prev,
        professionalUid: null,
        professionalName: "",
        professionalSpecialty: "",
        professionalEmail: "",
      }));
    }
  };



  // console.log(data);
  console.log('areasListSelected', areasListSelected);
  
  console.log('data', data);
  console.log('isEdit stepbystep:', isEdit);
  
  return (
    <div>
      {/* Datos Paciente */}
      {formStep === 0 && (
        <div className='mx-4 sm:mx-16 bg-black bg-opacity-50 rounded-2xl p-8 flex flex-col space-y-8'>
          <h3 className='text-xl sm:text-2xl text-company-orange'>
            Datos del Paciente
          </h3>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-4'>
            <div className='col-span-1 lg:col-span-4 relative flex flex-col space-y-2'>
              <label htmlFor='idType' className='text-white'>
                Tipo de Documento&nbsp;
                <span className='text-blue-500'>*</span>
              </label>
              <select
                disabled={
                  userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                  userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk'
                }
                value={data && data?.idType}
                id='idType'
                name='idType'
                required
                className='rounded-xl h-10 bg-transparent border border-company-blue text-white px-10'
                onChange={selectChangeHandlerIdType}
              >
                <option value='' hidden className=' text-company-orange'>
                  Seleccione...
                </option>
                {idTypes.map((option, index) => (
                  <option
                    key={index}
                    value={option.value}
                    className='bg-black text-white'
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <span className='absolute left-2 bottom-2 text-company-blue text-[1.5rem]'>
                <BsFillPersonVcardFill />
              </span>
            </div>
            <div
              className='col-span-1 lg:col-span-4 relative flex flex-col space-y-2'
              // ref={wrapperRef}
            >
              <label htmlFor='patientId' className='text-white'>
                Documento&nbsp;
                <span className='text-blue-500'>*</span>
              </label>
              <input
                disabled={
                  userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                  userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk'
                }
                value={data && data?.id}
                type='text'
                name='id'
                required
                id='patientId'
                min={0}
                max={9999999999}
                className='rounded-xl h-10 bg-transparent border border-company-blue text-white px-10'
                onChange={isEdit ? changeHandler : handleInputChange}
                
                // onChange={handleInputChange}
              />
              {suggestions && suggestions?.length > 0 && (
                <ul className='absolute top-16 w-full text-white bg-black border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto z-10'>
                  {suggestions?.map((patient) => (
                    <li
                      key={patient.id}
                      className='p-2 hover:bg-company-blue cursor-pointer'
                      onClick={() => {
                        idChangeHandler(patient.id)
                      }  
                      }
                    >
                      {patient.id}
                    </li>
                  ))}
                </ul>
              )}
              <span className='absolute left-2 bottom-2 text-company-blue text-[1.5rem]'>
                <BsFillPersonVcardFill />
              </span>
              {data && data?.id && !isEdit && (
                <span className='absolute right-2 bottom-2 hover:bg-black/25 rounded-md text-company-blue text-[1.5rem]'>
                  <IoCloseSharp onClick={handleClose} />
                </span>
              )}
            </div>
            <div className='col-span-1 lg:col-span-4 relative flex flex-col space-y-2'>
              <label htmlFor='firstName' className='text-white'>
                Nombres&nbsp;
                <span className="text-blue-500">*</span>
              </label>
              <input
                disabled={
                  userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                  userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk'
                }
                value={data && data?.name}
                type='text'
                name='name'
                required
                id='firstName'
                className='rounded-xl h-10 bg-transparent border border-company-blue text-white px-10'
                onChange={changeHandler}
              />
              <span className='absolute left-2 bottom-2 text-company-blue text-[1.5rem]'>
                <IoPerson />
              </span>
            </div>
            <div
              className={`col-span-1 ${
                oldData ? 'lg:col-span-4' : 'lg:col-span-3'
              } relative flex flex-col space-y-2`}
            >
              <label htmlFor='lastName' className='text-white'>
                Apellidos&nbsp;
                  <span className="text-blue-500">*</span>
              </label>
              <input
                disabled={
                  userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                  userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk'
                }
                value={data && data?.lastName}
                type='text'
                name='lastName'
                required
                id='lastName'
                className='rounded-xl h-10 bg-transparent border border-company-blue text-white px-10'
                onChange={changeHandler}
              />
              <span className='absolute left-2 bottom-2 text-company-blue text-[1.5rem]'>
                <IoPerson />
              </span>
            </div>
            <div
              className={`col-span-1 ${
                oldData ? 'lg:col-span-4' : 'lg:col-span-3'
              } relative flex flex-col space-y-2`}
            >
              <label htmlFor='email' className='text-white'>
                Correo&nbsp;
                <span className='text-blue-500'>*</span>
              </label>
              <input
                disabled={
                  (userRol?.uid === 'Ll6KGdzqdtmLLk0D5jhk' && isEdit) || 
                  (userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                  userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk')
                }                
                value={data && data?.email}
                type='email'
                name='email'
                required
                id='email'
                className={`rounded-xl h-10 bg-transparent border ${
                  userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                  userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk'
                    ? 'border-gray-600 text-gray-400'
                    : 'border-company-blue text-white'
                } px-10`}                
                onChange={(e) => {
                  const email = e.target.value.toLowerCase();
                  setSelectedOptions((prev: any) => ({
                    ...prev,
                    email,
                  }));
                  data.email = email; // solo si necesitas ver reflejado el cambio visualmente
                }}

              />
              <span
                className={`absolute left-2 bottom-2 ${
                  oldData ||
                  (userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                    userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk')
                    ? 'text-gray-600'
                    : 'text-company-blue'
                } text-[1.5rem]`}
              >
                <IoMail />
              </span>
            </div>
            {!oldData && (
              <div
                className={`col-span-1 lg:col-span-3 relative ${
                  oldData ? 'hidden' : 'flex'
                } flex-col space-y-2`}
              >
                <label htmlFor='email' className='text-white'>
                  Confirmar Correo&nbsp;
                  <span className='text-blue-500'>*</span>
                </label>
                <input
                  onPaste={(e) => {
                    alert('No puedes pegar');
                    e.preventDefault();
                  }}
                  disabled={
                    userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                    userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk'
                  }
                  value={data && data?.confirmEmail}
                  type='email'
                  name='confirmEmail'
                  required
                  id='email'
                  className={`rounded-xl h-10 bg-transparent ${
                    data?.confirmEmail === data?.email
                      ? 'border-company-blue border'
                      : 'border-red-600 border-2'
                  } text-white px-10`}
                  onChange={(e) => {
                    const confirmEmail = e.target.value.toLowerCase();
                    setSelectedOptions((prev: any) => ({
                      ...prev,
                      confirmEmail,
                    }));
                    changeHandler({
                      target: { name: 'confirmEmail', value: confirmEmail }
                    } as React.ChangeEvent<HTMLInputElement>);

                  }}

                />
                <span className='absolute left-2 bottom-2 text-company-blue text-[1.5rem]'>
                  <IoMail />
                </span>
              </div>
            )}
            <div
              className={`col-span-1 ${
                oldData ? 'lg:col-span-4' : 'lg:col-span-3'
              } relative flex flex-col space-y-2`}
            >
              <label htmlFor='phone' className='text-white'>
                Celular&nbsp;
                {userRol?.uid === 'Ll6KGdzqdtmLLk0D5jhk' && (
                  <span className="text-blue-500">*</span>
                )}
              </label>
              <PhoneInput
                disabled={
                  userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                  userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk'
                }
                autoFormat={false}
                inputProps={{
                  id: 'phone',
                  name: 'phone',
                  required: userRol?.uid === 'Ll6KGdzqdtmLLk0D5jhk', // Requerido solo para Recepcion
                  //required: true,
                  pattern: '^\\+?\\d{5,15}$',
                  title: 'Por favor, ingrese un número de teléfono válido (5 a 15 dígitos). Ej: +573001234567',
                }}
                country={'co'}
                specialLabel=''
                placeholder=''
                prefix='+'
                dropdownStyle={{
                  color: 'black',
                  borderRadius: 12,
                }}
                value={data?.phone}
                onChange={phoneChangeHandler}
              />
              {/* <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <IoCall />
                            </span> */}
            </div>
            <div className='col-span-1 lg:col-span-4 relative flex flex-col space-y-2 w-full'>
              <label htmlFor='data-picker' className='text-white'>
                Fecha de Nacimiento&nbsp;
                {userRol?.uid === 'Ll6KGdzqdtmLLk0D5jhk' && (
                  <span className="text-blue-500">*</span>
                )}
              </label>
              <Datepicker
                popoverDirection='up'
                disabled={
                  userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                  userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk'
                }
                startFrom={
                  data && data?.birthDate
                    ? new Date(data?.birthDate)
                    : new Date()
                }
                useRange={false}
                asSingle={true}
                inputId='data-picker'
                inputName='data-picker'
                inputClassName='rounded-xl h-10 bg-transparent border border-company-blue text-white pl-10 pr-4 w-full'
                onChange={dateChangeHandler}
                value={data && value}
                primaryColor={'amber'}
                separator={'al'}
                displayFormat={'DD/MM/YYYY'}
                readOnly={true}
                i18n={'es'}
              />

              <span className='absolute left-2 bottom-2 text-company-blue text-[1.5rem]'>
                <MdOutlineDateRange />
              </span>
            </div>
            <div className='col-span-1 lg:col-span-4 relative flex flex-col space-y-2'>
              <label htmlFor='age' className='text-white'>
                Edad&nbsp;
                {userRol?.uid === 'Ll6KGdzqdtmLLk0D5jhk' && (
                  <span className="text-blue-500">*</span>
                )}
              </label>
              <input
                value={data && data?.age}
                disabled
                type='number'
                name='age'
                id='age'
                min={0}
                max={999}
                className='rounded-xl h-10 bg-transparent border border-company-blue text-white px-10'
              />
              <span className='absolute left-2 bottom-2 text-company-blue text-[1.5rem]'>
                <MdOutlineDateRange />
              </span>
            </div>
            <div className='col-span-1 lg:col-span-4 relative flex flex-col space-y-2'>
              <label htmlFor='address' className='text-white'>
                Dirección&nbsp;(opcional)
              </label>
              <input
                disabled={
                  userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                  userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk'
                }
                value={data && data?.address}
                id='address'
                name='address'
                type='text'
                // required
                className='rounded-xl h-10 bg-transparent border-company-blue border text-white px-10'
                onChange={changeHandler}
              />
              <span className='absolute left-2 bottom-2 text-company-blue text-[1.5rem]'>
                <BsFillGeoAltFill />
              </span>
            </div>
            {userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' && (
              <>
                <div className='col-span-1 lg:col-span-4 relative flex flex-col space-y-2'>
                  <label htmlFor='Doctor' className='text-white'>
                    Profesional&nbsp;(opcional)
                  </label>
                  <select
                    id="Doctor"
                    value={professionalName ? professionals.find(p =>
                          `${p.name} ${p.lastName}` === professionalName)?.uid ?? "" : ""}
                    onChange={handleProfessionalSelect}
                    className="rounded-xl h-10 bg-gray-800 border border-company-blue text-white px-10 focus:outline-none focus:ring-2 focus:ring-company-blue shadow-md"
                  >
                    <option value="" className="bg-gray-800 text-white">-- Seleccione --</option>
                    {professionals
                      ?.slice() // crea una copia para no mutar el estado original
                      .sort((a, b) => {
                        const nameA = `${a.name} ${a.lastName}`.toLowerCase();
                        const nameB = `${b.name} ${b.lastName}`.toLowerCase();
                        return nameA.localeCompare(nameB);
                      })
                      .map(prof => (
                        <option key={prof.uid} value={prof.uid} className="bg-gray-800 text-white">
                          {prof.name} {prof.lastName}
                        </option>
                      ))}
                  </select>

                  <span className='absolute left-2 bottom-2 text-company-blue text-[1.5rem]'>
                    <FaUserDoctor />
                  </span>
                </div>

                <div className='col-span-1 lg:col-span-4 relative flex flex-col space-y-2'>
                  <label htmlFor='Specialty' className='text-white'>
                    Especialidad
                  </label>
                  <input
                    // disabled={isEdit}
                    // disabled={
                    //   professionalName === '' ||
                    //   (oldData && oldData?.createdBy.userRol !== userRol?.uid)
                    // }
                    disabled
                    value={professionalSpecialty}
                    type='text'
                    name='professionalSpecialty'
                    id='Specialty'
                    className={`rounded-xl h-10 bg-transparent border ${
                      professionalName === ''
                        ? 'border-gray-600'
                        : 'border-company-blue'
                    } text-white px-10`}
                    onChange={(e) => setProfessionalSpecialty(e.target.value)}
                  />
                  <span
                    className={`absolute left-2 bottom-2 ${
                      professionalName === ''
                        ? 'text-gray-600'
                        : 'text-company-blue'
                    } text-[1.5rem]`}
                  >
                    <FaUserDoctor />
                  </span>
                </div>
                <div className='col-span-1 lg:col-span-4 relative flex flex-col space-y-2'>
                  <label htmlFor='emailDoctor' className='text-white'>
                    Correo del Profesional
                  </label>
                  <input
                    // disabled={
                    //   professionalName === '' ||
                    //   (oldData && oldData?.createdBy.userRol !== userRol?.uid)
                    // }
                    disabled
                    value={professionalEmail}
                    type='email'
                    name='professionalEmail'
                    id='emailDoctor'
                    className={`rounded-xl h-10 bg-transparent border ${
                      professionalName === ''
                        ? 'border-gray-600'
                        : 'border-company-blue'
                    }  text-white px-10`}
                    onChange={(e) => setProfessionalEmail(e.target.value)}
                  />
                  <span
                    className={`absolute left-2 bottom-2 ${
                      professionalName === ''
                        ? 'text-gray-600'
                        : 'text-company-blue'
                    } text-[1.5rem]`}
                  >
                    <IoMail />
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {isEdit && userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' && (flag || userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk')?  (
        <>
          {/* Flujo de acción */}
          {formStep === 1 && (
            <>
            {/* Datos del paciente y orden en línea */}
              <div className="flex flex-col gap-2 px-4 lg:px-28 pt-4 text-white text-sm lg:text-base">
                <div>
                  <span className="text-company-orange">ODS:</span> {oldData?.uid}
                </div>
                <div>
                  <span className="text-company-orange">Paciente:</span> {data?.name} {data?.lastName}
                </div>
                <div>
                  <span className="text-company-orange">Doc:</span> {data?.idType} {data?.id}
                </div>
                <div>
                  <span className="text-company-orange">Email:</span> {data?.email}
                </div>
                <div>
                  <span className="text-company-orange">Fecha de gestión:</span>{" "}
                  {oldData?.recObservationComment?.timestamp
                    ? moment(oldData.recObservationComment.timestamp).format("DD/MM/YYYY HH:mm")
                    : "No disponible"}
                </div>

              </div>


              {/* Visualizar PDF */}
              <div className='pace-y-4flex flex-col mx-4 lg:mx-28 my-5 space-y-4'>
                <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 gap-4'>
                  
                  {/* Vista verificación de la orden */}
                  {userRol?.uid === '9RZ9uhaiwMC7VcTyIzhl' && (
                    <div className="flex flex-col items-start space-y-2">
                      {/* Botón para Orden Incompleta */}
                      <div className="flex flex-row items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            handleCheckOrderIncomplete(!isOrderIncomplete);
                          }}

                          
                          className={`w-52 h-16 flex items-center justify-center space-x-2 px-4 py-2 border rounded-xl text-white ${
                            isOrderIncomplete
                              ? 'bg-gray-600 hover:bg-gray-500 border-company-orange'
                              : 'bg-gray-800 hover:bg-gray-700 border-company-blue'
                          }`}
                        >
                          <span>{isOrderIncomplete ? 'Orden incompleta' : '¿Orden incompleta?'}</span>
                        </button>
                      </div>

                      {/* Área de destino */}
                      {isOrderIncomplete && (
                        <div className="w-full space-y-2">
                          <label className="text-company-orange text-sm lg:text-base font-normal">
                            Área de destino:
                          </label>
                          <SelectComponent
                            options={allAreas.filter((area) =>
                              oldData?.areaList
                                ? oldData?.areaList?.includes(area.value)
                                : area
                            )}
                            selectChangeHandler={(e) => {
                              selectChangeHandlerSentTo(e?.value);
                              setAreaSelected(e);
                            }}
                            optionSelected={areaSelected}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {/* Despacho */}
                  {userRol?.uid === '9RZ9uhaiwMC7VcTyIzhl' && (
                    <div className="flex flex-wrap flex-row  justify-start gap-4">
                      {/* Primer contenedor */}
                      <div className="flex  justify-start text-sm lg:text-base font-normal text-company-orange">
                        <a
                          href={`/dashboard/preview-order/${oldData?.uid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-52 h-16 flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                        >
                          <IoEye className="text-company-blue" size={24} />
                          <span className="text-nowrap">Ver PDF ODS</span>
                        </a>
                      </div>
                    
                      {/* Segundo contenedor */}
                      <div className="flex  flex-col justify-start ">
                        <InputFileUpload
                          fileName={fileName}
                          handleFileChange={handleFileChange}
                          multiple
                        />
                      </div>
                    </div>
                
                  )}
                  
                  
                  
                  {/* <div className="flex items-center justify-center lg:justify-start w-full">
                                        <button
                                            type="button"
                                            className="flex items-center w-52 bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                                        >
                                            <IoEye
                                                className="text-company-blue"
                                                size={24}
                                            />
                                            <Link
                                                href={`/dashboard/preview-order/${oldData?.uid}`}
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                <span className="text-nowrap">
                                                    Previsualizar PDF
                                                </span>
                                            </Link>
                                        </button>
                                    </div> */}
                  {/* Diagnostico  */}
                  {userRol?.uid === 'wGU4GU8oDosW4ayQtxqT' && (
                    <div className="flex flex-wrap flex-row justify-start gap-4">
                      <div className='flex items-center justify-start text-sm lg:text-base font-normal text-company-orange'>
                        <a
                          href={`/dashboard/preview-order/${oldData?.uid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-52 h-16 flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                        >
                          <IoEye className="text-company-blue" size={24} />
                          <span className="text-nowrap">Ver PDF ODS</span>
                        </a>
                      </div>
                      <div className='flex flex-col justify-start text-sm lg:text-base font-normal text-company-orange'>
                        <InputFileUpload
                          fileName={fileName}
                          handleFileChange={handleFileChange}
                          // fileTypes="application/pdf"
                          multiple
                        />
                        {/* {errorImg ? (
                          <span className='text-sm lg:text-base uppercase text-center text-red-400 pt-3'>
                            {errorImg}
                          </span>
                        ) : (
                          <span
                            className={`text-sm lg:text-base text-center ${
                              fileName === 'Subir Archivo'
                                ? 'text-company-orange'
                                : 'text-green-500'
                            } pt-3`}
                          >
                            
                          </span>
                        )} */}
                      </div>
                    </div>
                  )}



                  {/* Visualizar imágenes en despacho y diagnostico  */}
                  {(userRol?.uid === '9RZ9uhaiwMC7VcTyIzhl' ||
                    userRol?.uid === 'wGU4GU8oDosW4ayQtxqT') && (
                    <div className='flex'>
                      <div
                        className={`text-sm lg:text-base font-normal text-company-orange w-52 h-16 flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white w-52 ${
                          !_.isEmpty(oldData?.orderImagesUrl)
                            ? 'border-company-blue hover:bg-gray-700'
                            : 'border-company-orange'
                        } rounded-xl items-center justify-center`}
                      >
                        <MdOutlineImageSearch
                          className={
                            !_.isEmpty(oldData?.orderImagesUrl)
                              ? 'text-company-blue'
                              : 'text-company-orange'
                          }
                          size={24}
                        />
                        {!_.isEmpty(oldData?.orderImagesUrl) ? (
                          <Link
                            href={`/dashboard/images-query/details/${oldData?.uid}`}
                            rel='noopener noreferrer'
                            target='_blank'
                          >
                            <span className='text-white text-nowrap'>
                              Verificar Imágenes
                            </span>
                          </Link>
                        ) : (
                          <label className='text-company-orange'>
                            No hay imágenes
                          </label>
                        )}
                      </div>
                    </div>
                  )}

                    

                </div>

                
              </div>

              {/* Despacho */}
              {userRol?.uid === '9RZ9uhaiwMC7VcTyIzhl' && (
                <div className='grid grid-cols-3 gap-4 mx-4 lg:mb-10 lg:mx-28'>
                  
                  <div className='col-span-3 lg:col-span-1 flex flex-col rounded-xl justify-start'>
                    <h1 className='text-sm lg:text-base text-company-orange font-bold'>
                      Diagnosticadores:
                    </h1>

                    <div className='grid grid-cols-1 gap-4'>
                      <SelectComponent
                        options={[...(allDiagnostician || [])].sort((a, b) =>
                          a.label.localeCompare(b.label)
                        )}
                        selectChangeHandler={(e) => {
                          selectChangeHandlerDiagnostician(e?.value);
                          setDiagnosticianSelected(e);
                        }}
                        optionSelected={diagnosticianSelected}
                      />
                    </div>
                  </div>
                  <div className='col-span-3 lg:col-span-1 flex flex-col rounded-xl justify-start'>
                    <h1 className='text-sm lg:text-base text-company-orange font-bold'>
                      Diagnóstico
                    </h1>

                    <div className='grid grid-cols-1 gap-4 text-sm lg:text-base font-normal text-company-orange'>
                      <SelectComponent
                        options={[...(allDiagnoses || [])].sort((a, b) =>
                          a.label.localeCompare(b.label)
                        )}
                        selectChangeHandler={(e) => {
                          selectChangeHandlerDiagnoses(e?.value);
                          setDiagnosesSelected(e);
                        }}
                        optionSelected={diagnosesSelected}
                      />
                    </div>
                  </div>

                  <div className='col-span-3 flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500'>
                    <h3 className='text-sm lg:text-base text-company-orange font-bold px-4 py-2'>
                      Observaciones
                    </h3>
                    <div className='grid grid-cols-1 gap-2 p-4'>
                      <textarea
                        // disabled
                        value={observationComment}
                        id='Observations'
                        name='observations'
                        rows={4}
                        cols={50}
                        className='block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea'
                        placeholder='Escribe aquí tus observaciones...'
                        // onChange={
                        //     commentChangeHandler
                        // }
                        onChange={(e) => setObservationComment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}





              {/* Recepción */}
              {userRol?.uid === 'Ll6KGdzqdtmLLk0D5jhk' && (
                <div className='flex flex-col rounded-xl bg-black bg-opacity-50 mt-4 lg:my-10 mx-4 lg:mx-28 divide-y divide-slate-500'>
                  <div className='flex flex-col p-4 space-y-4'>
                    <label className='text-company-orange text-base lg:text-xl font-bold'>
                      <span className='text-company-orange'>*</span>
                      &nbsp; Según la orden seleccione áreas a intervenir:
                    </label>
                    <SelectWithCheckbox
                      // isDisabled={areaSelected}
                      isMulti
                      options={allAreas}
                      selectChangeHandler={(e) => {
                        handleAreaList(e);
                        setAreasListSelected(e);
                        setAreaSelected(null);
                      }}
                      optionSelected={areasListSelected}
                    />
                  </div>

                  <h3 className='text-company-orange text-base lg:text-xl font-bold py-2 px-4'>
                    Observaciones
                  </h3>
                  <div className='flex flex-col p-4'>
                    <textarea
                      value={observationComment}
                      id='Observations'
                      name='observations'
                      rows={6}
                      cols={50}
                      className='block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea'
                      placeholder='Escribe aquí tus observaciones...'
                      // onChange={commentChangeHandler}
                      onChange={(e) => setObservationComment(e.target.value)}
                    />
                  </div>
                </div>
              )}

              
              {/* Radiología  */}
              {userRol?.uid === 'V5iMSnSlSYsiSDFs4UpI' && (
                <div className='grid grid-cols-1 gap-4 mx-4 lg:mb-10 lg:mx-28'>
                   <div className="flex flex-wrap flex-row   justify-start gap-4">
                      {/* Primer contenedor */}
                      <div className="flex  justify-start text-sm lg:text-base font-normal text-company-orange">
                        <a
                          href={`/dashboard/preview-order/${oldData?.uid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-52 h-16 flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                        >
                          <IoEye className="text-company-blue" size={24} />
                          <span className="text-nowrap">Ver PDF ODS</span>
                        </a>
                      </div>
                    
                      {/* Segundo contenedor */}
                      <div className="flex  flex-col justify-start text-sm lg:text-base font-normal text-company-orange">
                        <InputFileUpload
                          fileName={fileName}
                          handleFileChange={handleFileChange}
                          multiple
                        />
                      </div>
                    </div>
                  
                  
                  {/* <div className='col-span-3 lg:col-span-1 flex flex-col justify-start items-center'>
                    <InputFileUpload
                      fileName={fileNameSTL}
                      handleFileChange={handleFileChangeSTL}
                      fileTypes='.stl'
                      multiple
                    />
                    <span
                      className={`text-sm lg:text-base text-center ${
                        fileName === 'Subir Archivo'
                          ? 'text-company-orange'
                          : 'text-green-500'
                      } pt-3`}
                    >
                      ARCHIVOS TIPO STL
                    </span>
                  </div> */}
                  <div className='col-span-3 flex flex-col space-y-2 rounded-xl'>
                    <h1 className='text-company-orange text-sm  text-company-orange text-lg lg:text-xl font-bold'>
                      URL WeTransfer:
                    </h1>

                    <div className='grid grid-cols-1 gap-4 relative'>
                      <input
                        value={urlWeTransfer}
                        type='url'
                        name='uploadFilesURL'
                        id=''
                        className='rounded-xl h-10 bg-black/50 border border-transparent text-white px-10'
                        onChange={handleInputUrl}
                      />
                      <span className='absolute left-2 bottom-2 text-company-blue text-[1.5rem]'>
                        <BsTerminalFill />
                      </span>
                    </div>
                  </div>
                  {/* <div className="col-span-2 flex flex-col space-y-2 rounded-xl">
                                        <h1 className="text-company-orange text-2xl font-bold">
                                            URL Dropbox:
                                        </h1>

                                        <div className="grid grid-cols-1 gap-4 relative">
                                            <input
                                                value={urlDropbox}
                                                type="url"
                                                name="uploadFilesURL"
                                                id=""
                                                className="rounded-xl h-10 bg-black/50 border border-transparent text-white px-10"
                                                onChange={handleInputUrlDropbox}
                                            />
                                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                                <BsTerminalFill />
                                            </span>
                                        </div>
                                    </div> */}
                  <div className='col-span-3 flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500'>
                    <h3 className='text-company-orange text-sm  text-company-orange text-lg lg:text-xl font-bold px-4 py-2'>
                      Observaciones
                    </h3>
                    <div className='grid grid-cols-1 gap-2 p-4 text-sm lg:text-base font-normal text-company-orange'>
                      <textarea
                        // disabled
                        value={observationComment}
                        id='Observations'
                        name='observations'
                        rows={4}
                        cols={50}
                        className='block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea'
                        placeholder='Escribe aquí tus observaciones...'
                        // onChange={
                        //     commentChangeHandler
                        // }
                        onChange={(e) => setObservationComment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Diagnostico  */}
              {userRol?.uid === 'wGU4GU8oDosW4ayQtxqT' && (
                <div className='grid grid-cols-2 gap-4 mx-4 lg:mb-10 lg:mx-28'>
                  
                  <div className='col-span-2 flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500'>
                    <h3 className='text-company-orange text-sm lg:text-base font-normal text-company-orange font-bold px-4 py-2'>
                      Observaciones
                    </h3>
                    <div className='grid grid-cols-1 gap-2 p-4 text-sm lg:text-base font-normal text-company-orange'>
                      <textarea
                        // disabled
                        value={observationComment}
                        id='Observations'
                        name='observations'
                        rows={4}
                        cols={50}
                        className='block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea'
                        placeholder='Escribe aquí tus observaciones...'
                        // onChange={
                        //     commentChangeHandler
                        // }
                        onChange={(e) => setObservationComment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Laboratorio y Fotografía  */}
              {(userRol?.uid === 'chbFffCzpRibjYRyoWIx') && (
                <div className='grid grid-cols-2 gap-4 mx-4 lg:mb-10 lg:mx-28'>
                  <div className="flex flex-wrap flex-row justify-start gap-4">
                    {/* Botón Ver PDF ODS */}
                    <div className="text-sm lg:text-base font-normal text-company-orange col-span-2 lg:col-span-1 flex items-center justify-start">
                      <a
                        href={`/dashboard/preview-order/${oldData?.uid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-52 h-16 flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                      >
                        <IoEye className="text-company-blue" size={24} />
                        <span className="text-nowrap">Ver PDF ODS</span>
                      </a>
                    </div>

                    {/* Botón Subir Archivo */}
                    <div className="text-sm lg:text-base font-normal text-company-orange col-span-2 lg:col-span-1 flex flex-col items-start">
                      <InputFileUpload
                        fileName={fileName}
                        handleFileChange={handleFileChange}
                        multiple
                      />
                      {/* {errorImg ? (
                        <span className="text-sm lg:text-base uppercase text-center text-red-400 pt-3">
                          {errorImg}
                        </span>
                      ) : (
                        <span
                          className={`text-sm lg:text-base text-center ${
                            fileName === 'Subir Archivo'
                              ? 'text-company-orange'
                              : 'text-green-500'
                          } pt-3`}
                        >
                         
                        </span>
                      )} */}
                    </div>
                  </div>
                  
                  <div className='col-span-2 flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500'>
                    <h3 className='text-company-orange text-sm lg:text-base font-normal text-company-orange font-bold px-4 py-2'>
                      Observaciones
                    </h3>
                    <div className='grid grid-cols-1 gap-2 p-4 text-sm lg:text-base font-normal text-company-orange'>
                      <textarea
                        // disabled
                        value={observationComment}
                        id='Observations'
                        name='observations'
                        rows={4}
                        cols={50}
                        className='block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea'
                        placeholder='Escribe aquí tus observaciones...'
                        // onChange={
                        //     commentChangeHandler
                        // }
                        onChange={(e) => setObservationComment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modelos  */}
              {(userRol?.uid === 'g9xGywTJG7WSJ5o1bTsH'||
                userRol?.uid === 'c24R4P0VcQmQT0VT6nfo')  && (
                <div className='grid grid-cols-2 gap-4 mx-4 lg:mb-10 lg:mx-28'>
                  <div className="flex flex-wrap col-span-2 flex flex-row items-start justify-start gap-4">
                    <div className='col-span-1 flex items-start justify-start text-sm lg:text-base font-normal text-company-orange'>
                      <a
                        href={`/dashboard/preview-order/${oldData?.uid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-52 h-16 flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                      >
                        <IoEye className="text-company-blue" size={24} />
                        <span className="text-nowrap">Ver PDF ODS</span>
                      </a>
                    </div>
                    <div className=' col-span-1 flex flex-col justify-end items-center lg:pt-0 text-sm lg:text-base font-normal text-company-orange' >
                      <InputFileUpload
                        fileName={fileName}
                        handleFileChange={handleFileChange}
                        // fileTypes="image/*"
                        multiple
                      />
                      {errorImg ? (
                        <span className='text-base uppercase text-center text-red-400 pt-3'>
                          {errorImg}
                        </span>
                      ) : (
                        <span
                          className={`text-base text-center ${
                            fileName === 'Subir Archivo'
                              ? 'text-company-orange'
                              : 'text-green-500'
                          } pt-3`}
                        >
                        
                        </span>
                      )}
                    </div>
                  </div>
                  
                  

                  <div className='col-span-1 flex flex-col space-y-4 lg:space-y-8 py-0 lg:py-4 justify-center items-center text-sm lg:text-base font-normal text-company-orange'>
                    <h1 className='text-sm lg:text-base font-normal text-company-orange '>
                      Tipo de Modelo:
                    </h1>
                    <div className='flex flex-wrap justify-around gap-4 w-full'>
                      <div className='flex space-x-2 justify-center items-center text-white '>
                        <input
                          id='radio-1'
                          type='radio'
                          value='E'
                          checked={modelType === 'E'}
                          onChange={handleModelType}
                          className='w-5 h-5 lg:w-6 border-2'
                        />
                        <label htmlFor='radio-1' className="whitespace-nowrap ">Estudio</label>
                      </div>
                      <div className='flex space-x-2 justify-center items-center text-white min-w-[100px]'>
                        <input
                          id='radio-2'
                          type='radio'
                          value='T'
                          checked={modelType === 'T'}
                          onChange={handleModelType}
                          className='w-5 h-5 lg:w-6 border-2'
                        />
                        <label htmlFor='radio-2' className="whitespace-nowrap">Trabajo</label>
                      </div>
                      <div className='flex space-x-2 justify-center items-center text-white min-w-[100px]'>
                        <input
                          id='radio-3'
                          type='radio'
                          value='C'
                          checked={modelType === 'C'}
                          onChange={handleModelType}
                          className='w-5 h-5 lg:w-6 lg:h-6 border-0'
                        />
                        <label htmlFor='radio-3'  className="whitespace-nowrap">Copia</label>
                      </div>
                    </div>
                  </div>

                  
                  <div className='col-span-2 flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500'>
                    <h3 className='text-sm lg:text-base font-normal text-company-orange font-bold px-4 py-2'>
                      Observaciones
                    </h3>
                    <div className='grid grid-cols-1 gap-2 p-4 text-sm lg:text-base font-normal text-company-orange'>
                      <textarea
                        // disabled
                        value={observationComment}
                        id='Observations'
                        name='observations'
                        rows={4}
                        cols={50}
                        className='block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea'
                        placeholder='Escribe aquí tus observaciones...'
                        // onChange={
                        //     commentChangeHandler
                        // }
                        onChange={(e) => setObservationComment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Escáner Modelos  */}
              {userRol?.uid === 'VEGkDuMXs2mCGxXUPCWI' && (
                <div className='grid grid-cols-2 gap-4 mx-4 lg:mb-10 lg:mx-28'>
                  <div className="flex flex-wrap flex-row  justify-start gap-4">
                      {/* Primer contenedor */}
                      <div className="flex  justify-start text-sm lg:text-base font-normal text-company-orange">
                        <a
                          href={`/dashboard/preview-order/${oldData?.uid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-52 h-16 flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
                        >
                          <IoEye className="text-company-blue" size={24} />
                          <span className="text-nowrap">Ver PDF ODS</span>
                        </a>
                      </div>
                    
                      {/* Segundo contenedor */}
                      <div className="flex  flex-col justify-start text-sm lg:text-base font-normal text-company-orange">
                        <InputFileUpload
                          fileName={fileName}
                          handleFileChange={handleFileChange}
                          multiple
                        />
                      </div>
                    </div>
                  {/* <div className='col-span-2 lg:col-span-1 flex items-start justify-center w-full'>
                    <button
                      type='button'
                      className='flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white w-52'
                    >
                      <IoEye className='text-company-blue' size={24} />
                      <Link
                        href={`/dashboard/preview-order/${oldData?.uid}`}
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        <span className='text-nowrap'>Ver PDF ODS</span>
                      </Link>
                    </button>
                  </div>
                  <div className='col-span-2 lg:col-span-1 flex flex-col justify-end items-center'>
                    <InputFileUpload
                      fileName={fileName}
                      handleFileChange={handleFileChange}
                      // fileTypes="image/*"
                      multiple
                    />
                    {errorImg ? (
                      <span className='text-sm lg:text-base uppercase text-center text-red-400 pt-3'>
                        {errorImg}
                      </span>
                    ) : (
                      <span
                        className={`text-sm lg:text-base text-center ${
                          fileName === 'Subir Archivo'
                            ? 'text-company-orange'
                            : 'text-green-500'
                        } pt-3`}
                      >
                        IMÁGENES TIPO: PNG, JPG, JPEG.
                      </span>
                    )}
                  </div> */}
                  {/* <div className="col-span-2 flex flex-col space-y-2 rounded-xl">
                                        <h1 className="text-company-orange text-2xl font-bold">
                                            Ubicación del Archivo:
                                        </h1>

                                        <div className="grid grid-cols-1 gap-4 relative">
                                            <input
                                                value={uploadUrl}
                                                type="url"
                                                name="uploadFilesURL"
                                                id=""
                                                className="rounded-xl h-10 bg-black/50 border border-transparent text-white px-10"
                                                onChange={handleInputUrl}
                                            />
                                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                                <BsTerminalFill />
                                            </span>
                                        </div>
                                    </div> */}
                  <div className='col-span-2 flex flex-col  rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500'>
                    <h3 className='text-company-orange text-sm lg:text-base font-normal text-company-orange font-bold px-4 py-2'>
                      Observaciones
                    </h3>
                    <div className='grid grid-cols-1 gap-2 p-4'>
                      <textarea
                        // disabled
                        value={observationComment}
                        id='Observations'
                        name='observations'
                        rows={4}
                        cols={50}
                        className='block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea text-sm lg:text-base font-normal text-company-orange'
                        placeholder='Escribe aquí tus observaciones...'
                        // onChange={
                        //     commentChangeHandler
                        // }
                        onChange={(e) => setObservationComment(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {formStep === 1 && (
            <div className='flex flex-col mx-4 sm:mx-20'>
              <div className='flex items-center justify-center mx-0 sm:mx-auto mb-8'>
                <DentalSelect
                  setSelected={ (!isEdit || userRol?.uid === 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq')
                    ? setDentalSelectBoneScan : () => {}}
                  selected={dentalSelectBoneScan}
                />
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs lg:text-base'>
                <div className='flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Intra Orales
                  </h3>
                  <div className='grid grid-rows-4 grid-flow-col gap-4'>
                    {optionsData.intraOralsOptions.map(
                      (option: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className='col flex space-x-2 items-center'
                          >
                            <div className=''>
                              <div
                                onClick={() => {
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq')  &&
                                    setSelectedIntraOrals(
                                      selectedIntraOrals.includes(option)
                                        ? selectedIntraOrals.filter(
                                            (item) => item !== option
                                          )
                                        : [...selectedIntraOrals, option]
                                    );
                                }}
                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq')  && 'cursor-pointer'
                                } ${
                                  selectedIntraOrals.includes(option)
                                    ? 'bg-company-orange'
                                    : 'bg-transparent'
                                }`}
                              >
                                {selectedIntraOrals.includes(option) && (
                                  <IoCheckmark color='black' />
                                )}
                              </div>
                            </div>
                            <span className='text-white'>{option}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className='flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Extra Orales
                  </h3>
                  <div className='grid grid-rows-4 grid-flow-col gap-4'>
                    {optionsData.extraOralsOptions.map(
                      (option: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className='col flex space-x-2 items-center'
                          >
                            <div className=''>
                              <div
                                onClick={() => {
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') && 
                                    setSelectedExtraOrals(
                                      selectedExtraOrals.includes(option)
                                        ? selectedExtraOrals.filter(
                                            (item) => item !== option
                                          )
                                        : [...selectedExtraOrals, option]
                                    );
                                }}
                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq')  && 'cursor-pointer'
                                } ${
                                  selectedExtraOrals.includes(option)
                                    ? 'bg-company-orange'
                                    : 'bg-transparent'
                                }`}
                              >
                                {selectedExtraOrals.includes(option) && (
                                  <IoCheckmark color='black' />
                                )}
                              </div>
                            </div>
                            <span className='text-white'>{option}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {formStep === 2 && (
            <div className='flex flex-col mx-4 sm:mx-20'>
              <div className='flex items-center justify-center mx-0 sm:mx-auto mb-8'>
                <DentalSelect
                  setSelected={(!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') ? setDentalSelectTomography : (userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq')? setDentalSelectBoneScan : () => {}}
                  selected={dentalSelectTomography}
                />
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-5 gap-y-4 lg:gap-4 text-xs lg:text-base'>
                <div className='col-span-3 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Tomografía volumétrica 3D
                  </h3>
                  <div className='grid grid-cols-2 gap-4'>
                    {optionsData.volumetricTomography.map(
                      (option: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className={`col ${
                              optionsData.volumetricTomography.length - 1 ===
                                index && 'col-span-2'
                            } flex space-x-2 items-center`}
                          >
                            <div className=''>
                              <div
                                onClick={() => {
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') &&
                                    setSelected3DVolumetricTomography(
                                      selected3DVolumetricTomography.includes(
                                        option
                                      )
                                        ? selected3DVolumetricTomography.filter(
                                            (item) => item !== option
                                          )
                                        : [
                                            ...selected3DVolumetricTomography,
                                            option,
                                          ]
                                    );
                                }}
                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') && 'cursor-pointer'
                                } ${
                                  selected3DVolumetricTomography.includes(
                                    option
                                  )
                                    ? 'bg-company-orange'
                                    : 'bg-transparent'
                                }`}
                              >
                                {selected3DVolumetricTomography.includes(
                                  option
                                ) && (
                                  <IoCheckmark
                                    color='black'
                                    // className="text-xl"
                                  />
                                )}
                              </div>
                            </div>
                            <div className=''>
                              <span className='text-white'>{option}</span>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className='col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Forma de entrega adicional
                  </h3>
                  <div className='grid grid-cols-1 gap-4'>
                    {optionsData.additionalDeliveryMethod.map(
                      (option: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className='col flex space-x-2 items-center'
                          >
                            <div className=''>
                              <div
                                onClick={() => {
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') &&
                                    setSelectedAdditionalDeliveryMethod(
                                      selectedAdditionalDeliveryMethod.includes(
                                        option
                                      )
                                        ? selectedAdditionalDeliveryMethod.filter(
                                            (item) => item !== option
                                          )
                                        : [
                                            ...selectedAdditionalDeliveryMethod,
                                            option,
                                          ]
                                    );
                                }}
                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                  !isEdit && 'cursor-pointer'
                                } ${
                                  selectedAdditionalDeliveryMethod.includes(
                                    option
                                  )
                                    ? 'bg-company-orange'
                                    : 'bg-transparent'
                                }`}
                              >
                                {selectedAdditionalDeliveryMethod.includes(
                                  option
                                ) && <IoCheckmark color='black' />}
                              </div>
                            </div>
                            <span className='text-white'>{option}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {formStep === 3 && (
            <div className='flex flex-col mx-4 sm:mx-20'>
              <div className='grid grid-cols-1 gap-4 text-xs lg:text-base'>
                <div className='col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Diagnóstico
                  </h3>
                  <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                    {optionsData.diagnosis.map((option: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className='col flex space-x-2 items-center'
                        >
                          <div className=''>
                            <div
                              onClick={() => {
                                (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') &&
                                  setSelectedDiagnosis(
                                    selectedDiagnosis.includes(option)
                                      ? selectedDiagnosis.filter(
                                          (item) => item !== option
                                        )
                                      : [...selectedDiagnosis, option]
                                  );
                              }}
                              className={`border border-white rounded-[4px] h-4 w-4 ${
                                (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') && 'cursor-pointer'
                              } ${
                                selectedDiagnosis.includes(option)
                                  ? 'bg-company-orange'
                                  : 'bg-transparent'
                              }`}
                            >
                              {selectedDiagnosis.includes(option) && (
                                <IoCheckmark color='black' />
                              )}
                            </div>
                          </div>
                          <div className='flex items-start'>
                            <span className='text-white'>{option}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className='col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Modelos
                  </h3>
                  <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
                    {optionsData.models.map((option: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className='col flex space-x-2 items-center'
                        >
                          <div className=''>
                            <div
                              onClick={() => {
                                (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') &&
                                  setSelectedModels(
                                    selectedModels.includes(option)
                                      ? selectedModels.filter(
                                          (item) => item !== option
                                        )
                                      : [...selectedModels, option]
                                  );
                              }}
                              className={`border border-white rounded-[4px] h-4 w-4 ${
                                (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') && 'cursor-pointer'
                              } ${
                                selectedModels.includes(option)
                                  ? 'bg-company-orange'
                                  : 'bg-transparent'
                              }`}
                            >
                              {selectedModels.includes(option) && (
                                <IoCheckmark color='black' />
                              )}
                            </div>
                          </div>
                          <span className='text-white'>{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {formStep === 4 && (
            <div className='flex flex-col mx-4 sm:mx-20'>
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs lg:text-base'>
                <div className='col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Intra Orales
                  </h3>
                  <div className='grid grid-cols-2 gap-4'>
                    {optionsData.intraOralClinicalPhotography.map(
                      (option: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className={`col ${
                              optionsData.intraOralClinicalPhotography.length -
                                1 ===
                                index && 'col-span-2'
                            } flex space-x-2 items-center`}
                          >
                            <div className=''>
                              <div
                                onClick={() => {
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') &&
                                    setSelectedIntraOralClinicalPhotography(
                                      selectedIntraOralClinicalPhotography.includes(
                                        option
                                      )
                                        ? selectedIntraOralClinicalPhotography.filter(
                                            (item) => item !== option
                                          )
                                        : [
                                            ...selectedIntraOralClinicalPhotography,
                                            option,
                                          ]
                                    );
                                }}
                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') && 'cursor-pointer'
                                } ${
                                  selectedIntraOralClinicalPhotography.includes(
                                    option
                                  )
                                    ? 'bg-company-orange'
                                    : 'bg-transparent'
                                }`}
                              >
                                {selectedIntraOralClinicalPhotography.includes(
                                  option
                                ) && <IoCheckmark color='black' />}
                              </div>
                            </div>
                            <span className='text-white'>{option}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className='col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Extra Orales
                  </h3>
                  <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
                    {optionsData.extraOralClinicalPhotography.map(
                      (option: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className={`col ${
                              optionsData.extraOralClinicalPhotography.length -
                                1 ===
                                index && 'col-span-2'
                            } flex space-x-2 items-center`}
                          >
                            <div className=''>
                              <div
                                onClick={() => {
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') &&
                                    setSelectedExtraOralClinicalPhotography(
                                      selectedExtraOralClinicalPhotography.includes(
                                        option
                                      )
                                        ? selectedExtraOralClinicalPhotography.filter(
                                            (item) => item !== option
                                          )
                                        : [
                                            ...selectedExtraOralClinicalPhotography,
                                            option,
                                          ]
                                    );
                                }}
                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') && 'cursor-pointer'
                                } ${
                                  selectedExtraOralClinicalPhotography.includes(
                                    option
                                  )
                                    ? 'bg-company-orange'
                                    : 'bg-transparent'
                                }`}
                              >
                                {selectedExtraOralClinicalPhotography.includes(
                                  option
                                ) && <IoCheckmark color='black' />}
                              </div>
                            </div>
                            <span className='text-white'>{option}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div className='col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Presentación
                  </h3>
                  <div className='grid grid-cols-2 gap-4'>
                    {optionsData.presentation.map((option: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className='col flex space-x-2 items-center'
                        >
                          <div className=''>
                            <div
                              onClick={() => {
                                (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') &&
                                  setSelectedPresentation(
                                    selectedPresentation.includes(option)
                                      ? selectedPresentation.filter(
                                          (item) => item !== option
                                        )
                                      : [...selectedPresentation, option]
                                  );
                              }}
                              className={`border border-white rounded-[4px] h-4 w-4 ${
                                (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') && 'cursor-pointer'
                              } ${
                                selectedPresentation.includes(option)
                                  ? 'bg-company-orange'
                                  : 'bg-transparent'
                              }`}
                            >
                              {selectedPresentation.includes(option) && (
                                <IoCheckmark color='black' />
                              )}
                            </div>
                          </div>
                          <span className='text-white'>{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className='col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Fondo
                  </h3>
                  <div className='grid grid-cols-2 gap-4'>
                    {optionsData.background.map((option: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className='col flex space-x-2 items-center'
                        >
                          <div className=''>
                            <div
                              onClick={() => {
                                (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') && setSelectedBackground(option);
                              }}
                              className={`flex border border-white justify-center items-center rounded-full h-4 w-4 ${
                                (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') && 'cursor-pointer'
                              } ${
                                selectedBackground === option
                                  ? 'bg-company-orange'
                                  : 'bg-transparent'
                              }`}
                            >
                              {selectedBackground === option && (
                                <FaCircle color='black' size={10} />
                              )}
                            </div>
                          </div>
                          <span className='text-white'>{option}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className='col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Formas de entrega adicional
                  </h3>
                  <div className='grid grid-cols-2 gap-4'>
                    {optionsData.clinicalPhotographyDeliveryMethod.map(
                      (option: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className='col flex space-x-2 items-center'
                          >
                            <div className=''>
                              <div
                                onClick={() => {
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') &&
                                    setSelectedClinicalPhotographyDeliveryMethod(
                                      selectedClinicalPhotographyDeliveryMethod.includes(
                                        option
                                      )
                                        ? selectedClinicalPhotographyDeliveryMethod.filter(
                                            (item) => item !== option
                                          )
                                        : [
                                            ...selectedClinicalPhotographyDeliveryMethod,
                                            option,
                                          ]
                                    );
                                }}
                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') && 'cursor-pointer'
                                } ${
                                  selectedClinicalPhotographyDeliveryMethod.includes(
                                    option
                                  )
                                    ? 'bg-company-orange'
                                    : 'bg-transparent'
                                }`}
                              >
                                {selectedClinicalPhotographyDeliveryMethod.includes(
                                  option
                                ) && <IoCheckmark color='black' />}
                              </div>
                            </div>
                            <span className='text-white'>{option}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {formStep === 5 && (
            <div className='flex flex-col mx-4 sm:mx-20'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50'>
                  <h3 className='text-company-orange text-xl font-bold'>
                    Paquete de diagnóstico
                  </h3>
                  <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs lg:text-base'>
                    {optionsData.diagnosticPackage.map(
                      (option: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className='col flex space-x-2 items-start'
                          >
                            <div className=''>
                              <div
                                onClick={() => {
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') &&
                                    setSelectedDiagnosticPackage(
                                      selectedDiagnosticPackage.includes(option)
                                        ? selectedDiagnosticPackage.filter(
                                            (item) => item !== option
                                          )
                                        : [...selectedDiagnosticPackage, option]
                                    );
                                }}
                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                  (!isEdit || userRol?.uid == 'Ll6KGdzqdtmLLk0D5jhk' || userRol?.uid == 'ZWb0Zs42lnKOjetXH5lq') && 'cursor-pointer'
                                } ${
                                  selectedDiagnosticPackage.includes(option)
                                    ? 'bg-company-orange'
                                    : 'bg-transparent'
                                }`}
                              >
                                {selectedDiagnosticPackage.includes(option) && (
                                  <IoCheckmark color='black' />
                                )}
                              </div>
                            </div>
                            <span className='text-white'>{option}</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                
                {userRol?.uid === 'Ll6KGdzqdtmLLk0D5jhk' ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 col-span-2">
                    {/* Observaciones */}
                    <div className="flex flex-col rounded-xl bg-[#2c2c2c] divide-y divide-slate-500">
                      <h3 className="text-company-orange text-xl font-bold py-2 px-4">
                           Observaciones profesional
                      </h3>
                      <div className="flex flex-col p-4">
                        <textarea
                          value={professionalObservation}
                          onChange={(e) => setProfessionalObservation(e.target.value)}
                          className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent custom-scrollbar-textarea"
                          placeholder="Escribe aquí tus observaciones..."
                        />
                      </div>
                    </div>

                    {/* Impresión diagnóstica */}
                    <div className="flex flex-col rounded-xl bg-[#2c2c2c] divide-y divide-slate-500">
                      <h3 className="text-company-orange text-xl font-bold px-4 py-2">
                        Impresión diagnóstica
                      </h3>
                      <div className="grid grid-cols-1 gap-2 p-4">
                        <textarea
                          value={diagnosticImpressionComment}
                          onChange={(e) => setDiagnosticImpressionComment(e.target.value)}
                          className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent custom-scrollbar-textarea"
                          placeholder="Escribe aquí tus observaciones..."
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Profesional u otros roles */}
                    <div className="col-span-2 lg:col-span-1 flex flex-col rounded-xl bg-[#2c2c2c] divide-y divide-slate-500">
                      <h3 className="text-company-orange text-xl font-bold py-2 px-4">
                          Observaciones profesional
                      </h3>
                      <div className="flex flex-col p-4">
                        <textarea
                          value={professionalObservation}
                          onChange={(e) => setProfessionalObservation(e.target.value)}
                          className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent custom-scrollbar-textarea"
                          placeholder="Escribe aquí tus observaciones..."
                        />
                      </div>
                    </div>

                    <div className="col-span-2 lg:col-span-1 flex flex-col rounded-xl bg-[#2c2c2c] divide-y divide-slate-500">
                      <h3 className="text-company-orange text-xl font-bold px-4 py-2">
                        Impresión diagnóstica
                      </h3>
                      <div className="grid grid-cols-1 gap-2 p-4">
                        <textarea
                          value={diagnosticImpressionComment}
                          onChange={(e) => setDiagnosticImpressionComment(e.target.value)}
                          className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent custom-scrollbar-textarea"
                          placeholder="Escribe aquí tus observaciones..."
                        />
                      </div>
                    </div>
                  </>
                )}
                <div
                  className={`${
                    userRol?.uid !== 'Ll6KGdzqdtmLLk0D5jhk'
                      ? 'col-span-2 lg:col-span-1'
                      : 'col-span-2'
                  } flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500`}
                >
                  {userRol?.uid === 'Ll6KGdzqdtmLLk0D5jhk' && (
                    <div className='flex flex-col py-2 px-4 space-y-4'>
                      <label className='text-company-orange text-xl font-bold'>
                        <span className='text-company-orange'>*</span>
                        &nbsp; Seleccione áreas a intervenir:
                      </label>
                      <SelectWithCheckbox
                        // isDisabled={areaSelected}
                        isMulti
                        options={allAreas}
                        selectChangeHandler={(e) => {
                          handleAreaList(e);
                          setAreasListSelected(e);
                          setAreaSelected(null);
                        }}
                        optionSelected={areasListSelected}
                      />
                      {/* Observaciones */}
                        <div className="flex flex-col rounded-xl bg-[#2c2c2c] bg-opacity-50 divide-y divide-slate-500">
                          <h3 className="text-company-orange text-xl font-bold py-2 px-4">
                              Observaciones Recepción
                          </h3>
                          <div className="flex flex-col p-4">
                            <textarea
                              value={receptionObservation}
                              onChange={(e) => setReceptionObservation(e.target.value)}
                              className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent custom-scrollbar-textarea"
                              placeholder="Escribe aquí tus observaciones..."
                            />
                          </div>
                        </div>
                    </div>
                    
                  )}
                </div>
                
              </div>
            </div>
          )}
        </>
      )}

      {formStep === 6 && (
        <div className='flex flex-col p-4 lg:px-20 lg:py-10 relative'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            <div className='flex flex-col space-y-4 p-4'>
              {isEdit ? (
                <h2 className='text-company-orange font-bold text-4xl'>
                  Examen Editado con Éxito
                </h2>
              ) : (
                <h2 className='text-company-orange font-bold text-4xl'>
                  Examen Finalizado con Éxito
                </h2>
              )}
              <p className='text-white w-full text-justify pb-10'>
                La orden de servicio ha sido actualizada y será almacenada con
                los cambios realizados, podrás visualizarla en línea con el
                estado de las mismas en cualquier momento.
              </p>
              {/* {userRol?.uid !== 'ZWb0Zs42lnKOjetXH5lq' &&
                userRol?.uid !== '9RZ9uhaiwMC7VcTyIzhl' && (
                  <div className='flex flex-col'>
                    {!_.isEmpty(areaList) && (
                      // &&
                      // oldData?.sendTo === area
                      <div className='flex flex-col space-y-4 pb-10'>
                        <label className='text-company-orange text-xl'>
                          <span className='text-company-orange'>*</span>
                          &nbsp; Enviar a:
                        </label>
                        <SelectComponent
                          options={allAreas.filter((area) =>
                            // !_.isEmpty(
                            //     oldData?.areaList,
                            // )
                            //     ? [...areaList as string[],...oldData?.areaList].includes(
                            //           area.value,
                            //       )
                            //     :
                            areaList?.includes(area.value)
                          )}
                          selectChangeHandler={(e) => {
                            selectChangeHandlerSentTo(e?.value);
                            setAreaSelected(e);
                          }}
                          optionSelected={areaList ? areaSelected : []}
                        />
                      </div>
                    )}
                  </div>
                )} */}

              {(areasListSelected ||
                // userRol?.uid === "Ll6KGdzqdtmLLk0D5jhk" ||
                userRol?.uid === '9RZ9uhaiwMC7VcTyIzhl' ||
                userRol?.uid === 'ZWb0Zs42lnKOjetXH5lq') && (
                <div className='flex justify-center items-center'>
                  <button
                    type={areasListSelected ? 'button' : 'submit'}
                    onClick={async (e) => {
                      //areasListSelected && handleSendForm(e);
                      if (areasListSelected) {
                        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
                        Swal.fire({
                          position: 'center',
                          title: 'Guardando Orden...',
                          text: 'Por favor espera mientras procesamos la información.',
                          allowOutsideClick: false,
                          background: '#404040',
                          color: '#e9a225',
                          
                        });
                        try {
                          console.log("Area selected", areaSelected);
                          await areasListSelected && handleSendForm(e, areaSelected); // Llama a la función de guardado
                        } catch (error) {
                          Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Hubo un problema al guardar la orden.',
                            background: '#404040',
                            color: '#e9a225',
                            //confirmButtonColor: '#1f2937',
                          });
                        }
                      }
                    }}
                    className='w-48 h-10 flex mb-5 items-center justify-center bg-gray-800 hover:bg-gray-700 shadow-md px-1 py-2 border border-company-blue rounded-xl text-white'
                  >
                    <span>
                      {userRol?.uid === '9RZ9uhaiwMC7VcTyIzhl' &&
                      !isOrderIncomplete
                        ? 'Finalizar Orden'
                        : 'Guardar y Enviar'}
                    </span>
                  </button>
                </div>
              )}

              <div className='hidden lg:flex flex-col h-auto justify-center items-center absolute left-[70%] lg:left-[60%] -bottom-0'>
                <DoctorVector className='w-48 lg:w-full' width='100%' />
              </div>

              <div className='flex flex-row pt-10 space-x-10 justify-center sm:justify-start'>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    isEdit && formStep === 6
                      ? setFormStep(1)
                      : setFormStep((prevStep: number) => prevStep - 1);
                  }}
                  className='flex items-center cursor-pointer text-company-blue'
                >
                  <BiChevronLeft size={32} />
                  <span>Atrás</span>
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    router.replace(
                      isEdit ? '/dashboard/orders-historial' : '/dashboard'
                    );
                  }}
                  className='flex items-center cursor-pointer text-company-blue'
                >
                  <IoCloseSharp size={28} />
                  <span>Cancelar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {formStep === 7 && (
        <div className='flex flex-col p-4 sm:p-16 relative'>
          <div className='grid grid-cols-1 gap-4'>
            <div className='flex flex-row space-x-4 rounded-xl bg-black bg-opacity-40'>
              <div className='flex flex-col pr-[40%] pb-[15%] pl-[10%] pt-[10%] space-y-8'>
                {userRol?.uid === '9RZ9uhaiwMC7VcTyIzhl' &&
                !isOrderIncomplete ? (
                  <h2 className='text-company-orange font-bold text-4xl'>
                    {`La orden #${currentOrderId} ha sido cerrada con éxito.`}
                  </h2>
                ) : (
                  <h2 className='text-company-orange font-bold text-4xl'>
                    {`La orden #${currentOrderId} ha sido gestionada con éxito ${
                      areaSelected ? ': ' + areaSelected.label + '.' : '.'
                    }`}
                  </h2>
                )}

                <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:justify-around'>
                  <button
                    type='button'
                    onClick={() => {
                      router.replace(
                        oldData
                          ? '/dashboard/orders-historial/?to=send'
                          : '/dashboard/orders-historial'
                      );
                    }}
                    className='w-48 flex justify-center items-center space-x-2 text-white hover:text-gray-300 text-center border-sky-800 hover:border-sky-300 border rounded-md p-2 bg-company-gray shadow-lg'
                  >
                    <BsCardList size={24} />
                    <span>Ir al historial</span>
                  </button>
                  {fileName !== 'Subir Archivo' && fileName !== undefined && (
                    <button
                      type='button'
                      className='w-52 flex justify-center items-center space-x-2 text-white hover:text-sky-300 border-sky-800 hover:border-sky-300 border rounded-md p-2 bg-gray-800 shadow-lg'
                    >
                      <MdOutlineImageSearch size={24} />
                      <Link
                        href={`/dashboard/images-query/details/${oldData?.uid}`}
                        rel='noopener noreferrer'
                        target='_blank'
                      >
                        <span className='text-white'>Verificar Imágenes</span>
                      </Link>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
/**va despues del tercer div de form
 * <div className='sm:flex flex-col hidden justify-center items-center absolute left-[60%] -bottom-0'>
              <DoctorVector className='w-48 sm:w-full' width='100%' />
            </div>
 */
export default StepByStep;
