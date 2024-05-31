import _ from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BiChevronLeft } from "react-icons/bi";
import { BsFillGeoAltFill, BsFillPersonVcardFill } from "react-icons/bs";
import { FaUserDoctor } from "react-icons/fa6";
import {
    IoCall,
    IoCheckmark,
    IoCloseSharp,
    IoEye,
    IoMail,
    IoPerson,
} from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import PreviewOrder from "./PreviewOrder";
import "../style.css";
import { AreasSelector } from "../types/areas";
import { idTypes } from "./constants/formConstants";
import DentalSelect from "./orders/dental-select";
import SelectComponent from "./SelectComponent";
import DoctorVector from "./vectors/DoctorVector";

interface Props {
    formStep: number;
    setFormStep: (e: any) => void;
    userRol?: string;
    currentOrderId: number;
    suggestions?: any[];
    isEdit?: boolean;
    setIsDataSelected: (e: any) => void;
    changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectChangeHandlerIdType: (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => void;
    dateChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
    phoneChangeHandler: (phone: string) => void;
    idChangeHandler: (id: string) => void;
    setSelectedOptions: (e: any) => void;
    handleSendForm: (e: any) => Promise<void>;
    selectChangeHandlerSentTo: (e: any) => void;
    handleClose: (e: any) => void;
    data: any;
    optionsData: any;
    oldData?: any;
    wrapperRef?: any;
    allAreas: AreasSelector[];
}

function StepByStep({
    formStep,
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
    wrapperRef,
    handleClose,
    changeHandler,
    idChangeHandler,
    selectChangeHandlerIdType,
    dateChangeHandler,
    phoneChangeHandler,
    setSelectedOptions,
    handleSendForm,
    selectChangeHandlerSentTo,
    handleInputChange,
}: Props) {
    const router = useRouter();

    // console.log(oldData);

    const [professionalName, setProfessionalName] = useState("");
    const [professionalSpecialty, setProfessionalSpecialty] = useState("");
    const [professionalEmail, setProfessionalEmail] = useState("");
    const [areaSelected, setAreaSelected] = useState<any>();

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

    const allDataSelected = useMemo(
        () => [
            {
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
                observationComment:
                    userRol === "Profesional"
                        ? observationComment
                        : oldData?.observationComment
                        ? oldData?.observationComment
                        : "",
                diagnosticImpressionComment,
            },
        ],
        [
            professionalName,
            professionalSpecialty,
            professionalEmail,
            dentalSelectBoneScan,
            dentalSelectTomography,
            diagnosticImpressionComment,
            observationComment,
            selected3DVolumetricTomography,
            selectedAdditionalDeliveryMethod,
            selectedBackground,
            selectedClinicalPhotographyDeliveryMethod,
            selectedDiagnosis,
            selectedDiagnosticPackage,
            selectedExtraOralClinicalPhotography,
            selectedExtraOrals,
            selectedIntraOralClinicalPhotography,
            selectedIntraOrals,
            selectedModels,
            selectedPresentation,
            userRol,
            oldData,
        ],
    );

    const backToOrder = () => {
        setFormStep(6);
    };

    const valData = useCallback(async () => {
        const dataSelected: {
            [key: string]: string | number[] | string[];
        } = { ...allDataSelected[0] };

        if (userRol !== "Profesional") {
            //crea propiedad según rol
            dataSelected[
                userRol?.substring(0, 3).toLocaleLowerCase() +
                    "ObservationComment"
            ] = observationComment;
        }

        setIsDataSelected(_.some(dataSelected, (value) => !_.isEmpty(value)));

        setSelectedOptions(dataSelected);
    }, [
        allDataSelected,
        observationComment,
        setIsDataSelected,
        setSelectedOptions,
        userRol,
    ]);

    const getObservationComment = (
        userRol: string | undefined,
        oldData: Record<string, any>,
    ) => {
        const isProfessional = userRol === "Profesional";
        const userRoleKey =
            userRol?.substring(0, 3).toLocaleLowerCase() + "ObservationComment";
        const userRoleComment = oldData?.[userRoleKey];
        const generalComment = oldData?.observationComment;

        if (!isProfessional && userRoleComment) {
            return userRoleComment;
        }

        if (
            (userRoleComment && generalComment !== userRoleComment) ||
            isProfessional
        ) {
            return generalComment;
        }

        return "";
    };

    const userComment = getObservationComment(userRol, oldData);

    useEffect(() => {
        valData();
    }, [valData]);

    useEffect(() => {
        if (oldData) {
            setProfessionalName(oldData.professionalName);
            setProfessionalSpecialty(oldData.professionalSpecialty);
            setProfessionalEmail(oldData.professionalEmail);
            setObservationComment(userComment);
            // setObservationComment(
            //     userRol !== "Profesional" &&
            //         oldData?.[
            //             userRol?.substring(0, 3).toLocaleLowerCase() +
            //                 "ObservationComment"
            //         ]
            //         ? oldData?.[
            //               userRol?.substring(0, 3).toLocaleLowerCase() +
            //                   "ObservationComment"
            //           ]
            //         : oldData?.[
            //               userRol?.substring(0, 3).toLocaleLowerCase() +
            //                   "ObservationComment"
            //           ] &&
            //           oldData?.observationComment !==
            //               oldData?.[
            //                   userRol?.substring(0, 3).toLocaleLowerCase() +
            //                       "ObservationComment"
            //               ]
            //         ? oldData.observationComment
            //         : "",
            // );
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
        }
    }, [oldData, userComment, userRol]);

    return (
        <div>
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
                                value={data.idType}
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
                            ref={wrapperRef}
                        >
                            <label htmlFor="patientId" className="text-white">
                                Documento&nbsp;
                                <span className="text-blue-500">*</span>
                            </label>
                            <input
                                value={data.id}
                                type="text"
                                name="id"
                                required
                                id="patientId"
                                min={0}
                                max={9999999999}
                                className="rounded-xl h-10 bg-transparent border border-company-blue text-white px-10"
                                onChange={handleInputChange}
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
                            {data.id && (
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
                                value={data.name}
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
                                value={data.lastName}
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
                                value={data.email}
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
                                autoFormat={false}
                                inputProps={{
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
                                value={data.phone}
                                onChange={phoneChangeHandler}
                            />
                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <IoCall />
                            </span>
                        </div>
                        <div className="col relative flex flex-col space-y-2">
                            <label htmlFor="birthDate" className="text-white">
                                Fecha de Nacimiento&nbsp;(opcional)
                            </label>
                            <input
                                value={data.birthDate}
                                type="date"
                                name="birthDate"
                                id="birthDate"
                                className="rounded-xl h-10 bg-transparent border border-company-blue text-white pl-10 pr-4 calendar-light"
                                onChange={dateChangeHandler}
                            />
                            <span className="absolute left-2 bottom-2 text-company-blue text-[1.5rem]">
                                <MdOutlineDateRange />
                            </span>
                        </div>
                        {/* <div className="col flex flex-col space-y-2">
                            <label htmlFor="age" className="text-white">
                                Edad
                            </label>
                            <input
                                value={data.age}
                                disabled
                                type="number"
                                name="age"
                                id="age"
                                min={0}
                                max={999}
                                className="rounded-xl h-10 bg-transparent border border-company-blue text-white px-4"
                            />
                        </div> */}
                        <div className="col relative flex flex-col md:col-span-2 space-y-2">
                            <label htmlFor="address" className="text-white">
                                Dirección&nbsp;(opcional)
                            </label>
                            <input
                                value={data.address}
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
                        {userRol === "Recepción" && (
                            <>
                                <div className="col relative flex flex-col space-y-2">
                                    <label
                                        htmlFor="Doctor"
                                        className="text-white"
                                    >
                                        Profesional&nbsp;(opcional)
                                    </label>
                                    <input
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
                                        disabled={professionalName === ""}
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
                                        disabled={professionalName === ""}
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
            {formStep === 1 && (
                <div className="flex flex-col mx-20">
                    <div className="mx-auto mb-8">
                        <DentalSelect
                            setSelected={
                                !isEdit || oldData?.status !== "enviada"
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
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
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
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
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
                                !isEdit || oldData?.status !== "enviada"
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
                                                        index && "col-span-2"
                                                } flex space-x-2 items-center`}
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
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
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
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
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
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
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
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
                                                        index && "col-span-2"
                                                } flex space-x-2 items-center`}
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
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
                                                        index && "col-span-2"
                                                } flex space-x-2 items-center`}
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
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
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
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
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
                                                                setSelectedBackground(
                                                                    selectedBackground.includes(
                                                                        option,
                                                                    )
                                                                        ? selectedBackground.filter(
                                                                              (
                                                                                  item,
                                                                              ) =>
                                                                                  item !==
                                                                                  option,
                                                                          )
                                                                        : [
                                                                              ...selectedBackground,
                                                                              option,
                                                                          ],
                                                                );
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 ${
                                                            !isEdit &&
                                                            "cursor-pointer"
                                                        } ${
                                                            selectedBackground.includes(
                                                                option,
                                                            )
                                                                ? "bg-company-orange"
                                                                : "bg-transparent"
                                                        }`}
                                                    >
                                                        {selectedBackground.includes(
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
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
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
                                                            (!isEdit ||
                                                                oldData.status !==
                                                                    "enviada") &&
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
                                userRol !== "Recepción"
                                    ? "col-span-1"
                                    : "col-span-2"
                            } flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50`}
                        >
                            <h3 className="text-company-orange text-xl font-bold">
                                Observaciones
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                <textarea
                                    // disabled={isEdit}
                                    value={observationComment}
                                    id="Observations"
                                    name="observations"
                                    rows={4}
                                    cols={50}
                                    className="block p-2.5 w-full text-md text-white bg-transparent rounded-lg border border-transparent focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-white dark:text-white dark:focus:ring-transparent dark:focus:border-transparent custom-scrollbar-textarea"
                                    placeholder="Escribe aquí tus observaciones..."
                                    onChange={(e) =>
                                        setObservationComment(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {userRol !== "Recepción" && (
                            <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                <h3 className="text-company-orange text-xl font-bold">
                                    Impresión diagnostica
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <textarea
                                        value={diagnosticImpressionComment}
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
            {/* {formStep === 6 && (
                <div className="flex flex-col mx-20">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col space-y-4 rounded-xl p-[5%] bg-black bg-opacity-40">
                            <div className="flex flex-col space-y-8 justify-center mx-32">
                                <h2 className="text-company-orange font-bold text-4xl text-center">
                                    CONSENTIMIENTO INFORMADO
                                </h2>
                                <div className="px-[20%] pb-5">
                                    <p className="text-white text-justify font-bold">
                                        Autorizo a Rx Country a realizar ayudas
                                        diagnósticas según orden de servicio,
                                        después de haber leído el documento
                                        titulado. Consentimiento informado
                                    </p>
                                </div>
                                <div className="mt-10 space-y-8 text-white">
                                    <h5>FIRMA:</h5>
                                    <p className="border-b-2"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
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
                            <p className="text-white w-[80%] xl:w-[80%] text-justify pb-10">
                                Lorem ipsum dolor sit amet, consectetuer
                                adipiscing elit, sed diam nonummy nibh euismod
                                tincidunt ut laoreet dolore magna aliquam erat
                                volutpat. Ut wisi enim ad minim veniam, quis
                                nostrud exerci tation ullamcorper suscipit
                                lobortis nisl ut aliquip ex ea commodo
                                consequat.
                            </p>
                            {userRol === "Recepción" && (
                                <div className="pr-10 space-y-4 pb-10">
                                    <label className="text-company-orange">
                                        Enviar a:
                                    </label>
                                    <SelectComponent
                                        options={allAreas}
                                        selectChangeHandlerSentTo={(e) => {
                                            selectChangeHandlerSentTo(e.value);
                                            setAreaSelected(e);
                                        }}
                                        optionSelected={areaSelected}
                                    />
                                </div>
                            )}
                            <div className="grid grid-cols-1 xl:grid-cols-2">
                                <button
                                    onClick={(e) => {
                                        handleSendForm(e).then(() => {
                                            setFormStep(
                                                (prevStep: number) =>
                                                    prevStep + 1,
                                            );
                                        });
                                    }}
                                    className="w-48 flex items-center justify-center bg-gray-800 hover:bg-gray-700 shadow-md px-1 py-2 border border-company-blue rounded-xl text-white"
                                >
                                    <span>Guardar y enviar</span>
                                </button>
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setFormStep(8);
                                    }}
                                    className="w-48 flex items-center justify-center bg-gray-800 hover:bg-gray-700 shadow-md space-x-2 px-1 py-2 border border-company-blue rounded-xl text-white cursor-pointer"
                                >
                                    <IoEye
                                        className="text-company-blue"
                                        size={24}
                                    />
                                    <span>Previsualizar</span>
                                </div>
                            </div>
                            <div className="flex flex-row pt-10 space-x-10">
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setFormStep(
                                            (prevStep: number) => prevStep - 1,
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
                        <div className="flex flex-col h-auto justify-center items-center absolute left-[50%] -bottom-5">
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
                                <h2 className="text-company-orange font-bold text-4xl">
                                    {`La orden #${currentOrderId} ha sido enviada con éxito al área
                                    encargada`}
                                </h2>
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
                        <div className="flex flex-col justify-center items-center absolute left-[50%] -bottom-5">
                            <DoctorVector width={500} height={500} />
                        </div>
                    </div>
                </div>
            )}
            {formStep === 8 && <PreviewOrder backToOrder={backToOrder} />}
        </div>
    );
}

export default StepByStep;
