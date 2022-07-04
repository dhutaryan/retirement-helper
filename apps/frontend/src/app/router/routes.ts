import { RouteProps } from 'react-router';
import { createBrowserHistory } from 'history';

import { Activity, Login, Profile, SignUp } from '../pages';

export const history = createBrowserHistory();

export enum RouteName {
  LOGIN = '/login',
  SIGN_UP = '/sign-up',
  ACTIVITY = '/activity',
  PROFILE = '/profile',
}

export const PUBLIC_ROUTES: RouteProps[] = [
  { path: RouteName.LOGIN, component: Login, exact: true },
  { path: RouteName.SIGN_UP, component: SignUp, exact: true },
];

export const PRIVATE_ROUTES: RouteProps[] = [
  { path: RouteName.ACTIVITY, component: Activity, exact: true },
  { path: RouteName.PROFILE, component: Profile, exact: true },
];
