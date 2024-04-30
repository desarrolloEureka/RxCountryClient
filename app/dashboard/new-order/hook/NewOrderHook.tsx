import { dataAllOptions } from "@/app/data/documentsData";
import { getAllOptions } from "@/app/firebase/documents";
import { useCallback, useEffect, useState } from "react";

const widthSlider = ["w-0", "w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"];

type Props = {
    // setDataSelected: (e: any) => void;
};

const NewOrderHook = (props?: Props) => {
    const [showHelp, setShowHelp] = useState(false);
    const [formStep, setFormStep] = useState(0);

    //*Aquí para cambiar de vista de especialista a recepcionista
    const [user, setUser] = useState("Receptionist");

    //*Aquí para cambiar de vista de edición
    const [isEdit, setIsEdit] = useState(false);

    const [isDataSelected, setIsDataSelected] = useState(false);

    const [optionsData, setOptionsData] = useState<any>(dataAllOptions);

    const getOptions = useCallback(async () => {
        const allOptionsData = await getAllOptions("rxCountryFront");
        allOptionsData && setOptionsData(allOptionsData);
    }, []);

    useEffect(() => {
        getOptions();
    }, [getOptions]);

    return {
        showHelp,
        setShowHelp,
        formStep,
        setFormStep,
        user,
        setUser,
        isEdit,
        setIsEdit,
        isDataSelected,
        setIsDataSelected,
        widthSlider,
        data: optionsData,
    };
};

export default NewOrderHook;
