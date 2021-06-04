import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  Button,
  Divider,
  Input,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { MdCloudUpload, MdCloudDownload, MdDeleteForever } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { useAsyncFn } from 'react-use';

// api
import { deleteUser, updateUser } from '../api';

// cloudflare
import { getUserDataAsync, uploadUserDataAsync } from '../cloudflare-worker';

// components
import DeleteModal from '../components/delete-modal';
import Layout from '../components/layout';

// helpers
import { UPLOAD_KEY } from '../helpers/storage';

// state
import { UserAtom } from '../state/user';

const Settings = () => {
  const [user, setUser] = useRecoilState(UserAtom);
  const [downloadKey, setDownloadKey] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const previouslyUploadedKey = localStorage.getItem(UPLOAD_KEY);

  const [{ loading: uploading }, uploadData] = useAsyncFn(async () => {
    if (user) {
      const key = previouslyUploadedKey || `${Math.floor(Math.random() * 100000)}`;
      const data = await uploadUserDataAsync(key, user);

      if (data) {
        localStorage.setItem(UPLOAD_KEY, key);
        toast({
          title: 'Success',
          description: `Uploaded Piles of Shame.`,
          status: 'success',
          isClosable: true
        });
        return key;
      }
    }

    return undefined;
  }, [user, previouslyUploadedKey, toast]);
  const [{ loading: downloading }, downloadData] = useAsyncFn(async () => {
    const data = await getUserDataAsync(downloadKey);
    if (data) {
      updateUser(data);
      setUser(data);
      localStorage.setItem(UPLOAD_KEY, downloadKey);
      
      setDownloadKey('');
      toast({
        title: 'Success',
        description: `Downloaded Piles of Shame.`,
        status: 'success',
        isClosable: true
      });
    }
  }, [downloadKey, setUser]);

  return (
    <Layout title="Settings">
      {previouslyUploadedKey && (
        <Alert variant="solid" status="success">
          <AlertIcon />
          Your download code is:
          <strong style={{ paddingLeft: '0.25rem' }}>{previouslyUploadedKey}</strong>
        </Alert>
      )}
      <Alert status="info" variant="left-accent">
        <AlertIcon />
        Upload your Piles of Shame to download on another device.
      </Alert>
      <Button
        isLoading={uploading}
        disabled={uploading}
        onClick={uploadData}
        isFullWidth
        leftIcon={<MdCloudUpload />}
      >
        Upload
      </Button>
      <Divider my="2rem !important" />
      <Alert status="info" variant="left-accent">
        <AlertIcon />
        Download Piles of Shame from another device.
      </Alert>
      <Input
        value={downloadKey}
        onChange={(e) => setDownloadKey(e.currentTarget.value)}
        placeholder="Enter code"
      />
      <Button
        disabled={downloadKey.length === 0 || downloading}
        isFullWidth
        leftIcon={<MdCloudDownload />}
        onClick={downloadData}
        isLoading={downloading}
      >
        Download
      </Button>
      <Divider my="2rem !important" />
      <Alert status="error" variant="left-accent">
        <AlertIcon />
        Rid yourself of shame.
      </Alert>
      <Button onClick={onOpen} isFullWidth colorScheme="red" leftIcon={<MdDeleteForever />}>
        Delete
      </Button>
      <DeleteModal
        title="everything"
        isOpen={isOpen}
        onCancelClick={onClose}
        onDeleteClick={() => {
          const freshUser = deleteUser();
          localStorage.removeItem(UPLOAD_KEY);
          setUser(freshUser);

          onClose();
          toast({
            title: 'Success',
            description: `Deleted everything.`,
            status: 'success',
            isClosable: true
          });
        }}
      />
    </Layout>
  );
};

export default Settings;
