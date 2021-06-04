import React, { useEffect } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  SimpleGrid,
  useColorModeValue,
  useNumberInput
} from '@chakra-ui/react';
import { MdAdd, MdRemove } from 'react-icons/md';

interface Props {
  label: string;
  isRequired?: boolean;
  onChange: (value: any) => void;
  value: number;
}

const InputField = ({ label, value, isRequired, onChange }: Props) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps, valueAsNumber } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 1000,
      precision: 0
    });
  const background = useColorModeValue('white', 'gray.900');
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ readOnly: true });

  useEffect(() => {
    onChange(valueAsNumber);
  }, [valueAsNumber]);

  return (
    <FormControl mb="2" isRequired={isRequired || false}>
      <SimpleGrid alignItems="center" width="100%" columns={2}>
        <FormLabel m="0 !important">{label}</FormLabel>
        <HStack width="100%">
          <Button {...dec} p={0}>
            <MdRemove />
          </Button>
          <Input {...input} background={background} value={value} px={1} textAlign="center" />
          <Button {...inc} p={0}>
            <MdAdd />
          </Button>
        </HStack>
      </SimpleGrid>
    </FormControl>
  );
};

export default InputField;
