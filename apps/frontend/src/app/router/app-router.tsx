import { FC, Key } from 'react';
import { Route, Switch } from 'react-router';

import { routes } from './routes';
import { AuthLayout } from '../components/layout/auth-layout';

export const AppRouter: FC = () => {
  return (
    <AuthLayout>
      <Switch>
        {routes.map((route) => (
          <Route {...route} key={route.path as Key} />
        ))}
      </Switch>
    </AuthLayout>
  );
};
