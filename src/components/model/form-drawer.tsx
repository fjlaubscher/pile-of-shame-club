import React, { useEffect } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  Divider,
  useMediaQuery,
  SimpleGrid
} from '@chakra-ui/react';
import { useController, useForm } from 'react-hook-form';

// components
import InputField from '../../components/field/input';
import NumberField from '../../components/field/number';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PileOfShame.Model) => void;
  initialValues?: PileOfShame.Model;
}

const ModelForm = ({ title, isOpen, onClose, onSubmit, initialValues }: Props) => {
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, errors, isSubmitted }
  } = useForm<PileOfShame.Model>({
    mode: 'onChange',
    defaultValues: {
      totalOnSprues: 0,
      totalAssembled: 0,
      totalPrimed: 0,
      totalPainted: 0,
      totalBased: 0
    }
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    } else {
      reset({
        totalOnSprues: 0,
        totalAssembled: 0,
        totalPrimed: 0,
        totalPainted: 0,
        totalBased: 0
      });
    }
  }, [isSubmitted, reset, isOpen, initialValues]);

  const { field: totalOnSpruesField } = useController({ name: 'totalOnSprues', control });
  const { field: totalAssembledField } = useController({ name: 'totalAssembled', control });
  const { field: totalPrimedField } = useController({ name: 'totalPrimed', control });
  const { field: totalPaintedField } = useController({ name: 'totalPainted', control });
  const { field: totalBasedField } = useController({ name: 'totalBased', control });

  return (
    <Drawer isOpen={isOpen} placement={isSmallDesktop ? 'right' : 'bottom'} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>
          <form id="model-form" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label="Name"
              type="text"
              errorMessage={errors.name ? 'Required' : undefined}
              {...register('name', { required: true })}
            />
            <InputField label="Notes" type="textarea" {...register('notes', { required: false })} />
            <Heading mb="0 !important" size="sm">
              Total
            </Heading>
            <Divider my="1rem !important" />
            <NumberField
              label="On Sprues"
              value={totalOnSpruesField.value}
              onChange={totalOnSpruesField.onChange}
            />
            <NumberField
              label="Assembled"
              value={totalAssembledField.value}
              onChange={totalAssembledField.onChange}
            />
            <NumberField
              label="Primed"
              value={totalPrimedField.value}
              onChange={totalPrimedField.onChange}
            />
            <NumberField
              label="Painted"
              value={totalPaintedField.value}
              onChange={totalPaintedField.onChange}
            />
            <NumberField
              label="Based"
              value={totalBasedField.value}
              onChange={totalBasedField.onChange}
            />
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            isLoading={isSubmitting}
            disabled={!isValid || isSubmitting}
            form="model-form"
            type="submit"
            colorScheme="blue"
          >
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ModelForm;
