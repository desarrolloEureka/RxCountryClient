const Spinner = ({
    visual,
    screenH,
    grow,
    background,
}: {
    visual?: boolean;
    screenH?: string;
    grow?: boolean;
    background?: string;
}) => {
    const type = grow ? "spinner-grow" : "spinner-border";
    return (
        <div
            className={`flex flex-col ${
                background || "bg-login-image"
            } bg-cover bg-bottom w-full ${
                screenH || "min-h-screen"
            }  justify-center items-center`}
        >
            <div className="flex flex-col justify-center items-center center">
                <div className={`${type} text-white`} role="status" />
                <span className={`${visual && "visually-hidden"} text-white`}>
                    Cargando...
                </span>
            </div>
        </div>
    );
};

export default Spinner;
