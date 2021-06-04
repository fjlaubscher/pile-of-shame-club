import React from 'react';
import { SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { useController, useFormContext } from 'react-hook-form';

// components
import InputField from '../../components/field/input';
import SelectField from '../../components/field/select';

// helpers
import { GAME_TYPES } from '../../helpers/standing-data';

interface Props {
  onSubmit: (values: PileOfShame.Pile) => void;
}

const PileForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useFormContext<PileOfShame.Pile>();
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');
  const { field: gameField } = useController({ name: 'game' });

  return (
    <form id="pile-form" onSubmit={handleSubmit(onSubmit)}>
      <SimpleGrid spacing={isSmallDesktop ? 2 : undefined} columns={isSmallDesktop ? 2 : 1}>
        <InputField
          label="Name"
          type="text"
          errorMessage={errors.name ? 'Required' : undefined}
          {...register('name', { required: true })}
        />
        <SelectField
          label="Game"
          options={GAME_TYPES}
          onChange={gameField.onChange}
          value={gameField.value}
        />
      </SimpleGrid>
      <InputField label="Notes" type="textarea" {...register('notes', { required: false })} />
    </form>
  );
};

export default PileForm;
