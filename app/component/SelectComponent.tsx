import React from 'react';
import Select from 'react-select';

interface SelectComponentProps {
    options: { value: string, label: string }[];
}

const SelectComponent: React.FC<SelectComponentProps> = ({ options }) => (
    <Select isClearable={true} options={options} className='text-black' />
);

export default SelectComponent;
