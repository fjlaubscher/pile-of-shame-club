import React, { Suspense, lazy, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Progress } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';

// api
import { getUser, createUser } from './api';

// containers
const EditPile = lazy(() => import('./containers/pile'));
const Home = lazy(() => import('./containers/home'));
const Settings = lazy(() => import('./containers/settings'));
const NotFound = lazy(() => import('./containers/not-found'));

// state
import { UserAtom } from './state/user';

const Router = () => {
  const [user, setUser] = useRecoilState(UserAtom);

  useEffect(() => {
    if (!user) {
      const localUser = getUser();
      if (localUser) {
        setUser(localUser);
      } else {
        const newUser = createUser();
        setUser(newUser);
      }
    }
  }, [user, setUser]);

  return (
    <Suspense fallback={<Progress isIndeterminate />}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/pile/:key" exact component={EditPile} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Router;
