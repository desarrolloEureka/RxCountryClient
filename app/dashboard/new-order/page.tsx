"use client";
import DashboardHeader from "@/app/component/DashboardHeader";
import LightIcon from "@/app/component/icons/LightIcon";
import { useState } from "react";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward, IoMdSearch } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import DoctorVector from "@/app/component/vectors/DoctorVector";
import {
  IoAlertCircleSharp,
  IoArrowBackCircleOutline,
  IoArrowForward,
  IoCheckmark,
  IoEye,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import DentalSelect from "@/app/component/orders/dental-select";

const NewOrderPage = () => {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);
  const [formStep, setFormStep] = useState(0);

  // section 2
  const [selectedIntraOrals, setSelectedIntraOrals] = useState<string[]>([]);
  const intraOralsOptions = [
    "Periapical Parcial",
    "Juego Parcial Completo",
    "Milimitrada",
    "Completo con Coronales",
    "Coronales",
    "Superior",
    "Oclusal",
    "Inferior",
  ];

  const [selectedExtraOrals, setSelectedExtraOrals] = useState<string[]>([]);
  const extraOralsOptions = [
    "Panorámica",
    "Perfil con papel cefalométrico",
    "Postero - Anterior",
    "ATM Transcraneal",
    "Carpograma",
    "Carpograma con lectura informada",
    "Waters",
    "Submentón - Vertexl",
  ];

  const [selected3DVolumetricTomography, setSelected3DVolumetricTomography] =
    useState<string[]>([]);
  const volumetricTomography = [
    "Zona",
    "A.TM Cóndilo - 3D",
    "Medidas Tomográficas 3D",
    "Maxiliar Inferior",
    "Cara completa",
    "Lecturas Tomográficas 3D",
    "Maxilar Superior",
    "Guía Quirúrgica",
    "Tomográfia terceros molares",
    "Bimaxilar",
    "Periapical Parcial",
    "Facial con estudio Cefalometrico Craneo Cervical (Protocolo de Rocabado)",
    "Senos Paranasales",
    "Alta resolución con lectura (fractura-endodoncia)",
  ];

  const [
    selectedAdditionalDeliveryMethod,
    setSelectedAdditionalDeliveryMethod,
  ] = useState<string[]>([]);

  const additionalDeliveryMethod = [
    "Archivos Dicom",
    "Web",
    "CD",
    "Impreso en papel",
  ];

  const [
    selectedDiagnosis,
    setSelectedDiagnosis,
  ] = useState<string[]>([]);

  const diagnosis = [
    "Ricketts",
    "Bjork - Jarabak",
    "Antero-posterior Grummons",
    "Modelos",
    "Bimler",
    "Steiner",
    "Legan Duros",
    "Lectura Informada radiografía 2D",
    "Sassouni",
    "McNamara",
    "Radiografía Intraorales",
    "Radiografía Extra Oral",
  ];

  const [
    selectedModels,
    setSelectedModels,
  ] = useState<string[]>([]);

  const models = [
    "De estudio",
    "De trabajo",
    "Modelos digitales STL",
    "Toma de modelos a Domicilio",
    "Digitalización de Modelos",
  ];

  const [
    selectedIntraOralClinicalPhotography,
    setSelectedIntraOralClinicalPhotography,
  ] = useState<string[]>([]);

  const intraOralClinicalPhotography = [
    "Oclusión de frente",
    "Oclusión izquierda",
    "Over - Jet",
    "Oclusión derecha",
    "Arco superior",
    "Over - Bite",
    "Base Nariz",
    "Arco Inferior",
  ];

  const [
    selectedExtraOralClinicalPhotography,
    setSelectedExtraOralClinicalPhotography,
  ] = useState<string[]>([]);

  const extraOralClinicalPhotography = [
    "Frente",
    "Sonrisa",
    "Perfil derecho",
    "3/4 derecha",
    "Perfil izquierdo",
    "3/4 izquierda",
    "Perfil Silueta",
    "Plantilla 11 -fotos (plantilla como usted lo indique) ",
  ];

  const [
    selectedPresentation,
    setSelectedPresentation,
  ] = useState<string[]>([]);

  const presentation = [
    "Papel Color",
    "Tamaño Natural 1-1",
    "Blanco y Negro",
    "Digital ",
  ];

  const [
    selectedBackground,
    setSelectedBackground,
  ] = useState<string[]>([]);

  const background = [
    "Blanco",
    "Negro",
  ];

  const [
    selectedClinicalPhotographyDeliveryMethod,
    setSelectedClinicalPhotographyDeliveryMethod,
  ] = useState<string[]>([]);

  const clinicalPhotographyDeliveryMethod = [
    "WEB",
    "CD"
  ];

  return (
    <main className="relative min-h-screen w-full bg-gray-image bg-fixed bg-cover">
      <div className="bg-black bg-opacity-60 flex flex-col w-full min-h-screen p-16 space-y-16">
        <DashboardHeader selectedMenuItem="create-order" />
        <div className="flex flex-col rounded-3xl shadow-lg bg-company-gray w-full max-w-[1440px] mx-auto">
          <div className="flex justify-center items-center">
            <div className="flex justify-between items-center w-full p-8">
              <div className="flex items-center space-x-8">
                <Link href={"/dashboard/images-query"}>
                  <IoArrowBackCircleOutline
                    className="text-company-blue"
                    size={32}
                  />
                </Link>
              </div>
              <div></div>
              <div className="flex flex-col items-center space-y-2 text-white text-sm">
                <button
                  onClick={() => setShowHelp(true)}
                  className="rounded-full w-8 h-8 flex justify-center items-center shadow-lg bg-white"
                >
                  <LightIcon color="#5696D3" />
                </button>
                <span>Ayuda</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {formStep === 0 && (
              <div className="mx-16 bg-black bg-opacity-50 rounded-2xl p-8 flex flex-col space-y-8">
                <h3 className="text-2xl text-company-orange">
                  Datos del paciente
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col flex flex-col space-y-2">
                    <label
                      htmlFor="patientId"
                      className="text-white"
                    >
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
                    <label
                      htmlFor="firstName"
                      className="text-white"
                    >
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
                    <label
                      htmlFor="lastName"
                      className="text-white"
                    >
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
                    <label
                      htmlFor="email"
                      className="text-white"
                    >
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
                    <label
                      htmlFor="age"
                      className="text-white"
                    >
                      Edad
                    </label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      min={0}
                      max={150}
                      className="h-10 border border-company-blue rounded-xl bg-transparent text-white px-4"
                    />
                  </div>
                  <div className="col flex flex-col space-y-2">
                    <label
                      htmlFor="birthday"
                      className="text-white"
                    >
                      Fecha de nacimiento
                    </label>
                    <input
                      type="date"
                      name="birthday"
                      id="birthday"
                      className="h-10 border border-company-blue rounded-xl bg-transparent text-white px-4"
                    />
                  </div>
                </div>
              </div>
            )}
            {formStep === 1 && (
              <div className="flex flex-col mx-20">
                <div className="mx-auto mb-8">
                  <DentalSelect />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                    <h3 className="text-company-orange text-xl font-bold">
                      Intra Orales
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {intraOralsOptions.map(
                        (option, index) => {
                          return (
                            <div
                              key={index}
                              className="col flex space-x-2 items-center"
                            >
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
                                className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${selectedIntraOrals.includes(
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
                      {extraOralsOptions.map(
                        (option, index) => {
                          return (
                            <div
                              key={index}
                              className="col flex space-x-2 items-center"
                            >
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
                                className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${selectedExtraOrals.includes(
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
                  <DentalSelect />
                </div>
                <div className="grid grid-cols-5 gap-4">
                  <div className="col-span-3 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                    <h3 className="text-company-orange text-xl font-bold">
                      Tomografía volumétrica 3D
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {volumetricTomography.map(
                        (option, index) => {
                          return (
                            <div
                              key={index}
                              className="col flex space-x-2 items-center"
                            >
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
                                className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${selected3DVolumetricTomography.includes(
                                  option,
                                )
                                  ? "bg-company-orange"
                                  : "bg-transparent"
                                  }`}
                              >
                                {selected3DVolumetricTomography.includes(
                                  option,
                                ) && (
                                    <IoCheckmark color="black" />
                                  )}
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
                      Forma de entrega adicional
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {additionalDeliveryMethod.map(
                        (option, index) => {
                          return (
                            <div
                              key={index}
                              className="col flex space-x-2 items-center"
                            >
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
                                className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${selectedAdditionalDeliveryMethod.includes(
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
                      {diagnosis.map(
                        (option, index) => {
                          return (
                            <div
                              key={index}
                              className="col flex space-x-2 items-center"
                            >
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
                                className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${selectedDiagnosis.includes(
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
                      {models.map(
                        (option, index) => {
                          return (
                            <div
                              key={index}
                              className="col flex space-x-2 items-center"
                            >
                              <div
                                onClick={() => {
                                  if (
                                    selectedModels.includes(
                                      option,
                                    )
                                  ) {
                                    let selectedList =
                                      selectedModels.filter(
                                        (
                                          item,
                                        ) =>
                                          item !==
                                          option,
                                      );
                                    setSelectedModels(
                                      selectedList,
                                    );
                                  } else {
                                    setSelectedModels(
                                      [
                                        ...selectedModels,
                                        option,
                                      ],
                                    );
                                  }
                                }}
                                className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${selectedModels.includes(
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
                <h3 className="text-company-blue text-3xl font-bold pb-5">
                  Fotografía clínica
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2 flex flex-col space-y-4 p-4 rounded-xl bg-black bg-opacity-50">
                    <h3 className="text-company-orange text-xl font-bold">
                      Intra Orales
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {intraOralClinicalPhotography.map(
                        (option, index) => {
                          return (
                            <div
                              key={index}
                              className="col flex space-x-2 items-center"
                            >
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
                                className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${selectedIntraOralClinicalPhotography.includes(
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
                      {extraOralClinicalPhotography.map(
                        (option, index) => {
                          return (
                            <div
                              key={index}
                              className="col flex space-x-2 items-center"
                            >
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
                                className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${selectedExtraOralClinicalPhotography.includes(
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
                      {presentation.map(
                        (option, index) => {
                          return (
                            <div
                              key={index}
                              className="col flex space-x-2 items-center"
                            >
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
                                className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${selectedPresentation.includes(
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
                      {background.map(
                        (option, index) => {
                          return (
                            <div
                              key={index}
                              className="col flex space-x-2 items-center"
                            >
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
                                className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${selectedBackground.includes(
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
                      {clinicalPhotographyDeliveryMethod.map(
                        (option, index) => {
                          return (
                            <div
                              key={index}
                              className="col flex space-x-2 items-center"
                            >
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
                                className={`border border-white rounded-[4px] h-4 w-4 cursor-pointer ${selectedClinicalPhotographyDeliveryMethod.includes(
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
          </div>
          <div className="flex flex-row items-center mt-8 overflow-visible bg-company-blue w-full h-[0.1rem]">
            <div
              className={`h-4 w-${formStep}/6 bg-company-blue ${formStep < 5 ? "rounded-r-full" : "rounded-none"
                }`}
            />
            <div className={`h-4 w-${6 - formStep}/6`} />
          </div>
          <div className="flex justify-between items-center p-8">
            <div className="text-white">Paso {formStep}/5</div>
            <div className="flex items-center space-x-8">
              {formStep > 0 && (
                <div
                  onClick={() => {
                    let step = formStep;
                    step--;
                    setFormStep(step);
                  }}
                  className="flex items-center cursor-pointer text-company-blue"
                >
                  <BiChevronLeft size={32} />
                  <span>Atrás</span>
                </div>
              )}
              {formStep < 6 && (
                <div
                  onClick={() => {
                    let step = formStep;
                    step++;
                    setFormStep(step);
                  }}
                  className="flex items-center cursor-pointer text-company-blue"
                >
                  <span>Siguiente</span>
                  <BiChevronRight size={32} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showHelp && (
        <>
          <div className="absolute top-[22rem] right-[5.5rem] 2xl:right-64 bg-white p-2 rounded-xl">
            <div className="flex justify-end items-center">
              <button onClick={() => setShowHelp(false)}>
                <MdClose color="gray" size={24} />
              </button>
            </div>
            <div className="flex items-center space-x-2 text-black pr-6 pb-5 text-justify">
              <IoAlertCircleSharp
                className="text-company-orange mx-4"
                size={40}
              />
              <p className="w-64">
                Si una orden tiene una alerta en la campana de
                notificación quiere decir que en ella
                encontraras las observaciones por cada area de
                esta orden.
              </p>
            </div>
          </div>
          <div className="fixed transition-transform right-16 -bottom-3">
            <DoctorVector />
          </div>
        </>
      )}
    </main>
  );
};

export default NewOrderPage;
