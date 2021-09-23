import { FC, Key } from 'react';
import { Route, Switch } from 'react-router';

import { routes } from './routes';

export const AppRouter: FC = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route {...route} key={route.path as Key} />
      ))}
    </Switch>
  );
};
