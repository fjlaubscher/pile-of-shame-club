import React from 'react';
import {
  Button,
  Box,
  IconButton,
  VStack,
  HStack,
  Tag,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { MdVisibility, MdDelete } from 'react-icons/md';

interface Props {
  model: PileOfShame.Model;
  onClick: () => void;
  onDeleteClick: () => void;
}

const ModelCard = ({ model, onClick, onDeleteClick }: Props) => {
  const background = useColorModeValue('white', 'gray.800');
  const totalModels =
    model.totalOnSprues +
    model.totalAssembled +
    model.totalPrimed +
    model.totalPainted +
    model.totalBased;

  return (
    <Box position="relative" background={background} borderRadius={4} width="100%" p={4} zIndex={1}>
      <IconButton
        position="absolute"
        top={1}
        right={1}
        size="md"
        aria-label="Delete"
        icon={<MdDelete />}
        onClick={onDeleteClick}
        variant="ghost"
        zIndex={2}
      />
      <VStack alignItems="flex-start" width="100%">
        <Text>
          {model.name} ({totalModels})
        </Text>
        <HStack width="100%">
          {model.totalOnSprues && (
            <Tag size="sm" colorScheme="red">
              {model.totalOnSprues} on sprues
            </Tag>
          )}
          {model.totalAssembled && (
            <Tag size="sm" colorScheme="orange">
              {model.totalAssembled} assembled
            </Tag>
          )}
          {model.totalPrimed && (
            <Tag size="sm" colorScheme="yellow">
              {model.totalPrimed} primed
            </Tag>
          )}
          {model.totalPainted && (
            <Tag size="sm" colorScheme="blue">
              {model.totalPainted} painted
            </Tag>
          )}
          {model.totalBased && (
            <Tag size="sm" colorScheme="green">
              {model.totalBased} based
            </Tag>
          )}
        </HStack>
        <Button size="sm" leftIcon={<MdVisibility />} onClick={onClick}>
          View
        </Button>
      </VStack>
    </Box>
  );
};

export default ModelCard;
