import _ from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoCheckmark, IoEye } from "react-icons/io5";
import { options } from "./constants/StepByStepConstants";
import DentalSelect from "./orders/dental-select";
import SelectComponent from "./SelectComponent";
import DoctorVector from "./vectors/DoctorVector";

interface Props {
    formStep: number;
    setFormStep: (e: any) => void;
    user?: string;
    isEdit?: boolean;
    setDataSelected: (e: any) => void;
    data: any;
}

function StepByStep({
    formStep,
    setFormStep,
    user,
    isEdit,
    setDataSelected,
    data,
}: Props) {
    const router = useRouter();

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
            selectedIntraOrals,
            selectedExtraOrals,
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
        ],
        [
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
        ],
    );

    const valData = useCallback(async () => {
        setDataSelected(!_.isEmpty(_.flattenDeep(allDataSelected)));
    }, [allDataSelected, setDataSelected]);

    useEffect(() => {
        valData();
    }, [allDataSelected, setDataSelected, valData]);

    return (
        <div className="flex flex-col">
            {formStep === 0 && (
                <div className="mx-16 bg-black bg-opacity-50 rounded-2xl p-8 flex flex-col space-y-8">
                    <h3 className="text-2xl text-company-orange">
                        Datos del Paciente
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col flex flex-col space-y-2">
                            <label htmlFor="patientId" className="text-white">
                                Cédula
                            </label>
                            <input
                                type="number"
                                name="patientId"
                                id="patientId"
                                min={0}
                                max={9999999999}
                                className="h-10 border border-company-blue rounded-xl bg-transparent text-white px-4"
                            />
                        </div>
                        <div className="col flex flex-col space-y-2">
                            <label htmlFor="firstName" className="text-white">
                                Nombres
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                className="h-10 border border-company-blue rounded-xl bg-transparent text-white px-4"
                            />
                        </div>
                        <div className="col flex flex-col space-y-2">
                            <label htmlFor="lastName" className="text-white">
                                Apellidos
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                className="h-10 border border-company-blue rounded-xl bg-transparent text-white px-4"
                            />
                        </div>
                        <div className="col flex flex-col space-y-2">
                            <label htmlFor="email" className="text-white">
                                Correo
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="h-10 border border-company-blue rounded-xl bg-transparent text-white px-4"
                            />
                        </div>
                        <div className="col flex flex-col space-y-2">
                            <label htmlFor="birthday" className="text-white">
                                Fecha de Nacimiento
                            </label>
                            <input
                                type="date"
                                name="birthday"
                                id="birthday"
                                className="calendar-light h-10 border border-company-blue rounded-xl bg-transparent text-white px-4"
                            />
                        </div>
                        <div className="col flex flex-col space-y-2">
                            <label htmlFor="age" className="text-white">
                                Edad
                            </label>
                            <input
                                disabled
                                type="number"
                                name="age"
                                id="age"
                                min={0}
                                max={150}
                                className="h-10 border border-company-blue rounded-xl bg-transparent text-white px-4"
                            />
                        </div>
                        {user === "Receptionist" && (
                            <>
                                <div className="col flex flex-col space-y-2">
                                    <label
                                        htmlFor="Specialty"
                                        className="text-white"
                                    >
                                        Especialidad
                                    </label>
                                    <input
                                        type="text"
                                        name="Specialty"
                                        id="Specialty"
                                        className="h-10 border border-company-blue rounded-xl bg-transparent text-white px-4"
                                    />
                                </div>
                                <div className="col flex flex-col space-y-2">
                                    <label
                                        htmlFor="Doctor"
                                        className="text-white"
                                    >
                                        Doctor
                                    </label>
                                    <input
                                        type="text"
                                        name="Doctor"
                                        id="Doctor"
                                        className="h-10 border border-company-blue rounded-xl bg-transparent text-white px-4"
                                    />
                                </div>
                                <div className="col flex flex-col space-y-2">
                                    <label
                                        htmlFor="emailDoctor"
                                        className="text-white"
                                    >
                                        Correo Doctor
                                    </label>
                                    <input
                                        type="email"
                                        name="emailDoctor"
                                        id="emailDoctor"
                                        className="h-10 border border-company-blue rounded-xl bg-transparent text-white px-4"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            {formStep === 1 && (
                <div className="flex flex-col mx-20">
                    <h3 className="text-company-blue text-3xl font-bold pb-5">
                        Radiografía
                    </h3>
                    <div className="mx-auto mb-8">
                        <DentalSelect />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                            <h3 className="text-company-orange text-xl font-bold">
                                Intra Orales
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {data.intraOralsOptions.map(
                                    (option: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col flex space-x-2 items-center"
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                selectedIntraOrals.includes(
                                                                    option,
                                                                )
                                                            ) {
                                                                let selectedList =
                                                                    selectedIntraOrals.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item !==
                                                                            option,
                                                                    );
                                                                setSelectedIntraOrals(
                                                                    selectedList,
                                                                );
                                                            } else {
                                                                setSelectedIntraOrals(
                                                                    [
                                                                        ...selectedIntraOrals,
                                                                        option,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                            <div className="grid grid-cols-2 gap-4">
                                {data.extraOralsOptions.map(
                                    (option: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col flex space-x-2 items-center"
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                selectedExtraOrals.includes(
                                                                    option,
                                                                )
                                                            ) {
                                                                let selectedList =
                                                                    selectedExtraOrals.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item !==
                                                                            option,
                                                                    );
                                                                setSelectedExtraOrals(
                                                                    selectedList,
                                                                );
                                                            } else {
                                                                setSelectedExtraOrals(
                                                                    [
                                                                        ...selectedExtraOrals,
                                                                        option,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                    <h3 className="text-company-blue text-3xl font-bold pb-5">
                        Tomografía
                    </h3>
                    <div className="mx-auto mb-8">
                        <DentalSelect />
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="col-span-3 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                            <h3 className="text-company-orange text-xl font-bold">
                                Tomografía volumétrica 3D
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {data.volumetricTomography.map(
                                    (option: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col flex space-x-2 items-center"
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                selected3DVolumetricTomography.includes(
                                                                    option,
                                                                )
                                                            ) {
                                                                let selectedList =
                                                                    selected3DVolumetricTomography.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item !==
                                                                            option,
                                                                    );
                                                                setSelected3DVolumetricTomography(
                                                                    selectedList,
                                                                );
                                                            } else {
                                                                setSelected3DVolumetricTomography(
                                                                    [
                                                                        ...selected3DVolumetricTomography,
                                                                        option,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                                                    <span
                                                        className={`text-white ${
                                                            option.length >=
                                                                30 && "text-xs"
                                                        }`}
                                                    >
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
                                {data.additionalDeliveryMethod.map(
                                    (option: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col flex space-x-2 items-center"
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                selectedAdditionalDeliveryMethod.includes(
                                                                    option,
                                                                )
                                                            ) {
                                                                let selectedList =
                                                                    selectedAdditionalDeliveryMethod.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item !==
                                                                            option,
                                                                    );
                                                                setSelectedAdditionalDeliveryMethod(
                                                                    selectedList,
                                                                );
                                                            } else {
                                                                setSelectedAdditionalDeliveryMethod(
                                                                    [
                                                                        ...selectedAdditionalDeliveryMethod,
                                                                        option,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                    <h3 className="text-company-blue text-3xl font-bold pb-5">
                        Diagnósticos/Modelos
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                            <h3 className="text-company-orange text-xl font-bold">
                                Diagnóstico
                            </h3>
                            <div className="grid grid-cols-4 gap-4">
                                {data.diagnosis.map(
                                    (option: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col flex space-x-2 items-center"
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                selectedDiagnosis.includes(
                                                                    option,
                                                                )
                                                            ) {
                                                                let selectedList =
                                                                    selectedDiagnosis.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item !==
                                                                            option,
                                                                    );
                                                                setSelectedDiagnosis(
                                                                    selectedList,
                                                                );
                                                            } else {
                                                                setSelectedDiagnosis(
                                                                    [
                                                                        ...selectedDiagnosis,
                                                                        option,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                                Modelos
                            </h3>
                            <div className="grid grid-cols-4 gap-4">
                                {data.models.map((option: any, index: any) => {
                                    return (
                                        <div
                                            key={index}
                                            className="col flex space-x-2 items-center"
                                        >
                                            <div className="">
                                                <div
                                                    onClick={() => {
                                                        if (
                                                            selectedModels.includes(
                                                                option,
                                                            )
                                                        ) {
                                                            let selectedList =
                                                                selectedModels.filter(
                                                                    (item) =>
                                                                        item !==
                                                                        option,
                                                                );
                                                            setSelectedModels(
                                                                selectedList,
                                                            );
                                                        } else {
                                                            setSelectedModels([
                                                                ...selectedModels,
                                                                option,
                                                            ]);
                                                        }
                                                    }}
                                                    className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {formStep === 4 && (
                <div className="flex flex-col mx-20">
                    <h3 className="text-company-blue text-3xl font-bold pb-5">
                        Fotografía clínica
                    </h3>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                            <h3 className="text-company-orange text-xl font-bold">
                                Intra Orales
                            </h3>
                            <div className="grid grid-cols-3 gap-4">
                                {data.intraOralClinicalPhotography.map(
                                    (option: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col flex space-x-2 items-center"
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                selectedIntraOralClinicalPhotography.includes(
                                                                    option,
                                                                )
                                                            ) {
                                                                let selectedList =
                                                                    selectedIntraOralClinicalPhotography.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item !==
                                                                            option,
                                                                    );
                                                                setSelectedIntraOralClinicalPhotography(
                                                                    selectedList,
                                                                );
                                                            } else {
                                                                setSelectedIntraOralClinicalPhotography(
                                                                    [
                                                                        ...selectedIntraOralClinicalPhotography,
                                                                        option,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                            <div className="grid grid-cols-2 gap-4">
                                {data.extraOralClinicalPhotography.map(
                                    (option: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col flex space-x-2 items-center"
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                selectedExtraOralClinicalPhotography.includes(
                                                                    option,
                                                                )
                                                            ) {
                                                                let selectedList =
                                                                    selectedExtraOralClinicalPhotography.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item !==
                                                                            option,
                                                                    );
                                                                setSelectedExtraOralClinicalPhotography(
                                                                    selectedList,
                                                                );
                                                            } else {
                                                                setSelectedExtraOralClinicalPhotography(
                                                                    [
                                                                        ...selectedExtraOralClinicalPhotography,
                                                                        option,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                                {data.presentation.map(
                                    (option: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col flex space-x-2 items-center"
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                selectedPresentation.includes(
                                                                    option,
                                                                )
                                                            ) {
                                                                let selectedList =
                                                                    selectedPresentation.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item !==
                                                                            option,
                                                                    );
                                                                setSelectedPresentation(
                                                                    selectedList,
                                                                );
                                                            } else {
                                                                setSelectedPresentation(
                                                                    [
                                                                        ...selectedPresentation,
                                                                        option,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                                {data.background.map(
                                    (option: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col flex space-x-2 items-center"
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                selectedBackground.includes(
                                                                    option,
                                                                )
                                                            ) {
                                                                let selectedList =
                                                                    selectedBackground.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item !==
                                                                            option,
                                                                    );
                                                                setSelectedBackground(
                                                                    selectedList,
                                                                );
                                                            } else {
                                                                setSelectedBackground(
                                                                    [
                                                                        ...selectedBackground,
                                                                        option,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                                {data.clinicalPhotographyDeliveryMethod.map(
                                    (option: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col flex space-x-2 items-center"
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                selectedClinicalPhotographyDeliveryMethod.includes(
                                                                    option,
                                                                )
                                                            ) {
                                                                let selectedList =
                                                                    selectedClinicalPhotographyDeliveryMethod.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item !==
                                                                            option,
                                                                    );
                                                                setSelectedClinicalPhotographyDeliveryMethod(
                                                                    selectedList,
                                                                );
                                                            } else {
                                                                setSelectedClinicalPhotographyDeliveryMethod(
                                                                    [
                                                                        ...selectedClinicalPhotographyDeliveryMethod,
                                                                        option,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                    <h3 className="text-company-blue text-3xl font-bold pb-5">
                        Entregas
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                            <h3 className="text-company-orange text-xl font-bold">
                                Paquete de diagnóstico
                            </h3>
                            <div className="grid grid-cols-4 gap-4">
                                {data.diagnosticPackage.map(
                                    (option: any, index: any) => {
                                        return (
                                            <div
                                                key={index}
                                                className="col flex space-x-2 items-center"
                                            >
                                                <div className="">
                                                    <div
                                                        onClick={() => {
                                                            if (
                                                                selectedDiagnosticPackage.includes(
                                                                    option,
                                                                )
                                                            ) {
                                                                let selectedList =
                                                                    selectedDiagnosticPackage.filter(
                                                                        (
                                                                            item,
                                                                        ) =>
                                                                            item !==
                                                                            option,
                                                                    );
                                                                setSelectedDiagnosticPackage(
                                                                    selectedList,
                                                                );
                                                            } else {
                                                                setSelectedDiagnosticPackage(
                                                                    [
                                                                        ...selectedDiagnosticPackage,
                                                                        option,
                                                                    ],
                                                                );
                                                            }
                                                        }}
                                                        className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${
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
                                user !== "Receptionist"
                                    ? "col-span-1"
                                    : "col-span-2"
                            } flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50`}
                        >
                            <h3 className="text-company-orange text-xl font-bold">
                                Observaciones
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                <p className="text-white text-justify">
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Repudiandae praesentium
                                    ullam pariatur qui blanditiis unde sunt a
                                    tempora iure cumque corrupti, maiores beatae
                                    explicabo dolores nisi. Error a nam
                                    possimus.
                                </p>
                                <p className="text-white text-justify">
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Repudiandae praesentium
                                    ullam pariatur qui blanditiis unde sunt a
                                    tempora iure cumque corrupti, maiores beatae
                                    explicabo dolores nisi. Error a nam
                                    possimus.
                                </p>
                            </div>
                        </div>
                        {user !== "Receptionist" && (
                            <div className="col-span-1 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                                <h3 className="text-company-orange text-xl font-bold">
                                    Impresión diagnostica
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Repudiandae
                                        praesentium ullam pariatur qui
                                        blanditiis unde sunt a tempora iure
                                        cumque corrupti, maiores beatae
                                        explicabo dolores nisi. Error a nam
                                        possimus.
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur,
                                        adipisicing elit. Repudiandae
                                        praesentium ullam pariatur qui
                                        blanditiis unde sunt a tempora iure
                                        cumque corrupti, maiores beatae
                                        explicabo dolores nisi. Error a nam
                                        possimus.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {formStep === 6 && (
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
                                <div className="mt-10 space-y-8">
                                    <h5>FIRMA:</h5>
                                    <p className="border-b-2"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {formStep === 7 && (
                <div className="flex flex-col mx-20">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-4 p-4 mb-[50%]">
                            {isEdit ? (
                                <h2 className="text-company-orange font-bold text-4xl">
                                    Examen editado con exito
                                </h2>
                            ) : (
                                <h2 className="text-company-orange font-bold text-4xl">
                                    Examen finalizado con exito
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
                            {user === "Receptionist" && (
                                <div className="pr-10 space-y-4 pb-10">
                                    <label className="text-company-orange">
                                        Enviar a:
                                    </label>
                                    <SelectComponent options={options} />
                                </div>
                            )}
                            <div className="grid grid-cols-1 xl:grid-cols-2">
                                <button
                                    onClick={() => {
                                        let step = formStep;
                                        step++;
                                        setFormStep(step);
                                    }}
                                    className="w-48 flex items-center justify-center bg-gray-800 hover:bg-gray-700 shadow-md px-1 py-2 border border-company-blue rounded-xl text-white"
                                >
                                    <span>Guardar y enviar</span>
                                </button>
                                <button
                                    onClick={() => {
                                        router.replace(
                                            "/dashboard/new-order/preview-order",
                                        );
                                    }}
                                    className="w-48 flex items-center justify-center bg-gray-800 hover:bg-gray-700 shadow-md space-x-2 px-1 py-2 border border-company-blue rounded-xl text-white"
                                >
                                    <IoEye
                                        className="text-company-blue"
                                        size={24}
                                    />
                                    <span>Previsualizar</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col h-auto justify-center items-center absolute left-[50%] -bottom-5">
                            <DoctorVector width={500} height={500} />
                        </div>
                    </div>
                </div>
            )}
            {formStep === 8 && (
                <div className="flex flex-col mx-20">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col space-y-4 rounded-xl pr-[40%] pb-[20%] pl-[10%] pt-[15%] bg-black bg-opacity-40">
                            <h2 className="text-company-orange font-bold text-4xl">
                                La orden #345 ha sido enviada con éxito al área
                                encargada
                            </h2>
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 pt-10">
                                <button
                                    onClick={() => {
                                        router.replace(
                                            "/dashboard/orders-historial",
                                        );
                                    }}
                                    className="w-48 flex justify-center items-center space-x-2 text-white hover:text-gray-300 text-center border-sky-800 hover:border-sky-300 border-2 rounded-md p-2 bg-company-gray shadow-lg"
                                >
                                    <span>Ir al historial</span>
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center absolute left-[50%] -bottom-4">
                            <DoctorVector width={500} height={500} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StepByStep;
