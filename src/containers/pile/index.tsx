import React, { useState, useEffect, useMemo } from 'react';
import {
  Divider,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  useToast,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { useParams, Redirect } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { MdAdd, MdSave } from 'react-icons/md';
import { v4 as UUID } from 'uuid';

// api
import { getPile, updatePile, createPileModel, updatePileModel, deletePileModel } from '../../api';

// components
import DeleteModal from '../../components/delete-modal';
import Layout from '../../components/layout';
import ModelCard from '../../components/model/card';
import ModelFormDrawer from '../../components/model/form-drawer';
import PileForm from '../../components/pile/form';
import SearchInput from '../../components/field/search';

// state
import { UserAtom } from '../../state/user';

const EditPile = () => {
  const { key } = useParams<KeyParams>();
  const [user, setUser] = useRecoilState(UserAtom);
  const [filter, setFilter] = useState('');
  const [pile, setPile] = useState<PileOfShame.Pile | undefined>(getPile(key));
  const [modelToEdit, setModelToEdit] = useState<PileOfShame.Model | undefined>(undefined);
  const [modelToDelete, setModelToDelete] = useState<PileOfShame.Model | undefined>(undefined);
  const [hasPopulatedForm, setHasPopulatedForm] = useState(false);
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');

  const toast = useToast();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const form = useForm({ mode: 'onChange' });
  const {
    reset,
    formState: { isSubmitting, isValid }
  } = form;

  useEffect(() => {
    if (pile && !hasPopulatedForm) {
      reset(pile);
      setHasPopulatedForm(true);
    }
  }, [pile, hasPopulatedForm, setHasPopulatedForm, reset]);

  if (!pile) {
    return <Redirect to="/404" />;
  }

  const filteredModels = useMemo(() => {
    if (user) {
      return pile.models
        .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }

          if (a.name > b.name) {
            return 1;
          }

          return 0;
        });
    } else {
      return [];
    }
  }, [user, filter]);

  return (
    <Layout
      title={pile.name}
      actionComponent={
        <IconButton
          colorScheme="blue"
          aria-label="Submit"
          isLoading={isSubmitting}
          disabled={!isValid || isSubmitting}
          form="pile-form"
          type="submit"
          icon={<MdSave />}
        />
      }
    >
      <FormProvider {...form}>
        <PileForm
          onSubmit={async (values) => {
            try {
              const updatedUser = updatePile(key, { ...pile, ...values, models: pile.models });

              if (updatedUser) {
                setUser(updatedUser);

                const updatedPile = getPile(key);
                if (updatedPile) {
                  setPile(updatedPile);

                  toast({
                    title: 'Success',
                    description: `Updated ${updatedPile.name}.`,
                    status: 'success',
                    isClosable: true
                  });
                }
              }
            } catch (ex) {
              toast({
                title: 'Error',
                description: ex.message,
                status: 'error',
                isClosable: true
              });
            }
          }}
        />
      </FormProvider>
      <Divider />
      <HStack my="1rem !important" width="100%" justifyContent="space-between">
        <Heading size="sm" fontWeight="semibold">
          Models
        </Heading>
        <IconButton onClick={onOpen} colorScheme="blue" aria-label="Add Model" icon={<MdAdd />} />
      </HStack>
      <SearchInput value={filter} onChange={setFilter} />
      <ModelFormDrawer
        initialValues={modelToEdit}
        title={modelToEdit ? 'Edit Models' : 'Add Models'}
        isOpen={isOpen}
        onSubmit={(model) => {
          const updatedModel = {
            ...model,
            key: modelToEdit ? modelToEdit.key : UUID(),
            totalOnSprues: parseInt(model.totalOnSprues as any),
            totalAssembled: parseInt(model.totalAssembled as any),
            totalPrimed: parseInt(model.totalPrimed as any),
            totalPainted: parseInt(model.totalPainted as any),
            totalBased: parseInt(model.totalBased as any)
          };
          const updatedUser = modelToEdit
            ? updatePileModel(key, updatedModel)
            : createPileModel(key, updatedModel);

          if (updatedUser) {
            setUser(updatedUser);

            const updatedPile = getPile(key);
            if (updatedPile) {
              setPile(updatedPile);

              toast({
                title: 'Success',
                description: `${modelToEdit ? 'Updated' : 'Added'} ${updatedModel.name}.`,
                status: 'success',
                isClosable: true
              });
            }
          }

          setModelToEdit(undefined);
          onClose();
        }}
        onClose={() => {
          setModelToEdit(undefined);
          onClose();
        }}
      />
      <SimpleGrid width="100%" mt="1rem !important" spacing={4} columns={isSmallDesktop ? 2 : 1}>
        {filteredModels.map((m) => (
          <ModelCard
            onClick={() => {
              setModelToEdit(m);
              onOpen();
            }}
            key={m.key}
            model={m}
            onDeleteClick={() => {
              setModelToDelete(m);
            }}
          />
        ))}
      </SimpleGrid>
      <DeleteModal
        isOpen={!!modelToDelete}
        title={modelToDelete ? modelToDelete.name : ''}
        onCancelClick={() => setModelToDelete(undefined)}
        onDeleteClick={() => {
          if (modelToDelete) {
            const updatedUser = deletePileModel(key, modelToDelete.key);
            if (updatedUser) {
              setUser(user);

              const updatedPile = getPile(key);
              if (updatedPile) {
                setPile(pile);
              }
            }
            setModelToDelete(undefined);
          }
        }}
      />
    </Layout>
  );
};

export default EditPile;
