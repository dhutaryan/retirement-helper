import { FC, Key } from 'react';
import { Route, Router, Switch } from 'react-router';
import { Redirect } from 'react-router-dom';

import { PUBLIC_ROUTES, history, PRIVATE_ROUTES, RouteName } from './routes';
import { AppLayout, AuthLayout } from '../components/layout';
import { useTypedSelector } from '../hooks/use-typed-selector';

export const AppRouter: FC = () => {
  const { isAuth } = useTypedSelector((state) => state.app);

  return (
    <Router history={history}>
      {isAuth ? (
        <AppLayout>
          <Switch>
            {PRIVATE_ROUTES.map((route) => (
              <Route {...route} key={route.path as Key} />
            ))}
            <Redirect to={RouteName.ACTIVITY} />
          </Switch>
        </AppLayout>
      ) : (
        <AuthLayout>
          <Switch>
            {PUBLIC_ROUTES.map((route) => (
              <Route {...route} key={route.path as Key} />
            ))}
            <Redirect to={RouteName.LOGIN} />
          </Switch>
        </AuthLayout>
      )}
    </Router>
  );
};
