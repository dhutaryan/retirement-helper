import { RouteProps } from 'react-router';
import { createBrowserHistory } from 'history';

import { Login, SignUp } from '../pages';

export const history = createBrowserHistory();

export enum RouteName {
  LOGIN = '/login',
  SIGN_UP = '/sign-up',
}

export const routes: RouteProps[] = [
  { path: RouteName.LOGIN, component: Login, exact: true },
  { path: RouteName.SIGN_UP, component: SignUp, exact: true },
];
