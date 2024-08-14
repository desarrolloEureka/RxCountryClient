import _ from "lodash";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import {
    BsFillGeoAltFill,
    BsFillPersonVcardFill,
    BsTerminalFill,
} from "react-icons/bs";
import { FaCircle } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import {
    IoCall,
    IoCheckmark,
    IoCloseSharp,
    IoEye,
    IoMail,
    IoPerson,
} from "react-icons/io5";
import { MdOutlineDateRange, MdOutlineImageSearch } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import Datepicker from "react-tailwindcss-datepicker";
import "../style.css";
import { AreasSelector } from "../types/areas";
import { DiagnosesSelector } from "../types/diagnoses";
import { DiagnosticianSelector } from "../types/diagnostician";
import { RolesBd } from "../types/roles";
import { idTypes } from "./constants/formConstants";
import DentalSelect from "./orders/dental-select";
import SelectComponent from "./SelectComponent";
import SelectWithCheckbox from "./SelectWithCheckbox";
import InputFileUpload from "./UpLoadButton";
import DoctorVector from "./vectors/DoctorVector";

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
    setIsDataSelected: (e: any) => void;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputUrl?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputUrlDropbox?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectChangeHandlerIdType: (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => void;
    dateChangeHandler: (e: any) => void;
    phoneChangeHandler: (phone: string) => void;
    idChangeHandler: (id: string) => void;
    setSelectedOptions: (e: any) => void;
    handleSendForm: (e: any) => Promise<void>;
    selectChangeHandlerSentTo: (e: any) => void;
    handleAreaList: (e: any) => void;
    areaList?: string[];
    handleClose: (e: any) => void;
    data: any;
    optionsData: any;
    oldData?: any;
    wrapperRef?: any;
    allAreas: AreasSelector[];
    handleChecks: (
        option: string,
        selected: string[],
        setSelected: (e: any) => void,
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
}: Props) {
    const router = useRouter();

    const currentDate = moment().format();

    const [professionalName, setProfessionalName] = useState("");
    const [professionalSpecialty, setProfessionalSpecialty] = useState("");
    const [professionalEmail, setProfessionalEmail] = useState("");
    const [areaSelected, setAreaSelected] = useState<any>(null);
    const [areasListSelected, setAreasListSelected] = useState<any>(null);
    const [diagnosesSelected, setDiagnosesSelected] = useState<any>(null);
    const [diagnosticianSelected, setDiagnosticianSelected] =
        useState<any>(null);

    const [observationComment, setObservationComment] = useState<string>("");

    const [diagnosticImpressionComment, setDiagnosticImpressionComment] =
        useState<string>("");

    const [dentalSelectBoneScan, setDentalSelectBoneScan] = useState<number[]>(
        [],
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
        [],
    );

    const [selectedBackground, setSelectedBackground] = useState<string[]>([]);

    const [
        selectedClinicalPhotographyDeliveryMethod,
        setSelectedClinicalPhotographyDeliveryMethod,
    ] = useState<string[]>([]);

    const [selectedDiagnosticPackage, setSelectedDiagnosticPackage] = useState<
        string[]
    >([]);

    const allDataSelected = useMemo(() => {
        return {
            professionalName:
                userRol?.uid === "ZWb0Zs42lnKOjetXH5lq"
                    ? `${userData?.name} ${userData?.lastName}`
                    : oldData?.professionalName
                    ? oldData?.professionalName
                    : professionalName,
            professionalSpecialty:
                userRol?.uid === "ZWb0Zs42lnKOjetXH5lq"
                    ? userData?.specialty
                    : oldData?.professionalSpecialty
                    ? oldData?.professionalSpecialty
                    : professionalSpecialty,
            professionalEmail:
                userRol?.uid === "ZWb0Zs42lnKOjetXH5lq"
                    ? userData?.email
                    : oldData?.professionalEmail
                    ? oldData?.professionalEmail
                    : professionalEmail,
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
                userRol?.uid === "ZWb0Zs42lnKOjetXH5lq"
                    ? observationComment
                    : oldData?.observationComment
                    ? oldData?.observationComment
                    : "",
            diagnosticImpressionComment,
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

        if (userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq") {
            //crea propiedad según rol
            dataSelected[
                userRol?.name.substring(0, 3).toLocaleLowerCase() +
                    "ObservationComment"
            ] = {
                timestamp: currentDate,
                userId: uidUser,
                message: observationComment,
            };
        } else {
            dataSelected.observationComment = {
                timestamp: currentDate,
                userId: uidUser,
                message: observationComment,
            };
        }

        setIsDataSelected(_.some(dataSelected, (value) => !_.isEmpty(value)));

        setSelectedOptions(dataSelected);
    }, [
        allDataSelected,
        currentDate,
        observationComment,
        // oldData,
        setIsDataSelected,
        setSelectedOptions,
        uidUser,
        userRol?.name,
        userRol?.uid,
    ]);

    const getObservationComment = (
        oldData: Record<string, any>,
        userRol?: RolesBd,
    ) => {
        const isProfessional = userRol?.uid === "ZWb0Zs42lnKOjetXH5lq";
        const userRoleKey =
            userRol?.name.substring(0, 3).toLocaleLowerCase() +
            "ObservationComment";
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

        return "";
    };

    const userComment = getObservationComment(oldData, userRol);

    useEffect(() => {
        if (oldData) {
            setProfessionalName(oldData.professionalName);
            setProfessionalSpecialty(oldData.professionalSpecialty);
            setProfessionalEmail(oldData.professionalEmail);
            setObservationComment(userComment);
            setDiagnosticImpressionComment(oldData.diagnosticImpressionComment);
            setDentalSelectBoneScan(oldData.dentalSelectBoneScan);
            setDentalSelectTomography(oldData.dentalSelectTomography);
            setSelectedIntraOrals(oldData.selectedIntraOrals);
            setSelectedExtraOrals(oldData.selectedExtraOrals);
            setSelected3DVolumetricTomography(
                oldData.selected3DVolumetricTomography,
            );
            setSelectedAdditionalDeliveryMethod(
                oldData.selectedAdditionalDeliveryMethod,
            );
            setSelectedDiagnosis(oldData.selectedDiagnosis);
            setSelectedModels(oldData.selectedModels);
            setSelectedIntraOralClinicalPhotography(
                oldData.selectedIntraOralClinicalPhotography,
            );
            setSelectedExtraOralClinicalPhotography(
                oldData.selectedExtraOralClinicalPhotography,
            );
            setSelectedPresentation(oldData.selectedPresentation);
            setSelectedBackground(oldData.selectedBackground);
            setSelectedClinicalPhotographyDeliveryMethod(
                oldData.selectedClinicalPhotographyDeliveryMethod,
            );
            setSelectedDiagnosticPackage(oldData.selectedDiagnosticPackage);
            setAreasListSelected(
                allAreas.filter((area) =>
                    oldData?.areaList?.includes(area.value),
                ),
            );
        }
    }, [oldData, userComment, userRol]);

    useEffect(() => {
        valData();
    }, [valData]);

    // console.log(data);

    return (
        <div>
            {/* Datos Paciente */}
            {formStep === 0 && (
                <div className="mx-16 bg-black bg-opacity-50 rounded-2xl p-8 flex flex-col space-y-8">
                    <h3 className="text-2xl text-company-orange">
                        Datos del Paciente
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col relative flex flex-col space-y-2">
                            <label htmlFor="idType" className="text-white">
                                Tipo de Documento&nbsp;
                                <span className="text-blue-500">*</span>
                            </label>
                            <select
                                disabled={
                                    userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" &&
                                    userRol?.uid !== "Ll6KGdzqdtmLLk0D5jhk"
                                }
                                value={data && data?.idType}
                                id="idType"
                                name="idType"
                                required
                                className="rounded-xl h-10 bg-transparent border border-company-blue text-white px-10"
                                onChange={selectChangeHandlerIdType}
                            >
                                <option
                                    value=""
                                    hidden
                                    className=" text-company-orange"
                                >
                                    Seleccione...
                                </option>
                                {idTypes.map((option, index) => (
                                    <option
                                        key={index}
                                        value={option.value}
                                        className="bg-black text-white"
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <BsFillPersonVcardFill />
                            </span>
                        </div>
                        <div
                            className="col relative flex flex-col space-y-2"
                            // ref={wrapperRef}
                        >
                            <label htmlFor="patientId" className="text-white">
                                Documento&nbsp;
                                <span className="text-blue-500">*</span>
                            </label>
                            <input
                                disabled={
                                    userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" &&
                                    userRol?.uid !== "Ll6KGdzqdtmLLk0D5jhk"
                                }
                                value={data && data?.id}
                                type="text"
                                name="id"
                                required
                                id="patientId"
                                min={0}
                                max={9999999999}
                                className="rounded-xl h-10 bg-transparent border border-company-blue text-white px-10"
                                onChange={
                                    isEdit ? changeHandler : handleInputChange
                                }
                                // onChange={handleInputChange}
                            />
                            {suggestions && suggestions?.length > 0 && (
                                <ul className="absolute top-16 w-full text-white bg-black border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto z-10">
                                    {suggestions?.map((patient) => (
                                        <li
                                            key={patient.id}
                                            className="p-2 hover:bg-company-blue cursor-pointer"
                                            onClick={() =>
                                                idChangeHandler(patient.id)
                                            }
                                        >
                                            {patient.id}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <BsFillPersonVcardFill />
                            </span>
                            {data && data?.id && !isEdit && (
                                <span className="absolute right-2 bottom-2 hover:bg-black/25 rounded-md text-company-blue text-[1.5rem]">
                                    <IoCloseSharp onClick={handleClose} />
                                </span>
                            )}
                        </div>
                        <div className="col relative flex flex-col space-y-2">
                            <label htmlFor="firstName" className="text-white">
                                Nombres&nbsp;
                                <span className="text-blue-500">*</span>
                            </label>
                            <input
                                disabled={
                                    userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" &&
                                    userRol?.uid !== "Ll6KGdzqdtmLLk0D5jhk"
                                }
                                value={data && data?.name}
                                type="text"
                                name="name"
                                required
                                id="firstName"
                                className="rounded-xl h-10 bg-transparent border border-company-blue text-white px-10"
                                onChange={changeHandler}
                            />
                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <IoPerson />
                            </span>
                        </div>
                        <div className="col relative flex flex-col space-y-2">
                            <label htmlFor="lastName" className="text-white">
                                Apellidos&nbsp;
                                <span className="text-blue-500">*</span>
                            </label>
                            <input
                                disabled={
                                    userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" &&
                                    userRol?.uid !== "Ll6KGdzqdtmLLk0D5jhk"
                                }
                                value={data && data?.lastName}
                                type="text"
                                name="lastName"
                                required
                                id="lastName"
                                className="rounded-xl h-10 bg-transparent border border-company-blue text-white px-10"
                                onChange={changeHandler}
                            />
                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <IoPerson />
                            </span>
                        </div>
                        <div className="col relative flex flex-col space-y-2">
                            <label htmlFor="email" className="text-white">
                                Correo&nbsp;
                                <span className="text-blue-500">*</span>
                            </label>
                            <input
                                disabled={
                                    userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" &&
                                    userRol?.uid !== "Ll6KGdzqdtmLLk0D5jhk"
                                }
                                value={data && data?.email}
                                type="email"
                                name="email"
                                required
                                id="email"
                                className="rounded-xl h-10 bg-transparent border border-company-blue text-white px-10"
                                onChange={changeHandler}
                            />
                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <IoMail />
                            </span>
                        </div>
                        <div className="col relative flex flex-col space-y-2">
                            <label htmlFor="phone" className="text-white">
                                Celular&nbsp;
                                <span className="text-blue-500">*</span>
                            </label>
                            <PhoneInput
                                disabled={
                                    userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" &&
                                    userRol?.uid !== "Ll6KGdzqdtmLLk0D5jhk"
                                }
                                autoFormat={false}
                                inputProps={{
                                    id: "phone",
                                    name: "phone",
                                    required: true,
                                    pattern: "^(\\+?\\d{1,4})?\\s?\\d{11,15}$",
                                    title: "Por favor, ingrese un número de teléfono válido",
                                }}
                                country={"co"}
                                specialLabel=""
                                placeholder=""
                                prefix="+"
                                dropdownStyle={{
                                    color: "black",
                                    borderRadius: 12,
                                }}
                                value={data?.phone}
                                onChange={phoneChangeHandler}
                            />
                            {/* <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <IoCall />
                            </span> */}
                        </div>
                        <div className="col relative flex flex-col space-y-2 w-full">
                            <label htmlFor="data-picker" className="text-white">
                                Fecha de Nacimiento&nbsp;
                                <span className="text-blue-500">*</span>
                            </label>
                            <Datepicker
                                disabled={
                                    userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" &&
                                    userRol?.uid !== "Ll6KGdzqdtmLLk0D5jhk"
                                }
                                startFrom={
                                    data && data?.birthDate
                                        ? new Date(data?.birthDate)
                                        : new Date()
                                }
                                useRange={false}
                                asSingle={true}
                                inputId="data-picker"
                                inputName="data-picker"
                                inputClassName="rounded-xl h-10 bg-transparent border border-company-blue text-white pl-10 pr-4 w-full"
                                onChange={dateChangeHandler}
                                value={data && value}
                                primaryColor={"amber"}
                                separator={"al"}
                                displayFormat={"DD/MM/YYYY"}
                                readOnly={true}
                                i18n={"es"}
                            />
                            {/* <input
                                required
                                value={data && data?.birthDate}
                                type="date"
                                name="birthDate"
                                id="birthDate"
                                className="rounded-xl h-10 bg-transparent border border-company-blue text-white pl-10 pr-4 calendar-light"
                                onChange={dateChangeHandler}
                            /> */}
                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <MdOutlineDateRange />
                            </span>
                        </div>
                        <div className="col relative flex flex-col space-y-2">
                            <label htmlFor="age" className="text-white">
                                Edad&nbsp;
                                <span className="text-blue-500">*</span>
                            </label>
                            <input
                                value={data && data?.age}
                                disabled
                                type="number"
                                name="age"
                                id="age"
                                min={0}
                                max={999}
                                className="rounded-xl h-10 bg-transparent border border-company-blue text-white px-10"
                            />
                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <MdOutlineDateRange />
                            </span>
                        </div>
                        <div className="col relative flex flex-col space-y-2">
                            <label htmlFor="address" className="text-white">
                                Dirección&nbsp;(opcional)
                            </label>
                            <input
                                disabled={
                                    userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" &&
                                    userRol?.uid !== "Ll6KGdzqdtmLLk0D5jhk"
                                }
                                value={data && data?.address}
                                id="address"
                                name="address"
                                type="text"
                                // required
                                className="rounded-xl h-10 bg-transparent border-company-blue border text-white px-10"
                                onChange={changeHandler}
                            />
                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <BsFillGeoAltFill />
                            </span>
                        </div>
                        {userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" && (
                            <>
                                <div className="col relative flex flex-col space-y-2">
                                    <label
                                        htmlFor="Doctor"
                                        className="text-white"
                                    >
                                        Profesional&nbsp;(opcional)
                                    </label>
                                    <input
                                        disabled={
                                            oldData?.createdBy.userRol ===
                                                "ZWb0Zs42lnKOjetXH5lq" ||
                                            (userRol?.uid !==
                                                "ZWb0Zs42lnKOjetXH5lq" &&
                                                userRol?.uid !==
                                                    "Ll6KGdzqdtmLLk0D5jhk")
                                        }
                                        value={professionalName}
                                        type="text"
                                        name="professionalName"
                                        id="Doctor"
                                        className="rounded-xl h-10 bg-transparent border border-company-blue text-white px-10"
                                        onChange={(e) =>
                                            setProfessionalName(e.target.value)
                                        }
                                    />
                                    <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                        <FaUserDoctor />
                                    </span>
                                </div>
                                <div className="col relative flex flex-col space-y-2">
                                    <label
                                        htmlFor="Specialty"
                                        className="text-white"
                                    >
                                        Especialidad
                                    </label>
                                    <input
                                        // disabled={isEdit}
                                        disabled={
                                            professionalName === "" ||
                                            (oldData &&
                                                oldData?.createdBy.userRol !==
                                                    userRol?.uid)
                                        }
                                        value={professionalSpecialty}
                                        type="text"
                                        name="professionalSpecialty"
                                        id="Specialty"
                                        className={`rounded-xl h-10 bg-transparent border ${
                                            professionalName === ""
                                                ? "border-gray-600"
                                                : "border-company-blue"
                                        } text-white px-10`}
                                        onChange={(e) =>
                                            setProfessionalSpecialty(
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <span
                                        className={`absolute left-2 bottom-2 ${
                                            professionalName === ""
                                                ? "text-gray-600"
                                                : "text-company-blue"
                                        } text-[1.5rem]`}
                                    >
                                        <FaUserDoctor />
                                    </span>
                                </div>
                                <div className="col relative flex flex-col space-y-2">
                                    <label
                                        htmlFor="emailDoctor"
                                        className="text-white"
                                    >
                                        Correo del Profesional
                                    </label>
                                    <input
                                        disabled={
                                            professionalName === "" ||
                                            (oldData &&
                                                oldData?.createdBy.userRol !==
                                                    userRol?.uid)
                                        }
                                        value={professionalEmail}
                                        type="email"
                                        name="professionalEmail"
                                        id="emailDoctor"
                                        className={`rounded-xl h-10 bg-transparent border ${
                                            professionalName === ""
                                                ? "border-gray-600"
                                                : "border-company-blue"
                                        }  text-white px-10`}
                                        onChange={(e) =>
                                            setProfessionalEmail(e.target.value)
                                        }
                                    />
                                    <span
                                        className={`absolute left-2 bottom-2 ${
                                            professionalName === ""
                                                ? "text-gray-600"
                                                : "text-company-blue"
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

            {isEdit && userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" ? (
                <>
                    {/* Flujo de acción */}
                    {formStep === 1 && (
                        <>
                            {/* Visualizar PDF */}
                            <div className="flex flex-col mx-28 my-5 space-y-4">
                                <div className="flex flex-row">
                                    <div className="w-1/2">
                                        <button
                                            type="button"
                                            className="flex items-center bg-gray-800 hover:bg-gray-700 shadow-md justify-center space-x-2 px-4 py-2 border border-company-blue rounded-xl text-white"
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
                                                <span>Previsualizar PDF</span>
                                            </Link>
                                        </button>
                                    </div>

                                    {/* Visualizar imágenes en despacho y diagnostico  */}
                                    {(userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl" ||
                                        userRol?.uid ===
                                            "wGU4GU8oDosW4ayQtxqT") && (
                                        <div className="flex flex-col w-1/2 items-center justify-center">
                                            <div
                                                className={`flex flex-row w-1/2 h-full space-x-3 border ${
                                                    !_.isEmpty(
                                                        oldData?.orderImagesUrl,
                                                    )
                                                        ? "border-company-blue hover:bg-gray-700"
                                                        : "border-company-orange"
                                                } rounded-xl items-center justify-center`}
                                            >
                                                <MdOutlineImageSearch
                                                    className={
                                                        !_.isEmpty(
                                                            oldData?.orderImagesUrl,
                                                        )
                                                            ? "text-company-blue"
                                                            : "text-company-orange"
                                                    }
                                                    size={24}
                                                />
                                                {!_.isEmpty(
                                                    oldData?.orderImagesUrl,
                                                ) ? (
                                                    <Link
                                                        href={`/dashboard/images-query/details/${oldData?.uid}`}
                                                        rel="noopener noreferrer"
                                                        target="_blank"
                                                    >
                                                        <span className="text-white">
                                                            Verificar Imágenes
                                                        </span>
                                                    </Link>
                                                ) : (
                                                    <label className="text-company-orange">
                                                        No hay imágenes
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Vista verificación de la orden */}
                                {userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl" && (
                                    <div className="flex flex-row items-center justify-center h-20 space-x-5">
                                        <div className="flex flex-row text-xl space-x-4 w-1/2">
                                            <label htmlFor="cboxOrderIncomplete">
                                                <h1>¿Orden incompleta?</h1>
                                            </label>
                                            <input
                                                id="cboxOrderIncomplete"
                                                type="checkbox"
                                                checked={isOrderIncomplete}
                                                onChange={(e) => {
                                                    handleCheckOrderIncomplete(
                                                        e,
                                                    );
                                                    setAreaSelected(null);
                                                }}
                                                className="w-7 h-7 border-0"
                                            />
                                        </div>
                                        <div className="w-1/2 space-y-2">
                                            {isOrderIncomplete && (
                                                <>
                                                    <label className="text-company-orange text-xl">
                                                        Área de destino:
                                                    </label>
                                                    <SelectComponent
                                                        options={allAreas.filter(
                                                            (area) =>
                                                                oldData?.areaList
                                                                    ? oldData?.areaList?.includes(
                                                                          area.value,
                                                                      )
                                                                    : area,
                                                        )}
                                                        selectChangeHandler={(
                                                            e,
                                                        ) => {
                                                            selectChangeHandlerSentTo(
                                                                e?.value,
                                                            );
                                                            setAreaSelected(e);
                                                        }}
                                                        optionSelected={
                                                            areaSelected
                                                        }
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Recepción */}
                            {userRol?.uid === "Ll6KGdzqdtmLLk0D5jhk" && (
                                <div className="flex flex-col rounded-xl bg-black bg-opacity-50 my-10 mx-28 divide-y divide-slate-500">
                                    <div className="flex flex-col p-4 space-y-4">
                                        <label className="text-company-orange text-xl font-bold">
                                            <span className="text-company-orange">
                                                *
                                            </span>
                                            &nbsp; Según la orden seleccione
                                            áreas a intervenir:
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

                                    <h3 className="text-company-orange text-xl font-bold py-2 px-4">
                                        Observaciones
                                    </h3>
                                    <div className="flex flex-col p-4">
                                        <textarea
                                            value={observationComment}
                                            id="Observations"
                                            name="observations"
                                            rows={6}
                                            cols={50}
                                            className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                            placeholder="Escribe aquí tus observaciones..."
                                            // onChange={commentChangeHandler}
                                            onChange={(e) =>
                                                setObservationComment(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Despacho */}
                            {userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl" && (
                                <div className="grid grid-cols-4 gap-4 mb-10 mx-28">
                                    {/* <div className="col-span-1 flex flex-col justify-end items-center">
                                        <InputFileUpload
                                            fileName={fileName}
                                            handleFileChange={handleFileChange}
                                            fileTypes="application/pdf"
                                        />
                                        {errorImg ? (
                                            <span className="text-base uppercase text-center text-red-400 pt-3">
                                                {errorImg}
                                            </span>
                                        ) : (
                                            <span
                                                className={`text-base text-center ${
                                                    fileName === "SUBIR ARCHIVO"
                                                        ? "text-company-orange"
                                                        : "text-green-500"
                                                } pt-3`}
                                            >
                                                SOLO ARCHOVOS PDF
                                            </span>
                                        )}
                                    </div> */}
                                    <div className="col-span-2 flex flex-col justify-center items-center">
                                        <InputFileUpload
                                            fileName={fileName}
                                            handleFileChange={handleFileChange}
                                            fileTypes="image/*, application/pdf"
                                        />
                                        {errorImg ? (
                                            <span className="text-base uppercase text-center text-red-400">
                                                {errorImg}
                                            </span>
                                        ) : (
                                            <span
                                                className={`text-base text-center ${
                                                    fileName === "SUBIR ARCHIVO"
                                                        ? "text-company-orange"
                                                        : "text-green-500"
                                                }`}
                                            >
                                                IMÁGENES TIPO: PNG, JPG, JPEG,
                                                PDF
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-span-2 flex flex-col rounded-xl justify-start">
                                        <h1 className="text-company-orange text-xl font-bold">
                                            Diagnosticadores:
                                        </h1>

                                        <div className="grid grid-cols-1 gap-4">
                                            <SelectComponent
                                                options={allDiagnostician}
                                                selectChangeHandler={(e) => {
                                                    selectChangeHandlerDiagnostician(
                                                        e?.value,
                                                    );
                                                    setDiagnosticianSelected(e);
                                                }}
                                                optionSelected={
                                                    diagnosticianSelected
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-4 flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500">
                                        <h3 className="text-company-orange text-xl font-bold px-4 py-2">
                                            Observaciones
                                        </h3>
                                        <div className="grid grid-cols-1 gap-2 p-4">
                                            <textarea
                                                // disabled
                                                value={observationComment}
                                                id="Observations"
                                                name="observations"
                                                rows={4}
                                                cols={50}
                                                className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                                placeholder="Escribe aquí tus observaciones..."
                                                // onChange={
                                                //     commentChangeHandler
                                                // }
                                                onChange={(e) =>
                                                    setObservationComment(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Radiología */}
                            {userRol?.uid === "V5iMSnSlSYsiSDFs4UpI" && (
                                <div className="grid grid-cols-2 gap-4 mb-10 mx-28">
                                    <div className="col flex flex-col justify-end items-center">
                                        <InputFileUpload
                                            fileName={fileName}
                                            handleFileChange={handleFileChange}
                                            fileTypes="image/*, application/pdf, "
                                        />
                                        {errorImg ? (
                                            <span className="text-base uppercase text-center text-red-400 pt-3">
                                                {errorImg}
                                            </span>
                                        ) : (
                                            <span
                                                className={`text-base text-center ${
                                                    fileName === "SUBIR ARCHIVO"
                                                        ? "text-company-orange"
                                                        : "text-green-500"
                                                } pt-3`}
                                            >
                                                IMÁGENES TIPO: PNG, JPG, JPEG,
                                                PDF.
                                            </span>
                                        )}
                                    </div>
                                    <div className="col flex flex-col justify-start items-center">
                                        <InputFileUpload
                                            fileName={fileNameSTL}
                                            handleFileChange={
                                                handleFileChangeSTL
                                            }
                                            fileTypes=""
                                        />
                                        <span
                                            className={`text-base text-center ${
                                                fileName === "SUBIR ARCHIVO"
                                                    ? "text-company-orange"
                                                    : "text-green-500"
                                            } pt-3`}
                                        >
                                            ARCHIVOS TIPO STL
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex flex-col space-y-2 rounded-xl">
                                        <h1 className="text-company-orange text-xl font-bold">
                                            URL WeTransfer:
                                        </h1>

                                        <div className="grid grid-cols-1 gap-4 relative">
                                            <input
                                                value={urlWeTransfer}
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
                                    <div className="col-span-2 flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500">
                                        <h3 className="text-company-orange text-xl font-bold px-4 py-2">
                                            Observaciones
                                        </h3>
                                        <div className="grid grid-cols-1 gap-2 p-4">
                                            <textarea
                                                // disabled
                                                value={observationComment}
                                                id="Observations"
                                                name="observations"
                                                rows={4}
                                                cols={50}
                                                className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                                placeholder="Escribe aquí tus observaciones..."
                                                // onChange={
                                                //     commentChangeHandler
                                                // }
                                                onChange={(e) =>
                                                    setObservationComment(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Diagnostico  */}
                            {userRol?.uid === "wGU4GU8oDosW4ayQtxqT" && (
                                <div className="grid grid-cols-2 gap-4 my-10 mx-28">
                                    <div className="col-span-2 flex flex-col justify-end items-center">
                                        <InputFileUpload
                                            fileName={fileName}
                                            handleFileChange={handleFileChange}
                                            fileTypes="application/pdf"
                                        />
                                        {errorImg ? (
                                            <span className="text-base uppercase text-center text-red-400 pt-3">
                                                {errorImg}
                                            </span>
                                        ) : (
                                            <span
                                                className={`text-base text-center ${
                                                    fileName === "SUBIR ARCHIVO"
                                                        ? "text-company-orange"
                                                        : "text-green-500"
                                                } pt-3`}
                                            >
                                                ARCHIVOS PDF.
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-span-2 flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500">
                                        <h3 className="text-company-orange text-xl font-bold px-4 py-2">
                                            Observaciones
                                        </h3>
                                        <div className="grid grid-cols-1 gap-2 p-4">
                                            <textarea
                                                // disabled
                                                value={observationComment}
                                                id="Observations"
                                                name="observations"
                                                rows={4}
                                                cols={50}
                                                className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                                placeholder="Escribe aquí tus observaciones..."
                                                // onChange={
                                                //     commentChangeHandler
                                                // }
                                                onChange={(e) =>
                                                    setObservationComment(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Laboratorio y Fotografía  */}
                            {(userRol?.uid === "chbFffCzpRibjYRyoWIx" ||
                                userRol?.uid === "c24R4P0VcQmQT0VT6nfo") && (
                                <div className="grid grid-cols-2 gap-4 mb-10 mx-28">
                                    <div className="col-span-2 flex flex-col justify-end items-center">
                                        <InputFileUpload
                                            fileName={fileName}
                                            handleFileChange={handleFileChange}
                                            // fileTypes="image/*"
                                        />
                                        {errorImg ? (
                                            <span className="text-base uppercase text-center text-red-400 pt-3">
                                                {errorImg}
                                            </span>
                                        ) : (
                                            <span
                                                className={`text-base text-center ${
                                                    fileName === "SUBIR ARCHIVO"
                                                        ? "text-company-orange"
                                                        : "text-green-500"
                                                } pt-3`}
                                            >
                                                IMÁGENES TIPO: PNG, JPG, JPEG.
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-span-2 flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500">
                                        <h3 className="text-company-orange text-xl font-bold px-4 py-2">
                                            Observaciones
                                        </h3>
                                        <div className="grid grid-cols-1 gap-2 p-4">
                                            <textarea
                                                // disabled
                                                value={observationComment}
                                                id="Observations"
                                                name="observations"
                                                rows={4}
                                                cols={50}
                                                className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                                placeholder="Escribe aquí tus observaciones..."
                                                // onChange={
                                                //     commentChangeHandler
                                                // }
                                                onChange={(e) =>
                                                    setObservationComment(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Modelos  */}
                            {userRol?.uid === "g9xGywTJG7WSJ5o1bTsH" && (
                                <div className="grid grid-cols-3 gap-4 mb-10 mx-28">
                                    <div className="col-span-1 flex flex-col space-y-8 py-4">
                                        <h1 className="text-company-orange text-2xl font-bold">
                                            Diagnósticos
                                        </h1>

                                        <div className="grid grid-cols-1 gap-4">
                                            <SelectComponent
                                                options={allDiagnoses}
                                                selectChangeHandler={(e) => {
                                                    selectChangeHandlerDiagnoses(
                                                        e?.value,
                                                    );
                                                    setDiagnosesSelected(e);
                                                }}
                                                optionSelected={
                                                    diagnosesSelected
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-1 flex flex-col space-y-8 py-4 justify-center items-center">
                                        <h1 className="text-company-orange text-xl">
                                            Tipo de Modelo:
                                        </h1>
                                        <div className="flex flex-row justify-around w-full">
                                            <div className="flex space-x-2 justify-center items-center text-white">
                                                <input
                                                    id="radio-1"
                                                    type="radio"
                                                    value="E"
                                                    checked={modelType === "E"}
                                                    onChange={handleModelType}
                                                    className="w-6 h-6 border-2"
                                                />
                                                <label htmlFor="radio-1">
                                                    Estudio
                                                </label>
                                            </div>
                                            <div className="flex space-x-2 justify-center items-center text-white">
                                                <input
                                                    id="radio-2"
                                                    type="radio"
                                                    value="T"
                                                    checked={modelType === "T"}
                                                    onChange={handleModelType}
                                                    className="w-6 h-6 border-2"
                                                />
                                                <label htmlFor="radio-2">
                                                    Trabajo
                                                </label>
                                            </div>
                                            <div className="flex space-x-2 justify-center items-center text-white">
                                                <input
                                                    id="radio-3"
                                                    type="radio"
                                                    value="C"
                                                    checked={modelType === "C"}
                                                    onChange={handleModelType}
                                                    className="w-6 h-6 border-0"
                                                />
                                                <label htmlFor="radio-3">
                                                    Copia
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-1 flex flex-col justify-end items-center">
                                        <InputFileUpload
                                            fileName={fileName}
                                            handleFileChange={handleFileChange}
                                            // fileTypes="image/*"
                                        />
                                        {errorImg ? (
                                            <span className="text-base uppercase text-center text-red-400 pt-3">
                                                {errorImg}
                                            </span>
                                        ) : (
                                            <span
                                                className={`text-base text-center ${
                                                    fileName === "SUBIR ARCHIVO"
                                                        ? "text-company-orange"
                                                        : "text-green-500"
                                                } pt-3`}
                                            >
                                                IMÁGENES TIPO: PNG, JPG, JPEG.
                                            </span>
                                        )}
                                    </div>
                                    <div className="col-span-3 flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500">
                                        <h3 className="text-company-orange text-xl font-bold px-4 py-2">
                                            Observaciones
                                        </h3>
                                        <div className="grid grid-cols-1 gap-2 p-4">
                                            <textarea
                                                // disabled
                                                value={observationComment}
                                                id="Observations"
                                                name="observations"
                                                rows={4}
                                                cols={50}
                                                className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                                placeholder="Escribe aquí tus observaciones..."
                                                // onChange={
                                                //     commentChangeHandler
                                                // }
                                                onChange={(e) =>
                                                    setObservationComment(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Escáner Modelos  */}
                            {userRol?.uid === "VEGkDuMXs2mCGxXUPCWI" && (
                                <div className="grid grid-cols-2 gap-4 mb-10 mx-28">
                                    <div className="col-span-2 flex flex-col justify-end items-center">
                                        <InputFileUpload
                                            fileName={fileName}
                                            handleFileChange={handleFileChange}
                                            // fileTypes="image/*"
                                        />
                                        {errorImg ? (
                                            <span className="text-base uppercase text-center text-red-400 pt-3">
                                                {errorImg}
                                            </span>
                                        ) : (
                                            <span
                                                className={`text-base text-center ${
                                                    fileName === "SUBIR ARCHIVO"
                                                        ? "text-company-orange"
                                                        : "text-green-500"
                                                } pt-3`}
                                            >
                                                IMÁGENES TIPO: PNG, JPG, JPEG.
                                            </span>
                                        )}
                                    </div>
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
                                    <div className="col-span-2 flex flex-col  rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500">
                                        <h3 className="text-company-orange text-xl font-bold px-4 py-2">
                                            Observaciones
                                        </h3>
                                        <div className="grid grid-cols-1 gap-2 p-4">
                                            <textarea
                                                // disabled
                                                value={observationComment}
                                                id="Observations"
                                                name="observations"
                                                rows={4}
                                                cols={50}
                                                className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                                placeholder="Escribe aquí tus observaciones..."
                                                // onChange={
                                                //     commentChangeHandler
                                                // }
                                                onChange={(e) =>
                                                    setObservationComment(
                                                        e.target.value,
                                                    )
                                                }
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
                        <div className="flex flex-col mx-20">
                            <div className="mx-auto mb-8">
                                <DentalSelect
                                    setSelected={
                                        !isEdit
                                            ? setDentalSelectBoneScan
                                            : () => {}
                                    }
                                    selected={dentalSelectBoneScan}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Intra Orales
                                    </h3>
                                    <div className="grid grid-rows-4 grid-flow-col gap-4">
                                        {optionsData.intraOralsOptions.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col flex space-x-2 items-center"
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelectedIntraOrals(
                                                                            selectedIntraOrals.includes(
                                                                                option,
                                                                            )
                                                                                ? selectedIntraOrals.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          option,
                                                                                  )
                                                                                : [
                                                                                      ...selectedIntraOrals,
                                                                                      option,
                                                                                  ],
                                                                        );
                                                                }}
                                                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selectedIntraOrals.includes(
                                                                        option,
                                                                    )
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selectedIntraOrals.includes(
                                                                    option,
                                                                ) && (
                                                                    <IoCheckmark color="black" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Extra Orales
                                    </h3>
                                    <div className="grid grid-rows-4 grid-flow-col gap-4">
                                        {optionsData.extraOralsOptions.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col flex space-x-2 items-center"
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelectedExtraOrals(
                                                                            selectedExtraOrals.includes(
                                                                                option,
                                                                            )
                                                                                ? selectedExtraOrals.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          option,
                                                                                  )
                                                                                : [
                                                                                      ...selectedExtraOrals,
                                                                                      option,
                                                                                  ],
                                                                        );
                                                                }}
                                                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selectedExtraOrals.includes(
                                                                        option,
                                                                    )
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selectedExtraOrals.includes(
                                                                    option,
                                                                ) && (
                                                                    <IoCheckmark color="black" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {formStep === 2 && (
                        <div className="flex flex-col mx-20">
                            <div className="mx-auto mb-8">
                                <DentalSelect
                                    setSelected={
                                        !isEdit
                                            ? setDentalSelectTomography
                                            : () => {}
                                    }
                                    selected={dentalSelectTomography}
                                />
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                <div className="col-span-3 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Tomografía volumétrica 3D
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {optionsData.volumetricTomography.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`col ${
                                                            optionsData
                                                                .volumetricTomography
                                                                .length -
                                                                1 ===
                                                                index &&
                                                            "col-span-2"
                                                        } flex space-x-2 items-center`}
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelected3DVolumetricTomography(
                                                                            selected3DVolumetricTomography.includes(
                                                                                option,
                                                                            )
                                                                                ? selected3DVolumetricTomography.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          option,
                                                                                  )
                                                                                : [
                                                                                      ...selected3DVolumetricTomography,
                                                                                      option,
                                                                                  ],
                                                                        );
                                                                }}
                                                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selected3DVolumetricTomography.includes(
                                                                        option,
                                                                    )
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selected3DVolumetricTomography.includes(
                                                                    option,
                                                                ) && (
                                                                    <IoCheckmark
                                                                        color="black"
                                                                        // className="text-xl"
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <span className="text-white">
                                                                {option}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Forma de entrega adicional
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {optionsData.additionalDeliveryMethod.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col flex space-x-2 items-center"
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelectedAdditionalDeliveryMethod(
                                                                            selectedAdditionalDeliveryMethod.includes(
                                                                                option,
                                                                            )
                                                                                ? selectedAdditionalDeliveryMethod.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          option,
                                                                                  )
                                                                                : [
                                                                                      ...selectedAdditionalDeliveryMethod,
                                                                                      option,
                                                                                  ],
                                                                        );
                                                                }}
                                                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selectedAdditionalDeliveryMethod.includes(
                                                                        option,
                                                                    )
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selectedAdditionalDeliveryMethod.includes(
                                                                    option,
                                                                ) && (
                                                                    <IoCheckmark color="black" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {formStep === 3 && (
                        <div className="flex flex-col mx-20">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Diagnóstico
                                    </h3>
                                    <div className="grid grid-cols-4 gap-4">
                                        {optionsData.diagnosis.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col flex space-x-2 items-center"
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelectedDiagnosis(
                                                                            selectedDiagnosis.includes(
                                                                                option,
                                                                            )
                                                                                ? selectedDiagnosis.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          option,
                                                                                  )
                                                                                : [
                                                                                      ...selectedDiagnosis,
                                                                                      option,
                                                                                  ],
                                                                        );
                                                                }}
                                                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selectedDiagnosis.includes(
                                                                        option,
                                                                    )
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selectedDiagnosis.includes(
                                                                    option,
                                                                ) && (
                                                                    <IoCheckmark color="black" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start">
                                                            <span className="text-white">
                                                                {option}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Modelos
                                    </h3>
                                    <div className="grid grid-cols-4 gap-4">
                                        {optionsData.models.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col flex space-x-2 items-center"
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelectedModels(
                                                                            selectedModels.includes(
                                                                                option,
                                                                            )
                                                                                ? selectedModels.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          option,
                                                                                  )
                                                                                : [
                                                                                      ...selectedModels,
                                                                                      option,
                                                                                  ],
                                                                        );
                                                                }}
                                                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selectedModels.includes(
                                                                        option,
                                                                    )
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selectedModels.includes(
                                                                    option,
                                                                ) && (
                                                                    <IoCheckmark color="black" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {formStep === 4 && (
                        <div className="flex flex-col mx-20">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Intra Orales
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {optionsData.intraOralClinicalPhotography.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`col ${
                                                            optionsData
                                                                .intraOralClinicalPhotography
                                                                .length -
                                                                1 ===
                                                                index &&
                                                            "col-span-2"
                                                        } flex space-x-2 items-center`}
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelectedIntraOralClinicalPhotography(
                                                                            selectedIntraOralClinicalPhotography.includes(
                                                                                option,
                                                                            )
                                                                                ? selectedIntraOralClinicalPhotography.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          option,
                                                                                  )
                                                                                : [
                                                                                      ...selectedIntraOralClinicalPhotography,
                                                                                      option,
                                                                                  ],
                                                                        );
                                                                }}
                                                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selectedIntraOralClinicalPhotography.includes(
                                                                        option,
                                                                    )
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selectedIntraOralClinicalPhotography.includes(
                                                                    option,
                                                                ) && (
                                                                    <IoCheckmark color="black" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Extra Orales
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {optionsData.extraOralClinicalPhotography.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`col ${
                                                            optionsData
                                                                .extraOralClinicalPhotography
                                                                .length -
                                                                1 ===
                                                                index &&
                                                            "col-span-2"
                                                        } flex space-x-2 items-center`}
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelectedExtraOralClinicalPhotography(
                                                                            selectedExtraOralClinicalPhotography.includes(
                                                                                option,
                                                                            )
                                                                                ? selectedExtraOralClinicalPhotography.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          option,
                                                                                  )
                                                                                : [
                                                                                      ...selectedExtraOralClinicalPhotography,
                                                                                      option,
                                                                                  ],
                                                                        );
                                                                }}
                                                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selectedExtraOralClinicalPhotography.includes(
                                                                        option,
                                                                    )
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selectedExtraOralClinicalPhotography.includes(
                                                                    option,
                                                                ) && (
                                                                    <IoCheckmark color="black" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Presentación
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {optionsData.presentation.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col flex space-x-2 items-center"
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelectedPresentation(
                                                                            selectedPresentation.includes(
                                                                                option,
                                                                            )
                                                                                ? selectedPresentation.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          option,
                                                                                  )
                                                                                : [
                                                                                      ...selectedPresentation,
                                                                                      option,
                                                                                  ],
                                                                        );
                                                                }}
                                                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selectedPresentation.includes(
                                                                        option,
                                                                    )
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selectedPresentation.includes(
                                                                    option,
                                                                ) && (
                                                                    <IoCheckmark color="black" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Fondo
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {optionsData.background.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col flex space-x-2 items-center"
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelectedBackground(
                                                                            option,
                                                                        );
                                                                }}
                                                                className={`flex border border-white justify-center items-center rounded-full h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selectedBackground ===
                                                                    option
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selectedBackground ===
                                                                    option && (
                                                                    <FaCircle
                                                                        color="black"
                                                                        size={
                                                                            10
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Formas de entrega adicional
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        {optionsData.clinicalPhotographyDeliveryMethod.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col flex space-x-2 items-center"
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelectedClinicalPhotographyDeliveryMethod(
                                                                            selectedClinicalPhotographyDeliveryMethod.includes(
                                                                                option,
                                                                            )
                                                                                ? selectedClinicalPhotographyDeliveryMethod.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          option,
                                                                                  )
                                                                                : [
                                                                                      ...selectedClinicalPhotographyDeliveryMethod,
                                                                                      option,
                                                                                  ],
                                                                        );
                                                                }}
                                                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selectedClinicalPhotographyDeliveryMethod.includes(
                                                                        option,
                                                                    )
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selectedClinicalPhotographyDeliveryMethod.includes(
                                                                    option,
                                                                ) && (
                                                                    <IoCheckmark color="black" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {formStep === 5 && (
                        <div className="flex flex-col mx-20">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                    <h3 className="text-company-orange text-xl font-bold">
                                        Paquete de diagnóstico
                                    </h3>
                                    <div className="grid grid-cols-4 gap-4">
                                        {optionsData.diagnosticPackage.map(
                                            (option: any, index: any) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="col flex space-x-2 items-start"
                                                    >
                                                        <div className="">
                                                            <div
                                                                onClick={() => {
                                                                    !isEdit &&
                                                                        setSelectedDiagnosticPackage(
                                                                            selectedDiagnosticPackage.includes(
                                                                                option,
                                                                            )
                                                                                ? selectedDiagnosticPackage.filter(
                                                                                      (
                                                                                          item,
                                                                                      ) =>
                                                                                          item !==
                                                                                          option,
                                                                                  )
                                                                                : [
                                                                                      ...selectedDiagnosticPackage,
                                                                                      option,
                                                                                  ],
                                                                        );
                                                                }}
                                                                className={`border border-white rounded-[4px] h-4 w-4 ${
                                                                    !isEdit &&
                                                                    "cursor-pointer"
                                                                } ${
                                                                    selectedDiagnosticPackage.includes(
                                                                        option,
                                                                    )
                                                                        ? "bg-company-orange"
                                                                        : "bg-transparent"
                                                                }`}
                                                            >
                                                                {selectedDiagnosticPackage.includes(
                                                                    option,
                                                                ) && (
                                                                    <IoCheckmark color="black" />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <span className="text-white">
                                                            {option}
                                                        </span>
                                                    </div>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        userRol?.uid !== "Ll6KGdzqdtmLLk0D5jhk"
                                            ? "col-span-1"
                                            : "col-span-2"
                                    } flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500`}
                                >
                                    {userRol?.uid ===
                                        "Ll6KGdzqdtmLLk0D5jhk" && (
                                        <div className="flex flex-col py-2 px-4 space-y-4">
                                            <label className="text-company-orange text-xl font-bold">
                                                <span className="text-company-orange">
                                                    *
                                                </span>
                                                &nbsp; Seleccione áreas a
                                                intervenir:
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
                                                optionSelected={
                                                    areasListSelected
                                                }
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-company-orange text-xl font-bold py-2 px-4">
                                        Observaciones
                                    </h3>
                                    <div className="flex flex-col p-4">
                                        <textarea
                                            disabled={isEdit}
                                            value={observationComment}
                                            id="Observations"
                                            name="observations"
                                            rows={4}
                                            cols={50}
                                            className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                            placeholder="Escribe aquí tus observaciones..."
                                            onChange={(e) =>
                                                setObservationComment(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                {userRol?.uid !== "Ll6KGdzqdtmLLk0D5jhk" && (
                                    <div className="col-span-1 flex flex-col rounded-xl bg-black bg-opacity-50 divide-y divide-slate-500">
                                        <h3 className="text-company-orange text-xl font-bold px-4 py-2">
                                            Impresión diagnostica
                                        </h3>
                                        <div className="grid grid-cols-1 gap-2 p-4">
                                            <textarea
                                                disabled={isEdit}
                                                value={
                                                    diagnosticImpressionComment
                                                }
                                                id="DiagnosticImpression"
                                                name="diagnosticImpression"
                                                rows={4}
                                                cols={50}
                                                className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                                placeholder="Escribe aquí tus observaciones..."
                                                onChange={(e) =>
                                                    setDiagnosticImpressionComment(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}

            {formStep === 6 && (
                <div className="flex flex-col px-20 py-10 relative">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-4 p-4">
                            {isEdit ? (
                                <h2 className="text-company-orange font-bold text-4xl">
                                    Examen Editado con Éxito
                                </h2>
                            ) : (
                                <h2 className="text-company-orange font-bold text-4xl">
                                    Examen Finalizado con Éxito
                                </h2>
                            )}
                            <p className="text-white w-full text-justify pb-10">
                                Lorem ipsum dolor sit amet, consectetuer
                                adipiscing elit, sed diam nonummy nibh euismod
                                tincidunt ut laoreet dolore magna aliquam erat
                                volutpat. Ut wisi enim ad minim veniam, quis
                                nostrud exerci tation ullamcorper suscipit
                                lobortis nisl ut aliquip ex ea commodo
                                consequat.
                            </p>
                            {userRol?.uid !== "ZWb0Zs42lnKOjetXH5lq" &&
                                userRol?.uid !== "9RZ9uhaiwMC7VcTyIzhl" && (
                                    <div className="flex flex-col">
                                        {!_.isEmpty(areaList) && (
                                            // &&
                                            // oldData?.sendTo === area
                                            <div className="flex flex-col space-y-4 pb-10">
                                                <label className="text-company-orange text-xl">
                                                    <span className="text-company-orange">
                                                        *
                                                    </span>
                                                    &nbsp; Enviar a:
                                                </label>
                                                <SelectComponent
                                                    options={allAreas.filter(
                                                        (area) =>
                                                            // !_.isEmpty(
                                                            //     oldData?.areaList,
                                                            // )
                                                            //     ? [...areaList as string[],...oldData?.areaList].includes(
                                                            //           area.value,
                                                            //       )
                                                            //     :
                                                            areaList?.includes(
                                                                area.value,
                                                            ),
                                                    )}
                                                    selectChangeHandler={(
                                                        e,
                                                    ) => {
                                                        selectChangeHandlerSentTo(
                                                            e?.value,
                                                        );
                                                        setAreaSelected(e);
                                                    }}
                                                    optionSelected={
                                                        areaList
                                                            ? areaSelected
                                                            : []
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}

                            {(areaSelected ||
                                // userRol?.uid === "Ll6KGdzqdtmLLk0D5jhk" ||
                                userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl" ||
                                userRol?.uid === "ZWb0Zs42lnKOjetXH5lq") && (
                                <div className="flex justify-center items-center">
                                    <button
                                        type={
                                            areaSelected ? "button" : "submit"
                                        }
                                        onClick={(e) => {
                                            areaSelected && handleSendForm(e);
                                        }}
                                        className="w-48 h-10 flex mb-5 items-center justify-center bg-gray-800 hover:bg-gray-700 shadow-md px-1 py-2 border border-company-blue rounded-xl text-white"
                                    >
                                        <span>
                                            {userRol?.uid ===
                                                "9RZ9uhaiwMC7VcTyIzhl" &&
                                            !isOrderIncomplete
                                                ? "Finalizar Orden"
                                                : "Guardar y Enviar"}
                                        </span>
                                    </button>
                                </div>
                            )}

                            <div className="flex flex-row pt-10 space-x-10">
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        isEdit && formStep === 6
                                            ? setFormStep(1)
                                            : setFormStep(
                                                  (prevStep: number) =>
                                                      prevStep - 1,
                                              );
                                    }}
                                    className="flex items-center cursor-pointer text-company-blue"
                                >
                                    <BiChevronLeft size={32} />
                                    <span>Atrás</span>
                                </div>
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        router.replace(
                                            isEdit
                                                ? "/dashboard/orders-historial"
                                                : "/dashboard",
                                        );
                                    }}
                                    className="flex items-center cursor-pointer text-company-blue"
                                >
                                    <IoCloseSharp size={28} />
                                    <span>Cancelar</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col h-auto justify-center items-center absolute left-[60%] -bottom-0">
                            <DoctorVector width={500} height={500} />
                        </div>
                    </div>
                </div>
            )}
            {formStep === 7 && (
                <div className="flex flex-col p-16 relative">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-row space-x-4 rounded-xl bg-black bg-opacity-40">
                            <div className="flex flex-col pr-[40%] pb-[15%] pl-[10%] pt-[10%] space-y-8">
                                {userRol?.uid === "9RZ9uhaiwMC7VcTyIzhl" &&
                                !isOrderIncomplete ? (
                                    <h2 className="text-company-orange font-bold text-4xl">
                                        {`La orden #${currentOrderId} ha sido cerrada con éxito.`}
                                    </h2>
                                ) : (
                                    <h2 className="text-company-orange font-bold text-4xl">
                                        {`La orden #${currentOrderId} ha sido enviada con éxito al área
                                    encargada${
                                        areaSelected
                                            ? ": " + areaSelected.label + "."
                                            : "."
                                    }`}
                                    </h2>
                                )}

                                <button
                                    type="button"
                                    onClick={() => {
                                        router.replace(
                                            oldData
                                                ? "/dashboard/orders-historial/?to=send"
                                                : "/dashboard/orders-historial",
                                        );
                                    }}
                                    className="w-48 flex justify-center items-center space-x-2 text-white hover:text-gray-300 text-center border-sky-800 hover:border-sky-300 border-2 rounded-md p-2 bg-company-gray shadow-lg"
                                >
                                    <span>Ir al historial</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center absolute left-[60%] -bottom-0">
                            <DoctorVector width={500} height={500} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StepByStep;
