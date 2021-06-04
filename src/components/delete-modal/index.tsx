import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text
} from '@chakra-ui/react';

interface Props {
  isOpen: boolean;
  title: string;
  onCancelClick: () => void;
  onDeleteClick: () => void;
}

const DeleteModal = ({ isOpen, title, onCancelClick, onDeleteClick }: Props) => {
  const cancelRef = useRef(null);

  return (
    <AlertDialog isCentered isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onCancelClick}>
      <AlertDialogOverlay>
        <AlertDialogContent mx={4}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Are you sure?
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>
              You are about to delete <strong>{title}</strong>
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button size="sm" ref={cancelRef} onClick={onCancelClick}>
              Cancel
            </Button>
            <Button size="sm" colorScheme="red" onClick={onDeleteClick} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteModal;
