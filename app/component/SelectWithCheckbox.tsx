import React from "react";
import Select, { components } from "react-select";

interface SelectWithCheckboxProps {
    options?: { value: string; label: string }[];
    selectChangeHandler?: (e: any) => void;
    optionSelected: { value: string; label: string };
    isMulti?: boolean;
    isDisabled?: boolean;
}

const Option = (props: any) => {
    return (
        <div>
            <components.Option {...props}>
                <input
                    type="checkbox"
                    checked={props.isSelected}
                    onChange={() => null}
                    className="h-5 w-5"
                />
                {/* &nbsp; */}
                <label className="px-5">{props.label}</label>
            </components.Option>
        </div>
    );
};

const SelectWithCheckbox = ({
    options,
    selectChangeHandler,
    optionSelected,
    isMulti = false,
    isDisabled,
}: SelectWithCheckboxProps) => (
    <Select
        placeholder="Seleccione..."
        isDisabled={isDisabled}
        isMulti={isMulti}
        components={{
            Option,
        }}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        required
        value={optionSelected ? optionSelected : []}
        isClearable
        options={options}
        defaultValue={optionSelected}
        className="text-black"
        onChange={selectChangeHandler}
    />
);

export default SelectWithCheckbox;
