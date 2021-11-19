import { FC, Key } from 'react';
import { Route, Router, Switch } from 'react-router';

import { routes, history } from './routes';
import { AuthLayout } from '../components/layout/auth-layout';

export const AppRouter: FC = () => {
  return (
    <Router history={history}>
      <AuthLayout>
        <Switch>
          {routes.map((route) => (
            <Route {...route} key={route.path as Key} />
          ))}
        </Switch>
      </AuthLayout>
    </Router>
  );
};
