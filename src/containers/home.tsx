import React, { useState, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  IconButton,
  SimpleGrid,
  useToast,
  useMediaQuery,
  Heading,
  HStack,
  Divider,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex
} from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { MdAdd, MdSettings } from 'react-icons/md';
import { v4 as UUID } from 'uuid';

// api
import { createPile, deletePile } from '../api';

// components
import DeleteModal from '../components/delete-modal';
import Layout from '../components/layout';
import PileCard from '../components/pile/card';
import PieChart from '../components/pie-chart';
import SearchInput from '../components/field/search';

// state
import { UserAtom } from '../state/user';

// helpers
import { getStats } from '../helpers/stats';

const Home = () => {
  const [user, setUser] = useRecoilState(UserAtom);
  const [filter, setFilter] = useState('');
  const [pileToDelete, setPileToDelete] = useState<PileOfShame.Pile | undefined>(undefined);
  const toast = useToast();
  const [isSmallDesktop] = useMediaQuery('(min-width: 1024px)');
  const history = useHistory();

  const totalPiles = user ? user.piles.length : 0;
  const stats = getStats(user ? user.piles : []);

  const filteredPiles = useMemo(() => {
    if (user) {
      return user.piles
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
      title="Home"
      actionComponent={
        <IconButton
          colorScheme="blue"
          aria-label="Settings"
          icon={<MdSettings />}
          as={Link}
          to="/settings"
        />
      }
    >
      <Flex width="100%" direction={isSmallDesktop ? 'row' : 'column'}>
        <StatGroup width="100%">
          <Stat>
            <StatLabel>Pile of Shame</StatLabel>
            <StatNumber>{stats.totalOnSprues}</StatNumber>
            <StatHelpText>on sprues</StatHelpText>
          </Stat>
          {isSmallDesktop && (
            <Stat>
              <StatLabel>Battle Ready</StatLabel>
              <StatNumber>{stats.totalPainted + stats.totalBased}</StatNumber>
              <StatHelpText>painted or based</StatHelpText>
            </Stat>
          )}
          <Stat>
            <StatLabel textAlign={isSmallDesktop ? 'left' : 'right'}>Total Models</StatLabel>
            <StatNumber textAlign={isSmallDesktop ? 'left' : 'right'}>{stats.total}</StatNumber>
            <StatHelpText textAlign={isSmallDesktop ? 'left' : 'right'}>
              in {totalPiles} pile{totalPiles > 1 && 's'}
            </StatHelpText>
          </Stat>
        </StatGroup>
        {stats.total > 0 && <PieChart data={stats} />}
      </Flex>
      <Divider />
      <HStack my="1rem !important" width="100%" justifyContent="space-between">
        <Heading size="sm" fontWeight="semibold">
          Piles of Shame
        </Heading>
        <IconButton
          colorScheme="blue"
          aria-label="Add Pile of Shame"
          icon={<MdAdd />}
          onClick={() => {
            const key = UUID();
            const updatedUser = createPile(key);

            if (updatedUser) {
              setUser(updatedUser);
              history.push(`/pile/${key}`);
            }
          }}
        />
      </HStack>
      <SearchInput value={filter} onChange={setFilter} />
      <SimpleGrid mt="1rem !important" width="100%" spacing={4} columns={isSmallDesktop ? 2 : 1}>
        {filteredPiles.map((p) => (
          <PileCard key={p.key} onDeleteClick={() => setPileToDelete(p)} pile={p} />
        ))}
      </SimpleGrid>
      <DeleteModal
        isOpen={!!pileToDelete}
        title={pileToDelete ? pileToDelete.name : ''}
        onCancelClick={() => setPileToDelete(undefined)}
        onDeleteClick={() => {
          if (pileToDelete) {
            const updatedUser = deletePile(pileToDelete.key);

            if (updatedUser) {
              setUser(updatedUser);
              toast({
                title: 'Success',
                description: `Deleted ${pileToDelete.name}.`,
                status: 'success',
                isClosable: true
              });
              setPileToDelete(undefined);
            }
          }
        }}
      />
    </Layout>
  );
};

export default Home;
