import React, { forwardRef } from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  useColorModeValue
} from '@chakra-ui/react';

interface Props {
  label: string;
  name?: string;
  type: string;
  isRequired?: boolean;
  errorMessage?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, name, type, isRequired, errorMessage, onChange }, ref) => {
    const background = useColorModeValue('white', 'gray.900');
    return (
      <FormControl mb="2" id={name} isRequired={isRequired || false} isInvalid={!!errorMessage}>
        <FormLabel>{label}</FormLabel>
        {type === 'textarea' ? (
          <Textarea
            background={background}
            resize="vertical"
            onChange={onChange}
            name={name}
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          />
        ) : (
          <Input background={background} onChange={onChange} name={name} type={type} ref={ref} />
        )}

        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </FormControl>
    );
  }
);

export default InputField;
