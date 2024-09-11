"use client";
import tailwindConfig from "@/tailwind.config";
import { Document, Image, Page, Text, View, Font } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";
import JsBarcode from "jsbarcode";

// Función para generar el código de barras en base64
const generateBarcode = (text: string) => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, text, {
        format: "CODE128",
        displayValue: false,
        width: 200,
        height: 100,
    }); // O el formato que prefieras
    return canvas.toDataURL("image/png");
};

Font.register({
    family: "Open Sans",
    fonts: [
        {
            src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
        },
        {
            src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
            fontWeight: 600,
        },
    ],
});

Font.register({
    family: "Oswald",
    src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

type Props = {
    orderData: any;
    formatearFecha: (fechaISO: string) => string;
    quadrant: (inicio: number) => number[];
    optionsData: any;
};

const OrderPDF = ({
    orderData,
    formatearFecha,
    quadrant,
    optionsData,
}: Props) => {
    const tw = createTw(tailwindConfig);
    const barcodeData = generateBarcode(orderData?.uid); // El texto o número del código de barras

    return (
        <Document title={`Orden #${orderData?.uid}`}>
            {/* Pagina 1 */}
            <Page
                size="LETTER"
                style={[tw("flex flex-col p-4"), { fontFamily: "Open Sans" }]}
            >
                {/* HEADER */}
                <View
                    style={tw(
                        "flex h-[10%] min-w-full flex-row border border-black rounded-md mb-5",
                    )}
                >
                    <View style={tw("basis-1/4 border-r")}>
                        <View style={tw("h-3/4")}>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <Image
                                style={tw("w-full h-full p-1")}
                                src="/assets/RXCountryLogo.png"
                            />
                        </View>
                        <View style={tw("h-1/4 items-center justify-center")}>
                            <Text style={tw("text-xs")}>
                                {formatearFecha(orderData?.timestamp)}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={tw(
                            "basis-1/2 justify-around items-center border-r px-5",
                        )}
                    >
                        <Text>Formulario Orden de Servicio</Text>
                        <Text style={tw("text-sm text-justify")}>
                            Presentar el documento de identidad del usuario es
                            requisito obligatorio e indispensable para la
                            atención.
                        </Text>
                        {/* <Text style={tw("text-[8pt] text-center")}>
                            Los paquetes se entregarán en cuatro (4) días
                            hábiles después de la toma, téngalo en cuenta para
                            programar la cita con su odontólogo.
                        </Text> */}
                    </View>

                    <View style={tw("basis-1/4 px-2")}>
                        <View style={tw("h-1/3")}>
                            <Text>{`Orden # 00${orderData?.uid}`}</Text>
                        </View>
                        <View style={tw("h-2/3 items-center justify-center")}>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <Image
                                src={barcodeData}
                                style={tw("w-full h-full p-1")}
                            />
                            {/* <Text style={tw("text-base")}>CÓDIGO BARRAS</Text> */}
                        </View>
                    </View>
                </View>

                {/* BODY */}
                <View style={tw("flex h-[75%] min-w-full flex-col mb-5")}>
                    {/* Datos Paciente */}
                    <View
                        style={tw(
                            "flex h-1/4 border rounded-md border-black mb-5",
                        )}
                    >
                        <View
                            style={tw(
                                "flex flex-1 items-center w-full h-[25%] pt-1",
                            )}
                        >
                            <Text style={tw("text-xl font-bold")}>
                                Datos del Paciente
                            </Text>
                        </View>
                        <View style={tw("flex flex-row h-[25%]")}>
                            <View style={tw("flex pl-10 w-1/3")}>
                                <View style={tw("flex flex-col items-start")}>
                                    <Text style={tw("text-sm")}>
                                        Tipo de Documento
                                    </Text>
                                    <Text style={tw("text-base font-bold")}>
                                        {orderData?.idType}
                                    </Text>
                                </View>
                            </View>
                            <View style={tw("flex w-1/3")}>
                                <View style={tw("flex flex-col items-start")}>
                                    <Text style={tw("text-sm")}>Documento</Text>
                                    <Text style={tw("text-base font-bold")}>
                                        {orderData?.id}
                                    </Text>
                                </View>
                            </View>
                            <View style={tw("flex w-1/3")}>
                                <View style={tw("flex flex-col items-start")}>
                                    <Text style={tw("text-sm")}>Nombres</Text>
                                    <Text style={tw("text-base font-bold")}>
                                        {orderData?.name}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={tw("flex flex-row h-[25%]")}>
                            <View style={tw("flex pl-10 w-1/3")}>
                                <View>
                                    <Text style={tw("text-sm")}>Apellidos</Text>
                                    <Text style={tw("text-base font-bold")}>
                                        {orderData?.lastName}
                                    </Text>
                                </View>
                            </View>
                            <View style={tw("flex w-1/3")}>
                                <View>
                                    <Text style={tw("text-sm")}>Correo</Text>
                                    <Text style={tw("text-base font-bold")}>
                                        {orderData?.email}
                                    </Text>
                                </View>
                            </View>
                            <View style={tw("flex w-1/3")}>
                                <View>
                                    <Text style={tw("text-sm")}>Celular</Text>
                                    <Text style={tw("text-base font-bold")}>
                                        {"+" +
                                            orderData?.phone.substring(0, 2) +
                                            " " +
                                            orderData?.phone.substring(2)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={tw("flex flex-row h-[25%]")}>
                            <View style={tw("flex pl-10 w-1/3")}>
                                <Text style={tw("text-sm")}>
                                    Fecha Nacimiento
                                </Text>
                                <Text style={tw("text-base font-bold")}>
                                    {orderData?.birthDate}
                                </Text>
                            </View>
                            <View style={tw("flex w-1/3")}>
                                <Text style={tw("text-sm")}>Edad</Text>
                                <Text style={tw("text-base font-bold")}>
                                    {orderData?.age}
                                </Text>
                            </View>
                            <View style={tw("flex w-1/3")}>
                                <Text style={tw("text-sm")}>Dirección</Text>
                                <Text style={tw("text-base font-bold")}>
                                    {orderData?.address}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Datos Profesional */}
                    <View
                        style={tw(
                            "flex h-1/4 border rounded-md border-black mb-5",
                        )}
                    >
                        <View
                            style={tw(
                                "flex flex-1 items-center w-full h-1/3 pt-1",
                            )}
                        >
                            <Text style={tw("text-xl font-bold")}>
                                Datos del Profesional
                            </Text>
                        </View>
                        <View style={tw("flex flex-row h-1/3")}>
                            <View style={tw("flex pl-10 w-1/3")}>
                                <View style={tw("flex flex-col items-start")}>
                                    <Text style={tw("text-sm")}>
                                        Nombre del Profesional
                                    </Text>
                                    <Text style={tw("text-base font-bold")}>
                                        {orderData?.professionalName
                                            ? orderData?.professionalName
                                            : "Sin Información"}
                                    </Text>
                                </View>
                            </View>
                            <View style={tw("flex pl-10 w-1/3")}>
                                <View style={tw("flex flex-col items-start")}>
                                    <Text style={tw("text-sm")}>
                                        Especialidad
                                    </Text>
                                    <Text style={tw("text-base font-bold")}>
                                        {orderData?.professionalSpecialty
                                            ? orderData?.professionalSpecialty
                                            : "Sin Información"}
                                    </Text>
                                </View>
                            </View>
                            <View style={tw("flex pl-10 w-1/3")}>
                                <View style={tw("flex flex-col items-start")}>
                                    <Text style={tw("text-sm")}>Celular</Text>
                                    <Text style={tw("text-base font-bold")}>
                                        {orderData?.professionalPhone
                                            ? "+" +
                                              orderData?.professionalPhone.substring(
                                                  0,
                                                  2,
                                              ) +
                                              " " +
                                              orderData?.professionalPhone.substring(
                                                  2,
                                              )
                                            : "Sin Información"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={tw("flex flex-row h-1/3")}>
                            <View style={tw("flex pl-10 w-1/3")}>
                                <View>
                                    <Text style={tw("text-sm")}>Dirección</Text>
                                    <Text style={tw("text-base font-bold")}>
                                        {orderData?.professionalAddress
                                            ? orderData?.professionalAddress
                                            : "Sin Información"}
                                    </Text>
                                </View>
                            </View>
                            <View style={tw("flex pl-10 w-1/3")}>
                                <View>
                                    <Text style={tw("text-sm")}>Correo</Text>
                                    <Text style={tw("text-base font-bold")}>
                                        {orderData?.professionalEmail
                                            ? orderData?.professionalEmail
                                            : "Sin Información"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Contenido Orden */}
                    <View
                        style={tw("flex h-1/2 border border-black rounded-md")}
                    >
                        <View style={tw("flex h-1/2 border-b-[0.5px]")}>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <Image
                                style={tw(
                                    "object-contain absolute w-full h-full py-1",
                                )}
                                src="/assets/cuadrante2.png"
                            />
                            <View style={tw("h-[36%]")}>
                                <Text style={tw("text-lg px-4 pt-1")}>
                                    Radiografías
                                </Text>
                            </View>
                            <View
                                style={tw("flex flex-row justify-center h-2/6")}
                            >
                                <View style={tw("flex flex-col w-[22%] px-1")}>
                                    <View
                                        style={tw(
                                            "flex flex-row h-1/2 pt-[3.3px]",
                                        )}
                                    >
                                        {quadrant(1)
                                            .reverse()
                                            .map((tooth, index) => (
                                                <View key={index}>
                                                    {orderData?.dentalSelectBoneScan.includes(
                                                        tooth,
                                                    ) ? (
                                                        <Text
                                                            style={tw(
                                                                "text-[14px] font-bold px-[2.9px]",
                                                            )}
                                                        >
                                                            X
                                                        </Text>
                                                    ) : (
                                                        <Text
                                                            style={tw(
                                                                "px-[7.3px]",
                                                            )}
                                                        />
                                                    )}
                                                </View>
                                            ))}
                                    </View>
                                    <View
                                        style={tw(
                                            "flex flex-row h-1/2 pt-[0.8px]",
                                        )}
                                    >
                                        {quadrant(4)
                                            .reverse()
                                            .map((tooth, index) => (
                                                <View key={index}>
                                                    {orderData?.dentalSelectBoneScan.includes(
                                                        tooth,
                                                    ) ? (
                                                        <Text
                                                            style={tw(
                                                                "text-[14px] font-bold px-[2.9px]",
                                                            )}
                                                        >
                                                            X
                                                        </Text>
                                                    ) : (
                                                        <Text
                                                            style={tw(
                                                                "px-[7.3px]",
                                                            )}
                                                        />
                                                    )}
                                                </View>
                                            ))}
                                    </View>
                                </View>
                                <View
                                    style={tw("flex flex-col w-[22%] px-1.5")}
                                >
                                    <View
                                        style={tw(
                                            "flex flex-row h-1/2 pt-[3.3px]",
                                        )}
                                    >
                                        {quadrant(2).map((tooth, index) => (
                                            <View key={index}>
                                                {orderData?.dentalSelectBoneScan.includes(
                                                    tooth,
                                                ) ? (
                                                    <Text
                                                        style={tw(
                                                            "text-[14px] font-bold px-[2.9px]",
                                                        )}
                                                    >
                                                        X
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={tw("px-[7.3px]")}
                                                    />
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                    <View
                                        style={tw(
                                            "flex flex-row h-1/2 pt-[0.8px]",
                                        )}
                                    >
                                        {quadrant(3).map((tooth, index) => (
                                            <View key={index}>
                                                {orderData?.dentalSelectBoneScan.includes(
                                                    tooth,
                                                ) ? (
                                                    <Text
                                                        style={tw(
                                                            "text-[14px] font-bold px-[2.9px]",
                                                        )}
                                                    >
                                                        X
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={tw("px-[7.3px]")}
                                                    />
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={tw("flex flex-row h-1/2")}>
                            <View style={tw("flex flex-col w-1/2")}>
                                <View style={tw("h-[20%] items-center")}>
                                    <Text style={tw("text-lg px-4 pt-1")}>
                                        Intra Orales
                                    </Text>
                                </View>
                                <View
                                    style={tw(
                                        "h-[80%] border-t border-r-[0.5px]",
                                    )}
                                >
                                    <View
                                        style={tw(
                                            "flex flex-col flex-wrap justify-center",
                                        )}
                                    >
                                        {optionsData.intraOralsOptions.map(
                                            (option: any, index: any) => (
                                                <View
                                                    key={index}
                                                    style={tw(
                                                        "flex flex-row grow w-1/2 py-2 px-2 justify-center",
                                                    )}
                                                >
                                                    <View
                                                        style={tw(
                                                            "flex flex-1 w-[10%] items-center justify-center",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "h-4 w-4 border rounded items-center justify-center",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "absolute text-[10px] font-bold",
                                                                )}
                                                            >
                                                                {orderData?.selectedIntraOrals.includes(
                                                                    option,
                                                                )
                                                                    ? "X"
                                                                    : " "}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={tw(
                                                            "w-[90%] px-2",
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                "text-xs",
                                                            )}
                                                        >
                                                            {option}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ),
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View style={tw("flex flex-col w-1/2")}>
                                <View style={tw("h-[20%] items-center")}>
                                    <Text style={tw("text-lg px-4 pt-1")}>
                                        Extra Orales
                                    </Text>
                                </View>
                                <View style={tw("h-[80%] border-t")}>
                                    <View
                                        style={tw(
                                            "flex flex-col flex-wrap justify-center",
                                        )}
                                    >
                                        {optionsData.extraOralsOptions.map(
                                            (option: any, index: any) => (
                                                <View
                                                    key={index}
                                                    style={tw(
                                                        "flex flex-row grow w-1/2 py-2 px-2 justify-center",
                                                    )}
                                                >
                                                    <View
                                                        style={tw(
                                                            "flex flex-1 w-[10%] items-center justify-center",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "h-4 w-4 border rounded items-center justify-center",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "absolute text-[10px] font-bold",
                                                                )}
                                                            >
                                                                {orderData?.selectedExtraOrals.includes(
                                                                    option,
                                                                )
                                                                    ? "X"
                                                                    : " "}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={tw(
                                                            "w-[90%] pl-2 pr-11",
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                "text-xs",
                                                            )}
                                                        >
                                                            {option}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ),
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* FOOTER */}
                <View
                    style={tw(
                        "flex h-[10%] min-w-full flex-row border border-black rounded-md",
                    )}
                >
                    <View
                        style={tw(
                            "basis-1/2 p-2 justify-center text-xs items-end justify-around border-r-[0.5px]",
                        )}
                    >
                        <Text>
                            Country: Calle 85 # 12-10 Oficina 411 Tel: 2362772 -
                            2362624
                        </Text>
                        <Text>
                            Santa Bárbara: Avenida 19 #118-30 Local 8 Tel:
                            6296732 - 6293929
                        </Text>
                        <Text>
                            Marly: Calle 47 #13-33 Consultorio 105 Tel: 2451 544
                            - 2320651
                        </Text>
                        <Text>Cel:310 771 0722</Text>
                        <Text>info@rxcountry.com.co</Text>
                    </View>
                    <View
                        style={tw(
                            "basis-1/2 text-base justify-center items-center",
                        )}
                    >
                        <Text>Requiere Cita previa</Text>
                        <Text>Horarios:</Text>
                        <Text>L-V 8:00 am - 5:00 pm</Text>
                        <Text>S. 8:00 am - 1:30 pm</Text>
                    </View>
                </View>

                {/* Pagination */}
                <View style={tw("justify-center items-center text-sm mt-2")}>
                    <Text
                        render={({ pageNumber, totalPages }) =>
                            `${pageNumber} / ${totalPages}`
                        }
                        fixed
                    />
                </View>
            </Page>

            {/* Pagina 2 */}
            <Page
                size="LETTER"
                style={[tw("flex flex-col p-4"), { fontFamily: "Open Sans" }]}
            >
                {/* HEADER */}
                <View
                    style={tw(
                        "flex h-[10%] min-w-full flex-row border border-black rounded-md mb-5",
                    )}
                >
                    <View style={tw("basis-1/4 border-r")}>
                        <View style={tw("h-3/4")}>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <Image
                                style={tw("w-full h-full p-1")}
                                src="/assets/RXCountryLogo.png"
                            />
                        </View>
                        <View style={tw("h-1/4 items-center justify-center")}>
                            <Text style={tw("text-xs")}>
                                {formatearFecha(orderData?.timestamp)}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={tw(
                            "basis-1/2 justify-around items-center border-r px-5",
                        )}
                    >
                        <Text>Formulario Orden de Servicio</Text>
                        <Text style={tw("text-sm text-justify")}>
                            Presentar el documento de identidad del usuario es
                            requisito obligatorio e indispensable para la
                            atención.
                        </Text>
                        {/* <Text style={tw("text-[8pt] text-center")}>
                            Los paquetes se entregarán en cuatro (4) días
                            hábiles después de la toma, téngalo en cuenta para
                            programar la cita con su odontólogo.
                        </Text> */}
                    </View>

                    <View style={tw("basis-1/4 pl-2")}>
                        <View style={tw("h-1/3")}>
                            <Text>{`Orden # 00${orderData?.uid}`}</Text>
                        </View>
                        <View style={tw("h-2/3 items-center justify-center")}>
                            <Text style={tw("text-base")}>CÓDIGO BARRAS</Text>
                        </View>
                    </View>
                </View>

                {/* BODY */}
                <View style={tw("flex h-[75%] min-w-full flex-col mb-5")}>
                    {/* Contenido Orden 1 */}
                    <View
                        style={tw(
                            "flex h-[60%] border border-black rounded-md mb-5",
                        )}
                    >
                        <View style={tw("flex h-[50%] border-b-[0.5px]")}>
                            {/* Titulo Sección */}
                            <View style={tw("h-[16%]")}>
                                <Text style={tw("text-lg px-4")}>
                                    Tomografía Volumétrica 3D en las Sedes
                                    Country-Santa Bárbara-Marly
                                </Text>
                            </View>
                            {/* Selección Dental */}
                            <View
                                style={tw(
                                    "flex flex-row justify-center items-center h-[84%]",
                                )}
                            >
                                {/* Imagen dientes */}
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <Image
                                    style={tw(
                                        "object-contain h-1/2 absolute -top-2 w-full h-full py-1",
                                    )}
                                    src="/assets/cuadrante2.png"
                                />
                                <View
                                    style={tw(
                                        "flex flex-col h-[30%] w-[22.5%] pr-[8px]",
                                    )}
                                >
                                    <View style={tw("flex flex-row h-1/2")}>
                                        {quadrant(1)
                                            .reverse()
                                            .map((tooth, index) => (
                                                <View
                                                    style={tw(
                                                        "w-[12.5%] items-center",
                                                    )}
                                                    key={index}
                                                >
                                                    {orderData?.dentalSelectTomography.includes(
                                                        tooth,
                                                    ) ? (
                                                        <Text
                                                            style={tw(
                                                                "text-[14px] font-bold",
                                                            )}
                                                        >
                                                            X
                                                        </Text>
                                                    ) : (
                                                        <Text
                                                            style={tw(
                                                                "px-[7.3px]",
                                                            )}
                                                        />
                                                    )}
                                                </View>
                                            ))}
                                    </View>
                                    <View style={tw("flex flex-row h-1/2")}>
                                        {quadrant(4)
                                            .reverse()
                                            .map((tooth, index) => (
                                                <View
                                                    style={tw(
                                                        "w-[12.5%] items-center",
                                                    )}
                                                    key={index}
                                                >
                                                    {orderData?.dentalSelectTomography.includes(
                                                        tooth,
                                                    ) ? (
                                                        <Text
                                                            style={tw(
                                                                "text-[14px] font-bold",
                                                            )}
                                                        >
                                                            X
                                                        </Text>
                                                    ) : (
                                                        <Text
                                                            style={tw(
                                                                "px-[7.3px]",
                                                            )}
                                                        />
                                                    )}
                                                </View>
                                            ))}
                                    </View>
                                </View>
                                <View
                                    style={tw(
                                        "flex flex-col h-[30%] w-[22.5%] pl-[8px]",
                                    )}
                                >
                                    <View style={tw("flex flex-row h-1/2")}>
                                        {quadrant(2).map((tooth, index) => (
                                            <View
                                                style={tw(
                                                    "w-[12.5%] items-center",
                                                )}
                                                key={index}
                                            >
                                                {orderData?.dentalSelectTomography.includes(
                                                    tooth,
                                                ) ? (
                                                    <Text
                                                        style={tw(
                                                            "text-[14px] font-bold",
                                                        )}
                                                    >
                                                        X
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={tw("px-[7.3px]")}
                                                    />
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                    <View style={tw("flex flex-row h-1/2")}>
                                        {quadrant(3).map((tooth, index) => (
                                            <View
                                                style={tw(
                                                    "w-[12.5%] items-center",
                                                )}
                                                key={index}
                                            >
                                                {orderData?.dentalSelectTomography.includes(
                                                    tooth,
                                                ) ? (
                                                    <Text
                                                        style={tw(
                                                            "text-[14px] font-bold",
                                                        )}
                                                    >
                                                        X
                                                    </Text>
                                                ) : (
                                                    <Text
                                                        style={tw("px-[7.3px]")}
                                                    />
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={tw("flex flex-row h-[50%]")}>
                            <View style={tw("flex flex-col w-2/3")}>
                                <View
                                    style={tw(
                                        "h-[14.5%] items-center justify-center",
                                    )}
                                >
                                    <Text style={tw("text-lg px-4")}>
                                        Tomografía volumétrica 3D
                                    </Text>
                                </View>
                                <View
                                    style={tw(
                                        "h-[85.5%] border-t border-r-[0.5px]",
                                    )}
                                >
                                    <View
                                        style={tw(
                                            "flex flex-col flex-wrap justify-center",
                                        )}
                                    >
                                        {optionsData.volumetricTomography.map(
                                            (option: any, index: any) => (
                                                <View
                                                    key={index}
                                                    style={tw(
                                                        "flex flex-row grow w-1/3 py-2 px-2 justify-center",
                                                    )}
                                                >
                                                    <View
                                                        style={tw(
                                                            "flex flex-1 w-[10%] items-center justify-start",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "h-4 w-4 border rounded items-center justify-center",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "absolute text-[10px] font-bold",
                                                                )}
                                                            >
                                                                {orderData?.selected3DVolumetricTomography.includes(
                                                                    option,
                                                                )
                                                                    ? "X"
                                                                    : " "}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={tw(
                                                            "w-[90%] px-2",
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                "text-xs",
                                                            )}
                                                        >
                                                            {option}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ),
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View style={tw("flex flex-col w-1/3")}>
                                <View style={tw("h-[14.5%] items-center")}>
                                    <Text style={tw("text-base pt-1")}>
                                        Forma de entrega adicional
                                    </Text>
                                </View>
                                <View style={tw("h-[85.5%] border-t")}>
                                    <View
                                        style={tw(
                                            "flex flex-col flex-wrap justify-center",
                                        )}
                                    >
                                        {optionsData.additionalDeliveryMethod.map(
                                            (option: any, index: any) => (
                                                <View
                                                    key={index}
                                                    style={tw(
                                                        "flex flex-row grow h-1/3 w-full py-2 px-4 justify-center items-center",
                                                    )}
                                                >
                                                    <View
                                                        style={tw(
                                                            "flex flex-1 w-[10%] items-center justify-center",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "h-4 w-4 border rounded items-center justify-center",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "absolute text-[10px] font-bold",
                                                                )}
                                                            >
                                                                {orderData?.selectedAdditionalDeliveryMethod.includes(
                                                                    option,
                                                                )
                                                                    ? "X"
                                                                    : " "}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={tw(
                                                            "w-[90%] px-2",
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                "text-xs",
                                                            )}
                                                        >
                                                            {option}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ),
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Contenido Orden 2 */}
                    <View
                        style={tw(
                            "flex flex-col h-[40%] border border-black rounded-md",
                        )}
                    >
                        {/* Titulo sección */}
                        <View style={tw("h-[11%]")}>
                            <Text style={tw("text-lg px-4")}>
                                Diagnósticos/Modelos
                            </Text>
                        </View>

                        {/* Contenido sección */}
                        <View
                            style={tw("flex flex-col h-[89%] border-t-[0.5px]")}
                        >
                            {/* Diagnóstico */}
                            <View style={tw("flex flex-col h-2/3")}>
                                <View style={tw("px-4 h-[15%]")}>
                                    <Text style={tw("text-base px-4")}>
                                        Diagnósticos Cefalométricos
                                    </Text>
                                </View>
                                <View style={tw("h-[75%] border-t-[0.5px]")}>
                                    <View
                                        style={tw(
                                            "flex flex-col flex-wrap justify-center pt-1",
                                        )}
                                    >
                                        {optionsData.diagnosis.map(
                                            (option: any, index: any) => (
                                                <View
                                                    key={index}
                                                    style={tw(
                                                        "flex flex-row grow w-1/3 py-1 px-2 justify-center",
                                                    )}
                                                >
                                                    <View
                                                        style={tw(
                                                            "flex flex-1 w-[10%] items-center justify-start",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "h-4 w-4 border rounded items-center justify-center",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "absolute text-[10px] font-bold",
                                                                )}
                                                            >
                                                                {orderData?.selectedDiagnosis.includes(
                                                                    option,
                                                                )
                                                                    ? "X"
                                                                    : " "}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={tw(
                                                            "w-[90%] px-2",
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                "text-xs",
                                                            )}
                                                        >
                                                            {option}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ),
                                        )}
                                    </View>
                                </View>
                            </View>

                            {/* Modelos */}
                            <View
                                style={tw(
                                    "flex flex-col h-1/3 border-t-[0.5px]",
                                )}
                            >
                                <View style={tw("px-4 h-[30%]")}>
                                    <Text style={tw("text-base px-4")}>
                                        Modelos
                                    </Text>
                                </View>
                                <View style={tw("h-[70%] border-t-[0.5px]")}>
                                    <View
                                        style={tw(
                                            "flex flex-row flex-wrap justify-start",
                                        )}
                                    >
                                        {optionsData.models.map(
                                            (option: any, index: any) => (
                                                <View
                                                    key={index}
                                                    style={tw(
                                                        "flex flex-row w-1/3 py-1.5 px-2 justify-center",
                                                    )}
                                                >
                                                    <View
                                                        style={tw(
                                                            "flex flex-1 w-[10%] items-center justify-center",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "h-4 w-4 border rounded items-center justify-center",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "absolute text-[10px] font-bold",
                                                                )}
                                                            >
                                                                {orderData?.selectedModels.includes(
                                                                    option,
                                                                )
                                                                    ? "X"
                                                                    : " "}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={tw(
                                                            "w-[90%] px-2",
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                "text-xs",
                                                            )}
                                                        >
                                                            {option}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ),
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* FOOTER */}
                <View
                    style={tw(
                        "flex h-[10%] min-w-full flex-row border border-black rounded-md",
                    )}
                >
                    <View
                        style={tw(
                            "basis-1/2 p-2 justify-center text-xs items-end justify-around border-r-[0.5px]",
                        )}
                    >
                        <Text>
                            Country: Calle 85 # 12-10 Oficina 411 Tel: 2362772 -
                            2362624
                        </Text>
                        <Text>
                            Santa Bárbara: Avenida 19 #118-30 Local 8 Tel:
                            6296732 - 6293929
                        </Text>
                        <Text>
                            Marly: Calle 47 #13-33 Consultorio 105 Tel: 2451 544
                            - 2320651
                        </Text>
                        <Text>Cel:310 771 0722</Text>
                        <Text>info@rxcountry.com.co</Text>
                    </View>
                    <View
                        style={tw(
                            "basis-1/2 text-base justify-center items-center",
                        )}
                    >
                        <Text>Requiere Cita previa</Text>
                        <Text>Horarios:</Text>
                        <Text>L-V 8:00 am - 5:00 pm</Text>
                        <Text>S. 8:00 am - 1:30 pm</Text>
                    </View>
                </View>

                {/* Pagination */}
                <View style={tw("justify-center items-center text-sm mt-2")}>
                    <Text
                        render={({ pageNumber, totalPages }) =>
                            `${pageNumber} / ${totalPages}`
                        }
                        fixed
                    />
                </View>
            </Page>

            {/* Pagina 3 */}
            <Page
                size="LETTER"
                style={[tw("flex flex-col p-4"), { fontFamily: "Open Sans" }]}
            >
                {/* HEADER */}
                <View
                    style={tw(
                        "flex h-[10%] min-w-full flex-row border border-black rounded-md mb-5",
                    )}
                >
                    <View style={tw("basis-1/4 border-r")}>
                        <View style={tw("h-3/4")}>
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <Image
                                style={tw("w-full h-full p-1")}
                                src="/assets/RXCountryLogo.png"
                            />
                        </View>
                        <View style={tw("h-1/4 items-center justify-center")}>
                            <Text style={tw("text-xs")}>
                                {formatearFecha(orderData?.timestamp)}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={tw(
                            "basis-1/2 justify-around items-center border-r px-5",
                        )}
                    >
                        <Text>Formulario Orden de Servicio</Text>
                        <Text style={tw("text-sm text-justify")}>
                            Presentar el documento de identidad del usuario es
                            requisito obligatorio e indispensable para la
                            atención.
                        </Text>
                        {/* <Text style={tw("text-[8pt] text-center")}>
                            Los paquetes se entregarán en cuatro (4) días
                            hábiles después de la toma, téngalo en cuenta para
                            programar la cita con su odontólogo.
                        </Text> */}
                    </View>

                    <View style={tw("basis-1/4 pl-2")}>
                        <View style={tw("h-1/3")}>
                            <Text>{`Orden # 00${orderData?.uid}`}</Text>
                        </View>
                        <View style={tw("h-2/3 items-center justify-center")}>
                            <Text style={tw("text-base")}>CÓDIGO BARRAS</Text>
                        </View>
                    </View>
                </View>

                {/* BODY */}
                <View style={tw("flex h-[75%] min-w-full flex-col mb-5")}>
                    {/* Contenido Orden parte 1 */}
                    <View
                        style={tw(
                            "flex h-[50%] border border-black rounded-md mb-5",
                        )}
                    >
                        <View style={tw("flex h-2/3")}>
                            {/* Titulo Sección */}
                            <View
                                style={tw(
                                    "h-[15%] border-b-[0.5px] items-center justify-center",
                                )}
                            >
                                <Text style={tw("text-lg px-4")}>
                                    Fotografía Clínica
                                </Text>
                            </View>

                            {/* Fotografía */}
                            <View
                                style={tw(
                                    "flex flex-row justify-center items-center h-[85%]",
                                )}
                            >
                                <View style={tw("flex flex-col w-1/2")}>
                                    <View
                                        style={tw(
                                            "h-[17%] items-center justify-center",
                                        )}
                                    >
                                        <Text style={tw("text-lg px-4")}>
                                            Intra Orales
                                        </Text>
                                    </View>
                                    <View
                                        style={tw(
                                            "h-[83%] border-y-[0.5px] border-r-[0.5px]",
                                        )}
                                    >
                                        <View
                                            style={tw(
                                                "flex flex-col flex-wrap justify-center",
                                            )}
                                        >
                                            {optionsData.intraOralClinicalPhotography.map(
                                                (option: any, index: any) => (
                                                    <View
                                                        key={index}
                                                        style={tw(
                                                            "flex flex-row grow w-1/2 py-2 px-2 justify-center",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "flex flex-1 w-[10%] items-center justify-start",
                                                            )}
                                                        >
                                                            <View
                                                                style={tw(
                                                                    "h-4 w-4 border rounded items-center justify-center",
                                                                )}
                                                            >
                                                                <Text
                                                                    style={tw(
                                                                        "absolute text-[10px] font-bold",
                                                                    )}
                                                                >
                                                                    {orderData?.selectedIntraOralClinicalPhotography.includes(
                                                                        option,
                                                                    )
                                                                        ? "X"
                                                                        : " "}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View
                                                            style={tw(
                                                                "w-[90%] px-2",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "text-xs",
                                                                )}
                                                            >
                                                                {option}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                ),
                                            )}
                                        </View>
                                    </View>
                                </View>
                                <View style={tw("flex flex-col w-1/2")}>
                                    <View
                                        style={tw(
                                            "h-[17%] items-center justify-center",
                                        )}
                                    >
                                        <Text style={tw("text-lg px-4")}>
                                            Extra Orales
                                        </Text>
                                    </View>
                                    <View
                                        style={tw("h-[83%] border-y-[0.5px]")}
                                    >
                                        <View
                                            style={tw(
                                                "flex flex-col flex-wrap justify-center",
                                            )}
                                        >
                                            {optionsData.extraOralClinicalPhotography.map(
                                                (option: any, index: any) => (
                                                    <View
                                                        key={index}
                                                        style={tw(
                                                            "flex flex-row grow w-1/2 py-3 px-2 justify-center",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "flex flex-1 w-[10%] items-center justify-start",
                                                            )}
                                                        >
                                                            <View
                                                                style={tw(
                                                                    "h-4 w-4 border rounded items-center justify-center",
                                                                )}
                                                            >
                                                                <Text
                                                                    style={tw(
                                                                        "absolute text-[10px] font-bold",
                                                                    )}
                                                                >
                                                                    {orderData?.selectedExtraOralClinicalPhotography.includes(
                                                                        option,
                                                                    )
                                                                        ? "X"
                                                                        : " "}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View
                                                            style={tw(
                                                                "w-[90%] px-2",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "text-xs",
                                                                )}
                                                            >
                                                                {option}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                ),
                                            )}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={tw("flex flex-row h-1/3")}>
                            <View style={tw("flex flex-col w-1/2")}>
                                <View
                                    style={tw(
                                        "h-[30%] items-center justify-center",
                                    )}
                                >
                                    <Text style={tw("text-lg px-4")}>
                                        Presentación
                                    </Text>
                                </View>
                                <View style={tw("h-[70%] border-t-[0.5px]")}>
                                    <View
                                        style={tw(
                                            "flex flex-col flex-wrap justify-center",
                                        )}
                                    >
                                        {optionsData.presentation.map(
                                            (option: any, index: any) => (
                                                <View
                                                    key={index}
                                                    style={tw(
                                                        "flex flex-row grow w-1/2 py-2 px-2 justify-center",
                                                    )}
                                                >
                                                    <View
                                                        style={tw(
                                                            "flex flex-1 w-[10%] items-center justify-start",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "h-4 w-4 border rounded items-center justify-center",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "absolute text-[10px] font-bold",
                                                                )}
                                                            >
                                                                {orderData?.selectedPresentation.includes(
                                                                    option,
                                                                )
                                                                    ? "X"
                                                                    : " "}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={tw(
                                                            "w-[90%] px-2",
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                "text-xs",
                                                            )}
                                                        >
                                                            {option}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ),
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View style={tw("flex flex-col w-1/4")}>
                                <View
                                    style={tw(
                                        "h-[30%] items-center justify-center",
                                    )}
                                >
                                    <Text style={tw("text-lg pt-1")}>
                                        Fondo
                                    </Text>
                                </View>
                                <View
                                    style={tw(
                                        "h-[70%] border-t-[0.5px] border-x-[0.5px]",
                                    )}
                                >
                                    <View
                                        style={tw(
                                            "flex flex-col flex-wrap justify-center",
                                        )}
                                    >
                                        {optionsData.background.map(
                                            (option: any, index: any) => (
                                                <View
                                                    key={index}
                                                    style={tw(
                                                        "flex flex-row grow h-1/3 w-full py-2 px-4 justify-center items-center",
                                                    )}
                                                >
                                                    <View
                                                        style={tw(
                                                            "flex flex-1 w-[10%] items-center justify-start",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "h-4 w-4 border rounded items-center justify-center",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "absolute text-[10px] font-bold",
                                                                )}
                                                            >
                                                                {orderData?.selectedBackground.includes(
                                                                    option,
                                                                )
                                                                    ? "X"
                                                                    : " "}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={tw(
                                                            "w-[90%] px-2",
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                "text-xs",
                                                            )}
                                                        >
                                                            {option}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ),
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View style={tw("flex flex-col w-1/4")}>
                                <View
                                    style={tw(
                                        "h-[30%] items-center justify-center",
                                    )}
                                >
                                    <Text style={tw("text-[10px] pt-1")}>
                                        Forma de entrega adicional
                                    </Text>
                                </View>
                                <View style={tw("h-[70%] border-t-[0.5px]")}>
                                    <View
                                        style={tw(
                                            "flex flex-col flex-wrap justify-center",
                                        )}
                                    >
                                        {optionsData.clinicalPhotographyDeliveryMethod.map(
                                            (option: any, index: any) => (
                                                <View
                                                    key={index}
                                                    style={tw(
                                                        "flex flex-row grow h-1/3 w-full py-2 px-4 justify-center items-center",
                                                    )}
                                                >
                                                    <View
                                                        style={tw(
                                                            "flex flex-1 w-[10%] items-center justify-start",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "h-4 w-4 border rounded items-center justify-center",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "absolute text-[10px] font-bold",
                                                                )}
                                                            >
                                                                {orderData?.selectedClinicalPhotographyDeliveryMethod.includes(
                                                                    option,
                                                                )
                                                                    ? "X"
                                                                    : " "}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={tw(
                                                            "w-[90%] px-2",
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                "text-xs",
                                                            )}
                                                        >
                                                            {option}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ),
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Contenido Orden parte 2 */}
                    <View
                        style={tw(
                            "flex flex-col h-[50%] border border-black rounded-md",
                        )}
                    >
                        {/* Titulo sección */}
                        <View style={tw("h-[11%] items-center justify-center")}>
                            <Text style={tw("text-lg px-4")}>Entregas</Text>
                        </View>

                        {/* Contenido sección */}
                        <View
                            style={tw("flex flex-col h-[89%] border-t-[0.5px]")}
                        >
                            {/* Paquete */}
                            <View style={tw("flex flex-col h-1/2")}>
                                <View style={tw("px-4 h-[25%] justify-center")}>
                                    <Text style={tw("text-base px-4")}>
                                        Paquete de Diagnóstico
                                    </Text>
                                </View>
                                <View style={tw("h-[75%] border-t-[0.5px]")}>
                                    <View
                                        style={tw(
                                            "flex flex-col flex-wrap justify-center",
                                        )}
                                    >
                                        {optionsData.diagnosticPackage.map(
                                            (option: any, index: any) => (
                                                <View
                                                    key={index}
                                                    style={tw(
                                                        "flex flex-row grow w-1/4 py-2 px-2 justify-center",
                                                    )}
                                                >
                                                    <View
                                                        style={tw(
                                                            "flex flex-1 w-[10%] items-center justify-start",
                                                        )}
                                                    >
                                                        <View
                                                            style={tw(
                                                                "h-4 w-4 border rounded items-center justify-center",
                                                            )}
                                                        >
                                                            <Text
                                                                style={tw(
                                                                    "absolute text-[10px] font-bold",
                                                                )}
                                                            >
                                                                {orderData?.selectedDiagnosticPackage.includes(
                                                                    option,
                                                                )
                                                                    ? "X"
                                                                    : " "}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View
                                                        style={tw(
                                                            "w-[90%] px-2",
                                                        )}
                                                    >
                                                        <Text
                                                            style={tw(
                                                                "text-xs",
                                                            )}
                                                        >
                                                            {option}
                                                        </Text>
                                                    </View>
                                                </View>
                                            ),
                                        )}
                                    </View>
                                </View>
                            </View>

                            {/* Observaciones */}
                            <View
                                style={tw(
                                    "flex flex-row h-1/2 border-t-[0.5px]",
                                )}
                            >
                                <View style={tw("flex flex-col w-1/2")}>
                                    <View
                                        style={tw(
                                            "h-[25%] items-center justify-center",
                                        )}
                                    >
                                        <Text style={tw("text-base px-4")}>
                                            Observaciones
                                        </Text>
                                    </View>
                                    <View
                                        style={tw(
                                            "h-[75%] border-t-[0.5px] border-r-[0.5px] px-4 pt-2",
                                        )}
                                    >
                                        <Text
                                            style={tw("text-xs text-justify")}
                                        >
                                            {orderData?.createdBy?.userRol ===
                                            "ZWb0Zs42lnKOjetXH5lq"
                                                ? orderData?.observationComment
                                                      .message
                                                : orderData
                                                      ?.recObservationComment
                                                      .message}
                                        </Text>
                                    </View>
                                </View>

                                <View style={tw("flex flex-col w-1/2")}>
                                    <View
                                        style={tw(
                                            "h-[25%] items-center justify-center",
                                        )}
                                    >
                                        <Text style={tw("text-base px-4")}>
                                            Impresión Diagnostica
                                        </Text>
                                    </View>
                                    <View
                                        style={tw(
                                            "h-[75%] border-t-[0.5px] px-4 pt-2",
                                        )}
                                    >
                                        <Text
                                            style={tw("text-xs text-justify")}
                                        >
                                            {
                                                orderData?.diagnosticImpressionComment
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* FOOTER */}
                <View
                    style={tw(
                        "flex h-[10%] min-w-full flex-row border border-black rounded-md",
                    )}
                >
                    <View
                        style={tw(
                            "basis-1/2 p-2 justify-center text-xs items-end justify-around border-r-[0.5px]",
                        )}
                    >
                        <Text>
                            Country: Calle 85 # 12-10 Oficina 411 Tel: 2362772 -
                            2362624
                        </Text>
                        <Text>
                            Santa Bárbara: Avenida 19 # 118-30 Local 8 Tel:
                            6296732 - 6293929
                        </Text>
                        <Text>
                            Marly: Calle 47 #13-33 Consultorio 105 Tel: 2451 544
                            - 2320651
                        </Text>
                        <Text>Cel:310 771 0722</Text>
                        <Text>info@rxcountry.com.co</Text>
                    </View>
                    <View
                        style={tw(
                            "basis-1/2 text-base justify-center items-center",
                        )}
                    >
                        <Text>Requiere Cita previa</Text>
                        <Text>Horarios:</Text>
                        <Text>L-V 8:00 am - 5:00 pm</Text>
                        <Text>S. 8:00 am - 1:30 pm</Text>
                    </View>
                </View>

                {/* Pagination */}
                <View style={tw("justify-center items-center text-sm mt-2")}>
                    <Text
                        render={({ pageNumber, totalPages }) =>
                            `${pageNumber} / ${totalPages}`
                        }
                        fixed
                    />
                </View>
            </Page>
        </Document>
    );
};

export default OrderPDF;
