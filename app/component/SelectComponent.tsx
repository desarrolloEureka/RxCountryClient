import React from "react";
import Select from "react-select";

interface SelectComponentProps {
    options?: { value: string; label: string }[];
    selectChangeHandlerSentTo?: (e: any) => void;
}

const SelectComponent = ({
    options,
    selectChangeHandlerSentTo,
}: SelectComponentProps) => (
    <Select
        isClearable={true}
        options={options}
        className="text-black"
        onChange={selectChangeHandlerSentTo}
    />
);

export default SelectComponent;
