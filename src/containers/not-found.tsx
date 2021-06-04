import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

// components
import Layout from '../components/layout';

const NotFound = () => {
  return (
    <Layout title="Not Found!">
      <Alert status="warning" variant="left-accent">
        <AlertIcon />
        This page does not exist.
      </Alert>
    </Layout>
  );
};

export default NotFound;
