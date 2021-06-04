import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  IconButton,
  VStack,
  Tag,
  Text,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import { MdVisibility, MdDelete } from 'react-icons/md';

interface Props {
  pile: PileOfShame.Pile;
  onDeleteClick: () => void;
}

const PileCard = ({ pile, onDeleteClick }: Props) => {
  const background = useColorModeValue('white', 'gray.800');
  const totalModels = pile.models.reduce((prev: number, model) => {
    const total =
      model.totalOnSprues +
      model.totalAssembled +
      model.totalPrimed +
      model.totalPainted +
      model.totalBased;

    return prev + total;
  }, 0);

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
        <Text>{pile.name}</Text>
        <HStack width="100%">
          <Tag size="sm" colorScheme="blue">
            {pile.game}
          </Tag>
          {totalModels && (
            <Tag size="sm">{totalModels === 1 ? '1 model' : `${totalModels} models`}</Tag>
          )}
        </HStack>
        <Button size="sm" as={Link} to={`/pile/${pile.key}`} leftIcon={<MdVisibility />}>
          View
        </Button>
      </VStack>
    </Box>
  );
};

export default PileCard;
