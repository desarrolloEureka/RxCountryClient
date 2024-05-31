import React from "react";
import Select from "react-select";

interface SelectComponentProps {
    options?: { value: string; label: string }[];
    selectChangeHandlerSentTo?: (e: any) => void;
    optionSelected: { value: string; label: string };
}

const SelectComponent = ({
    options,
    selectChangeHandlerSentTo,
    optionSelected,
}: SelectComponentProps) => (
    <Select
        value={optionSelected}
        isClearable={true}
        options={options}
        className="text-black"
        onChange={selectChangeHandlerSentTo}
    />
);

export default SelectComponent;
