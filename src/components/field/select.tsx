import React from 'react';
import { FormControl, FormLabel, Select, useColorModeValue } from '@chakra-ui/react';

interface Props {
  label: string;
  options: SelectOption[];
  isRequired?: boolean;
  onChange: (value: string) => void;
  value?: string;
  mb?: string;
}

const SelectField = ({ label, value, options, isRequired, onChange, mb }: Props) => {
  const background = useColorModeValue('white', 'gray.900');
  return (
    <FormControl mb={mb || '2'} isRequired={isRequired || false}>
      <FormLabel>{label}</FormLabel>
      <Select
        background={background}
        placeholder="Select an option"
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
      >
        {options.map((o, i) => (
          <option key={`option-${i}`} value={o.value}>
            {o.description}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
