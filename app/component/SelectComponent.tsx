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
        required
        value={optionSelected ? optionSelected : []}
        isClearable
        options={options}
        defaultValue={optionSelected}
        className="text-black"
        onChange={selectChangeHandlerSentTo}
    />
);

export default SelectComponent;
